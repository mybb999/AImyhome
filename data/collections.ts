import type { BlogCollection } from '~/types/blog'

/**
 * 文集定义 — 博客的唯一分类来源。
 * 新增/调整文集只需改这里，文章通过 frontmatter 的 `collection` 字段归属。
 */
export const collections: BlogCollection[] = [
  {
    slug: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    order: 1,
    description: '语言基础、异步模型、原型继承与常用 API',
  },
  {
    slug: 'vue',
    name: 'Vue 生态',
    icon: '💚',
    order: 2,
    description: 'Vue 2/3 原理、路由、状态管理与组件通信',
  },
  {
    slug: 'react',
    name: 'React 生态',
    icon: '⚛️',
    order: 3,
    description: '生命周期、Hooks、Fiber、Redux 与 Next.js',
  },
  {
    slug: 'css-mobile',
    name: 'CSS 与移动端',
    icon: '🎨',
    order: 4,
    description: '布局、Flex/BFC、移动端适配与小程序的尺寸单位',
  },
  {
    slug: 'browser-network',
    name: '浏览器与网络',
    icon: '🌐',
    order: 5,
    description: 'DOM、HTTP、跨域、Web 安全与 WebSocket',
  },
  {
    slug: 'server-db',
    name: '服务端与数据库',
    icon: '🗄️',
    order: 6,
    description: 'Node.js、Express、MySQL/PostgreSQL 与缓存设计',
  },
  {
    slug: 'java-spring',
    name: 'Java 与 SpringBoot',
    icon: '☕',
    order: 7,
    description: 'Java 基础、SpringBoot 注解、依赖注入与中间件',
  },
  {
    slug: 'engineering',
    name: '工程化与构建',
    icon: '⚙️',
    order: 8,
    description: 'Webpack、Vite、打包优化、微前端与部署',
  },
  {
    slug: 'ai-tools',
    name: 'AI 与效率工具',
    icon: '🤖',
    order: 9,
    description: 'SSE 流式输出、LLM 应用、低代码与 AI 编程实践',
  },
  {
    slug: 'interview-growth',
    name: '面试与成长',
    icon: '🎯',
    order: 10,
    description: '面试复盘、职业思考与日常开发记录',
  },
  {
    slug: 'essay',
    name: '随笔杂记',
    icon: '📝',
    order: 11,
    description: '非技术杂记与日常随想',
  },
]

export const collectionMap = new Map(collections.map(c => [c.slug, c]))
