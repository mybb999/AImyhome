# CLAUDE.md

## 项目概述
**Lucas Space** — 刘俊雄个人品牌全栈网站，基于 Nuxt 3 + Tailwind CSS，深色极客风（Midnight Slate）。

## 标准文件路径

| 类别 | 路径 | 说明 |
|------|------|------|
| 产品需求文档 | `docs/PRD-v1.1.0.md` | 最新需求规格（v1.1.0 含博客详情页） |
| 产品需求文档 | `docs/PRD-v1.0.0.md` | 初版需求（参考） |
| 设计规范 | `docs/DESIGN.md` | Midnight Slate 设计系统（色板/字体/间距/组件） |
| 实施计划 | `C:\Users\Administrator\.claude\plans\vue3-2-screen1-png-screen2-png-radiant-yeti.md` | 分步执行计划 |
| 技术架构 | `docs/ARCHITECTURE.md` | 技术选型与项目结构 |
| 开发日志 | `devlog/YYYY-MM-DD.md` | 每日开发记录 |
| 日志模板 | `devlog/TEMPLATE.md` | 新建日志模板 |

## 工作说明

### 日常开发流程
1. 每次开始工作时，参考 `docs/PRD-v1.1.0.md` 确认需求范围
2. 组件样式严格遵循 `docs/DESIGN.md` 中的 Midnight Slate 设计 Token
3. 每日结束前更新 `devlog/YYYY-MM-DD.md`，记录已完成事项和待办事项
4. 遇到不确定的设计细节，优先从 `docs/DESIGN.md` 查找，找不到再问用户

### 代码规范
- 所有 Vue 组件使用 `<script setup lang="ts">` + Composition API
- 类型定义统一放在 `types/` 目录
- API 接口放在 `server/api/` 目录
- 博客文章 Markdown 放在 `content/blog/` 目录
- 使用 Tailwind 类名，避免行内样式
- 色板使用 `docs/DESIGN.md` 中定义的语义化 Token（如 `bg-brand-bg`、`text-brand-accent`）

### 响应式断点
- 桌面端：`lg:` (1024px+) — 左固定 320px + 右滚动
- 移动端：默认（<1024px）— 垂直单列堆叠
- 内容最大宽度：1280px

### 技术栈
- **框架**: Nuxt 3 (Vue 3 + SSR)
- **样式**: Tailwind CSS (Midnight Slate 主题)
- **字体**: Geist (Google Fonts)
- **动效**: Vue Transition + Tailwind 动画
- **数据**: Nuxt server/api + Markdown
- **留言**: Giscus (GitHub Discussions)
- **部署**: Vercel

### 验证步骤
1. `npm run dev` → `http://localhost:3000`
2. PC 视口：左侧固定 + 右侧滚动
3. 移动端：单列垂直布局
4. `/blog/:id` 详情页：左侧目录 + 右侧正文
5. `npm run build` 确保 SSR 构建无报错

### 设计稿
原设计稿位于 `AImyhomeDocs/main/screen1.png` 和 `AImyhomeDocs/main_boke/screen2.png`。如无法解析，以 `docs/DESIGN.md` 为准。
