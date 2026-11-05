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
  - 元素距视口 300px 内时，才 `import('twikoo')` 并初始化
  - 初始化前不请求 Twikoo 的 JS chunk，也不请求评论接口
  - 浏览器不支持 IntersectionObserver 时，回退为挂载即加载
- 加载状态：`idle | loading | ready | error`
  - 未就绪时显示占位「评论加载中…」，`min-h-[160px]` 防止页面跳动
  - 失败时占位显示「留言板加载失败，请刷新重试」，并保留 console.error
- **DOM 归属**：Twikoo 初始化时会替换/移动挂载节点，若让 Vue 管理该节点会触发
  `insertBefore` 报错并把节点删掉。因此模板里只保留一个空的 `mountEl`，
  占位节点和 `#twikoo-container` 都用原生 DOM 创建，Vue 不再参与这棵子树的 patch。
- 组件卸载时 `observer.disconnect()`；`started` 标志防止重复初始化

## 非目标

- 不改 Twikoo 后端代理、不改评论数据
- 不改聊天 SSE 逻辑、Markdown 渲染效果
- 不调整首页布局与首屏内容

## 验证

1. `npm run build` 通过
2. 首页：初始不请求 twikoo chunk；滚动到留言板附近后才加载并正常渲染评论
3. 聊天页：mock 一条含 JS / Python 代码块的回答，确认关键字/字符串/注释高亮正常
4. 记录改动前后相关 chunk 体积
