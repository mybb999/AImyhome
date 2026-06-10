# 技术架构说明

## 技术栈

| 层面 | 选型 | 说明 |
|------|------|------|
| 框架 | Nuxt 3 | Vue 3 全栈框架，支持 SSR |
| 样式 | Tailwind CSS | 原子化 CSS，Midnight Slate 主题定制 |
| 字体 | Geist | Google Fonts，现代化几何字体 |
| 动效 | Vue Transition + Tailwind | 0kb 额外体积，纯原生 |
| 内容 | @nuxt/content | Markdown 博客渲染 + 代码高亮 |
| 留言 | Giscus | GitHub Discussions API，零数据库 |
| AI Agent | 智谱 GLM-4-Flash | LLM 对话，OpenAI 兼容 API |
| Markdown 渲染 | markdown-it | 轻量 Markdown → HTML（Agent 回复） |
| 部署 | Vercel | Serverless，全球 CDN |
| 语言 | TypeScript | 全项目类型安全 |

## 项目结构

```
AImyhome/
├── app.vue                    # 应用入口
├── nuxt.config.ts             # Nuxt 配置
├── tailwind.config.ts         # Tailwind + Midnight Slate Token
├── CLAUDE.md                  # 项目开发指引
├── vercel.json                # Vercel 部署配置
│
├── layouts/
│   └── default.vue            # 全局布局（PC左固定+右滚动 / Mobile垂直）
│
├── pages/
│   ├── index.vue              # 首页（名片区 + 博客列表 + 留言板）
│   └── blog/
│       └── [slug].vue         # 博客详情页（目录 + 正文）
│
├── components/
│   ├── home/                  # 首页组件
│   │   ├── AvatarCard.vue         # 聚合名片区（组合以下子组件）
│   │   ├── StatusBadge.vue        # 脉冲动画求职状态标签
│   │   ├── SocialLinks.vue        # 社交链接
│   │   └── SkillTree.vue          # 技能树卡片
│   ├── blog/                  # 博客组件
│   │   ├── BlogCard.vue           # 文章卡片
│   │   ├── BlogContent.vue        # Markdown 正文渲染
│   │   ├── BlogToc.vue            # 文章目录 + Scrollspy
│   │   └── BlogSidebar.vue        # 博客侧栏
│   ├── agent/                 # AI Agent 组件
│   │   ├── ChatPanel.vue          # 聊天面板（消息列表 + 输入框 + 流式逻辑）
│   │   └── ChatMessage.vue        # 单条消息气泡（Markdown 渲染）
│   └── shared/                # 共用组件
│       ├── BlogList.vue           # 文章列表（含骨架屏/空状态/动画）
│       ├── Guestbook.vue          # Giscus 留言板
│       └── ResumeButton.vue       # PDF 下载按钮
│
├── server/
│   └── api/
│       ├── blog.ts            # 博客列表/详情 API
│       └── agent.ts           # AI Agent API（LLM 转发代理，流式 SSE）
│
├── content/
│   └── blog/                  # Markdown 博客文章
│
├── types/
│   └── blog.ts                # 博客类型定义
│
├── assets/
│   └── css/
│       └── main.css           # 全局样式 + Tailwind 层
│
├── public/                    # 静态资源（头像、简历 PDF 等）
│
├── docs/                      # 项目标准文档
│   ├── README.md              # 文档索引
│   ├── PRD-v1.1.0.md          # 需求规格 v1.1.0
│   ├── PRD-v1.0.0.md          # 需求规格 v1.0.0
│   ├── DESIGN.md              # Midnight Slate 设计规范
│   └── ARCHITECTURE.md        # 本文档
│
└── devlog/                    # 开发日志
    ├── TEMPLATE.md            # 日志模板
    └── YYYY-MM-DD.md          # 每日日志
```

## 数据流

```
Markdown 文件 ──→ server/api/blog.ts ──→ BlogList (首页列表)
                    │
                    └──→ BlogContent (详情页渲染)

Giscus <── GitHub Discussions API (免数据库留言)

浏览器 (ChatPanel.vue) ──→ server/api/agent.ts ──→ 智谱 GLM API
        ▲                                              │
        └────────── SSE 流式响应 ──────────────────────┘
```

## 渲染策略

- 首页 `/`：静态生成（SSG），预渲染 HTML
- AI Agent 页 `/ai-agent`：CSR 客户端渲染（纯交互式聊天，无需 SEO）
- 详情页 `/blog/:slug`：SSR 服务端渲染，SEO 友好
- API `/api/blog`：Nitro 服务端处理，返回 JSON
- API `/api/agent`：Nitro 服务端处理，SSE 流式转发 LLM 响应

## AI Agent 架构

```
┌─ 浏览器 ─────────────────────────────────────────────┐
│  pages/ai-agent.vue                                   │
│  └─ components/agent/ChatPanel.vue                    │
│     ├─ 消息列表（v-for ChatMessage）                  │
│     │  └─ components/agent/ChatMessage.vue            │
│     │     └─ markdown-it 渲染 Markdown                 │
│     ├─ 流式逐字输出（fetch + ReadableStream）         │
│     └─ 输入框 + 发送按钮                              │
│         │                                              │
│         │  POST /api/agent  { messages[] }             │
└─────────┼──────────────────────────────────────────────┘
          │
┌─────────┼──────────────────────────────────────────────┐
│  Nitro Server                                          │
│  server/api/agent.ts                                   │
│  1. 接收 messages[]                                    │
│  2. 拼接 system prompt（定义 AI 助手角色）             │
│  3. POST → 智谱 GLM API，stream: true                  │
│  4. SSE 逐块转发 LLM 响应到浏览器                      │
└────────────────────────────────────────────────────────┘
          │
          ▼
  智谱 GLM API (glm-4-flash)
```

### Agent 关键设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| LLM 模型 | 智谱 GLM-4-Flash | 永久免费，中文能力强，OpenAI 兼容格式 |
| 对话持久化 | 无（浏览器内存） | v1.0 最小可用，后续可加 localStorage/SQLite |
| 流式渲染 | SSE (Server-Sent Events) | Nuxt/Nitro 原生支持 ReadableStream |
| API Key 安全 | 仅服务端 | `.env` 存储，前端不可见 |
| 工具调用 | 暂无 | 纯文本对话，后续可扩展 |
| 超时限制 | Vercel 10s | 长回答可能截断，后续可升级 Pro（60s） |
