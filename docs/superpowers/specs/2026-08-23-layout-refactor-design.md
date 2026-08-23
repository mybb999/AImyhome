# 设计文档：布局职责重构（thin 布局 + AppShell）

- 日期：2026-08-23
- 状态：已批准（待实施）

## 1. 背景与问题

当前 `layouts/default.vue` 同时承担通用 chrome（顶栏、两栏网格、页脚）和业务组件编排（按路由三路切换 AvatarCard / BlogSidebar / BlogToc），导致：

1. **职责混乱**：布局文件 import 并渲染页面级业务组件，违反「各路由管理各自子组件」的模块化原则，不便管理
2. **隐式耦合**：博客详情页通过 provide/inject（`setBlogToc`）向布局注入 TOC 数据，数据流绕经布局，理解成本高
3. **Bug 温床**：布局内基于路由的 v-if 切换正是已修复的「快速切换时侧栏内容被挤出 aside」Bug 的发生现场（虽已通过 BlogSidebar 去 await 修复，但该切换模式本身是隐患）

目标：**每个路由页面组装并拥有自己的侧栏与内容**；布局退化为纯通用外壳，不感知任何业务组件。

## 2. 目标架构

```
layouts/default.vue      ← 只剩 <AppHeader /> + <slot />（Nuxt 要求页面必须渲染在布局中）
components/shared/
  AppHeader.vue          ← 顶栏导航（现 default.vue header 原样搬入，含 NavLink 高亮）
  AppShell.vue           ← 两栏骨架：sticky 侧栏(#sidebar 插槽) + 内容区(默认插槽) + 页脚
pages/index.vue          ← AppShell: sidebar=AvatarCard, 内容=BlogList+Guestbook
pages/ai-agent.vue       ← AppShell: sidebar=AvatarCard, 内容=ChatPanel
pages/blog/index.vue     ← AppShell: sidebar=BlogSidebar, 内容=BlogList
pages/blog/[slug].vue    ← AppShell: sidebar=BlogToc(:toc), 内容=BlogContent
```

原则：
- 业务组件（AvatarCard / BlogSidebar / BlogToc）只被其所属页面引用
- 共享组件只有纯外壳（AppHeader / AppShell），不含业务内容
- 布局中不出现任何路由判断

## 3. 文件改动清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `layouts/default.vue` | 改写 | 删除三路 v-if、`blogToc` ref、`provide('setBlogToc')`；保留 `min-h-screen bg-brand-bg font-geist` 根节点 + `<AppHeader />` + `<slot />` |
| `components/shared/AppHeader.vue` | 新建 | 现 default.vue 的 `<header>` 整段（含 isHomeActive / isAiAgentActive / isBlogActive 计算逻辑） |
| `components/shared/AppShell.vue` | 新建 | 现 default.vue 的 `pt-14 lg:flex` 网格：aside（sticky、320px、overflow-y-auto、border 等全部样式）+ `#sidebar` 插槽；main（flex-1 min-h） + 默认插槽 + 页脚 |
| `pages/index.vue` | 改写 | 用 AppShell 组装 |
| `pages/ai-agent.vue` | 改写 | 用 AppShell 组装 |
| `pages/blog/index.vue` | 改写 | 用 AppShell 组装 |
| `pages/blog/[slug].vue` | 改写 | 用 AppShell 组装；删除 `inject('setBlogToc')` 及 `watch`，直接 `:toc="toc"` 传 BlogToc |

不动的部分：所有业务组件内部实现、数据获取逻辑、`pageTransition` 配置、Tailwind/主题配置、服务端 API。

## 4. 数据流

- **TOC**：详情页 `computed` 出 `toc` → 直接作为 prop 传给 BlogToc。provide/inject（`setBlogToc`）整体删除。
- **BlogSidebar 文章列表**：`useFetch('/api/blog')`（非阻塞版本，含已修复的 await 竞态）保持不变。
- **页面数据**：useFetch / useAsyncData 均留在各自页面，不变。

## 5. 行为变化（仅一处，已确认接受）

- 侧栏从「布局常驻」变为「页面一部分」：路由切换时侧栏随页面过渡（out-in）一起淡入淡出。
- 视觉、响应式断点、sticky 行为、页脚位置与现状一致。

## 6. 验证计划

1. `npm run dev` → PC 视口（≥1024px）：左侧 320px 固定侧栏 + 右侧滚动；移动端：单列堆叠
2. 四个路由侧栏内容正确：首页/AI = AvatarCard，博客列表 = BlogSidebar，博客详情 = BlogToc
3. `/blog/:id` 详情页 TOC 渲染、点击滚动、IntersectionObserver 高亮正常
4. 重跑布局 Bug 的 Playwright 复现探针（CPU 节流 + 快速切换），确认无回归
5. `npm run build` SSR 构建通过
