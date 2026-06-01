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
│   ├── AvatarCard.vue         # 聚合名片区（组合以下子组件）
│   ├── StatusBadge.vue        # 脉冲动画求职状态标签
│   ├── SocialLinks.vue        # 社交链接
│   ├── SkillTree.vue          # 技能树卡片
│   ├── ResumeButton.vue       # PDF 下载按钮
│   ├── BlogCard.vue           # 文章卡片
│   ├── BlogList.vue           # 文章列表（含骨架屏/空状态/动画）
│   ├── BlogToc.vue            # 文章目录 + Scrollspy
│   ├── BlogContent.vue        # Markdown 正文渲染
│   └── Guestbook.vue          # Giscus 留言板
│
├── server/
│   └── api/
│       └── blog.ts            # 博客列表/详情 API
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
```

## 渲染策略

- 首页 `/`：静态生成（SSG），预渲染 HTML
- 详情页 `/blog/:slug`：SSR 服务端渲染，SEO 友好
- API `/api/blog`：Nitro 服务端处理，返回 JSON
