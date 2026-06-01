/**
 * Blog API endpoint — serves blog post list and individual post data.
 */

import type { BlogPost, BlogListItem } from '~/types/blog'
import { toBlogListItem } from '~/types/blog'

// ── Blog posts with full content ──
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'jsplumb-ai-mindmap',
    title: '基于 jsplumb 和大模型的思维导图架构实践',
    description: '深入探讨如何将 jsplumb 可视化拖拽引擎与大语言模型结合，构建新一代智能思维导图系统。',
    date: '2026-05-15',
    readingTime: 13,
    tags: ['可视化', 'AI', '架构'],
    published: true,
    content: `## 背景与挑战

在金融数据可视化领域，思维导图作为一种直观展示数据关联关系的工具，被广泛应用于风险分析、投资决策等场景。传统思维导图存在两个核心痛点：手动编排效率低、静态结构无法自适应。

## 架构设计

我们设计了一套 **"jsplumb + LLM"** 的双引擎架构：

### 渲染引擎层

jsplumb 社区版提供了强大的节点连线能力。封装了 MindMapCanvas 类处理节点拖拽与连线：

- 动态创建可拖拽节点
- 创建带标签的连线
- 支持流程图、贝塞尔曲线等多种连接器

### AI 生成层

大语言模型负责结构化输出和布局建议，将自然语言描述转换为 JSON 节点关系图，根据节点关系密度推荐最优排列算法。

## 性能优化

将 1000 节点的渲染从 8 秒优化到 1.5 秒：虚拟化渲染仅处理可视区域节点、Web Worker 计算布局算法、增删改差分避免全量重绘。

## 总结

这套架构已在某金融机构的生产环境中稳定运行，支撑了日均 500+ 次的导图生成请求。`,
  },
  {
    id: '2',
    slug: 'nuxt3-ssr-performance',
    title: 'Nuxt 3 SSR 性能优化实战：从 LCP 3s 到 1.2s',
    description: '记录将一个企业级 Nuxt 3 官网的首屏加载时间从 3 秒优化到 1.2 秒的完整过程。',
    date: '2026-04-28',
    readingTime: 10,
    tags: ['性能优化', 'Nuxt', 'SSR'],
    published: true,
    content: `## 问题诊断

接手企业级 Nuxt 3 官网时，Lighthouse 评分仅 45 分，LCP 高达 3.2 秒。通过 Chrome DevTools Performance 面板分析发现三个瓶颈：首屏 JS 体积过大（480KB）、字体阻塞渲染、图片未优化（首页 banner 2.4MB）。

## 优化策略

### 1. 混合渲染策略

首页静态生成（SSG），博客 ISR 1 小时过期，API 跨域配置。核心原则：能预渲染的绝不 CSR。

### 2. 字体加载优化

Google Fonts 外链改为本地托管 + font-display: swap，避免 FOIT。

### 3. 图片优化

WebP 格式替代 PNG/JPEG，NuxtImg 自动生成 srcset 响应式图片，首屏图片使用 fetchpriority="high"。

## 优化成果

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| LCP | 3.2s | 1.2s | 62%↓ |
| TBT | 480ms | 85ms | 82%↓ |
| Lighthouse | 45 | 92 | +47 |
| JS Bundle | 480KB | 142KB | 70%↓ |

核心经验：先静态后动态，能预渲染的绝不 CSR。`,
  },
  {
    id: '3',
    slug: 'vue3-echarts-dashboard',
    title: 'Vue 3 + ECharts 构建金融数据可视化大屏',
    description: '从零搭建一个面向金融场景的数据可视化大屏系统，包含实时数据推送和组件化图表封装。',
    date: '2026-04-10',
    readingTime: 8,
    tags: ['Vue3', 'ECharts', '大屏'],
    published: true,
    content: `## 项目背景

为某券商打造一套面向投顾团队的数据可视化大屏系统，核心需求：实时展示 A 股市场行情数据、支持多屏联动（主屏 + 2 块副屏）、暗色主题、自适应 1920×1080 到 4K 分辨率。

## 技术选型

| 模块 | 方案 | 理由 |
|------|------|------|
| 框架 | Vue 3 + Composition API | 逻辑复用方便 |
| 图表 | ECharts 5 | 金融图表生态完善 |
| 实时数据 | WebSocket + Pinia | 全局状态同步 |
| 自适应 | CSS transform: scale | 等比缩放 |
| 构建 | Vite | 秒级 HMR |

## 核心实现

大屏自适应缩放采用等比缩放方案，WebSocket 接收行情推送，Pinia store 统一管理状态。图表组件通过 watch 监听数据变化后调用 ECharts 的 setOption 增量更新，避免全量重绘。

## 上线效果

系统上线后支撑了营业部 20+ 块大屏同时展示，数据刷新延迟控制在 100ms 以内。`,
  },
  {
    id: '4',
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript 高级类型体操：从泛型到模板字面量',
    description: '深入 TypeScript 类型系统的进阶用法，包括条件类型、映射类型、模板字面量类型及 infer 关键字。',
    date: '2026-03-22',
    readingTime: 15,
    tags: ['TypeScript', '前端工程化'],
    published: true,
    content: `## 引言

TypeScript 的类型系统不仅仅是给 JavaScript 加类型标注那么简单。掌握高级类型技巧可以在编译期捕获更多错误，减少运行时 bug。

## 条件类型

条件类型是 TypeScript 类型系统的基石，类似 JavaScript 的三元运算符：

- extends 关键字用于类型约束和条件判断
- infer 关键字在条件类型中提取类型变量
- 分布式条件类型自动展开联合类型

## 映射类型

映射类型允许你基于已有类型创建新类型，是类型层面的 map 操作。结合 keyof、as 子句可以实现键名重映射和过滤。

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型为字符串处理带来了编译期验证能力：

- 拼接字符串字面量类型
- 结合 infer 提取子串
- 与递归条件类型配合实现字符串解析

## 实战建议

在实际项目中，优先使用 interface 而非 type 以提高编辑器性能。将复杂类型拆解为可读的步骤，避免过度抽象。`,
  },
  {
    id: '5',
    slug: 'vibe-coding-practice',
    title: 'Vibe Coding 实践：用 AI 辅助编程提升效率',
    description: '分享个人使用 Cursor 和 Claude Code 进行 Vibe Coding 的实战经验与最佳工作流。',
    date: '2026-03-05',
    readingTime: 7,
    tags: ['AI', '开发工具', '效率'],
    published: true,
    content: `## 什么是 Vibe Coding

Vibe Coding 是一种新型编程范式，通过自然语言与 AI 工具交互来生成代码。开发者专注于描述意图和审查输出，而非逐行编写代码。

## 工具链

日常使用的 AI 辅助工具：

- **Cursor**: 基于 VS Code 的 AI IDE，支持代码补全、内联编辑和对话式编程
- **Claude Code**: Anthropic 的命令行 AI 助手，擅长复杂重构和架构设计
- **通义灵码**: 阿里云出品，对中文和国内技术栈支持良好
- **CodeBuddy**: 腾讯的 AI 编程助手

## 最佳实践

### Prompt 工程

好的 prompt 是成功的一半。关键要素：明确技术栈、描述期望行为、提供上下文代码、指定输出格式。

### 代码质量控制

AI 生成的代码不能盲目信任。必须：Review 每一行、运行测试、检查边界情况、重构重复逻辑。

### 工作流建议

小需求直接对话生成，中等需求先写注释再让 AI 实现，大需求自己设计架构让 AI 实现细节。

## 总结

Vibe Coding 不会取代程序员，但善于使用 AI 的程序员会取代不使用 AI 的程序员。核心是保持对代码的理解和掌控。`,
  },
]

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const id = query.id as string | undefined

  // Return single post by ID or slug
  if (id) {
    const post = blogPosts.find(p => p.id === id || p.slug === id)
    if (!post) {
      throw createError({ statusCode: 404, statusMessage: '文章未找到' })
    }
    return post
  }

  // Return all published posts as list items
  const published = blogPosts.filter(p => p.published)
  const list: BlogListItem[] = published.map(toBlogListItem)
  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return list
})
