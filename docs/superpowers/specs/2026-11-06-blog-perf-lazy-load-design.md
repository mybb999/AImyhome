# 博客性能优化：highlight.js 按需引入 + Twikoo 懒加载

日期：2026-11-06
状态：已确认，待实现

## 背景

10-23 / 10-30 开发日志记录了两个未完成的性能项：

1. 聊天页 `ChatMessage.vue` 全量引入 highlight.js（约 1MB，190+ 种语言），实际问答只用十几种
2. 首页 `Guestbook.vue` 挂载即加载 Twikoo（约 913KB），留言板在首屏以下，访客未滚动时无需加载

目标：不改变现有渲染效果和交互，只减少不必要的下载。

## 方案

### 1. highlight.js 按需引入

- `components/agent/ChatMessage.vue`：`import hljs from 'highlight.js'` → `import hljs from 'highlight.js/lib/common'`
- 使用官方 common 包（37 种常用语言），Go/Java/Rust/Kotlin/TypeScript/XML 等均已内置
- Markdown 渲染与高亮函数保持不变；未注册的冷门语言回退为纯文本代码块（现有 fallback 已覆盖）

### 2. Twikoo 滚动懒加载

- `components/shared/Guestbook.vue` 增加 `IntersectionObserver`：
  - 元素距视口 300px 内时，才注入 Twikoo 脚本并初始化
  - 初始化前不请求 Twikoo 脚本，也不请求评论接口
  - 浏览器不支持 IntersectionObserver 时，回退为挂载即加载
- **官方 UMD 自托管**：使用 `public/vendor/twikoo.all.min.js`（v1.7.24），
  滚动触发时动态插入 `<script>`，加载后调用 `window.twikoo.init(...)`。
  不再走 `import('twikoo')` 打包 —— 打包版在线上出现过 Vue 2 渲染异常
  （`getTagNamespace` 读到 undefined tag），官方 UMD 版正常。
- **DOM 归属**：模板保留静态 `#twikoo-container`，Twikoo 用选择器
  `el: '#twikoo-container'` 挂载。加载占位是静态兄弟节点，只用原生 `hidden`
  属性切换，不用 `v-if`/响应式状态 —— 避免 Vue patch 到 Twikoo 接管后的节点
  （曾触发 `insertBefore` NotFoundError）。
- **等 hydration 完成**：observer 用 `onNuxtReady` 挂载，而不是 `onMounted`。
  线上慢网络下 hydration 可持续数十秒，过早初始化会与 Vue 的补丁过程竞争。
- **确认渲染**：`await twikoo.init(...)` 之后轮询 `.twikoo` / `.tk-submit`，
  真正渲染后才隐藏「评论加载中…」；超时则显示「留言板加载失败，请刷新重试」。
- 组件卸载时 `observer.disconnect()`；`started` 标志防止重复初始化

## 非目标

- 不改 Twikoo 后端代理、不改评论数据
- 不改聊天 SSE 逻辑、Markdown 渲染效果
- 不调整首页布局与首屏内容

## 验证

1. `npm run build` 通过
2. 首页：初始不请求 `/vendor/twikoo.all.min.js`；滚动到留言板附近后才注入脚本并正常渲染评论
3. 聊天页：mock 一条含 JS / Python 代码块的回答，确认关键字/字符串/注释高亮正常
4. 记录改动前后相关 chunk 体积
5. 线上复验：滚动触发脚本加载，评论区渲染、`/api/twikoo` 请求正常，无 console 报错
