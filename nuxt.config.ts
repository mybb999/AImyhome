// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-02',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  // App configuration
  app: {
    head: {
      title: 'Lucas Space — 个人全栈网站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Lucas (Lucas) — 高级前端/全栈开发工程师 | 7年前端/全栈经验，全栈独立博客' },
        { property: 'og:title', content: 'Lucas Space' },
        { property: 'og:description', content: '融合7年前端经验高光与全栈独立博客的数字化职业名片' },
        { property: 'og:type', content: 'website' },
      ],
      script: [
        // async:埋点 SDK 不能阻塞首屏。之前同步加载,而该域名曾 10s+ 超时,
        // 整页渲染被它卡住 —— 「网站很卡」的元凶
        { src: 'https://pipeline.ai-myhome.space/sdk.js', async: true, 'data-app-key': '13b90995036451356245c5ae', 'data-endpoint': 'https://pipeline.ai-myhome.space/api/collect' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=20260601' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
  },

  // Content module for blog posts
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'css', 'html', 'bash', 'json'],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },

  // 注意：Vercel 的 ISR（swr）只按**路径**缓存，忽略查询字符串。
  // /api/blog 依赖 collection / id / limit 等查询参数区分结果，一旦开启 swr，
  // 所有变体会共享同一份缓存 —— 文集页会串成全部文章，详情页也拿不到单篇。
  // 因此这里只缓存没有查询参数的 /api/collections。
  routeRules: {
    '/api/collections': { swr: 300 },
  },

  // SSR + Vercel deployment
  nitro: {
    preset: 'vercel',
    // 2026-10-15:Vercel 构建环境的首页预渲染 500(itemKey/unstorage),本地永远复现不了;
    // 预渲染只是「构建时烤好 HTML」的锦上添花,关掉后 Vercel 运行时 SSR 照常出页面。
    // 想找回时:git revert 这个提交再排查,别在这里死磕。
    prerender: {
      routes: [],
    },
    // /api/agent 是 LLM 流式接口:回答要 15~30s,Vercel 免费版默认 10s 会掐死函数,提到上限 60s
    // (这个版本 nitro 只认 vercel.functions,不认 routeRules.maxDuration —— 已查过 nitro 源码)
    vercel: {
      functions: { maxDuration: 60 },
    },
  },

  // Component auto-import (disable path prefix to keep original names)
  components: {
    dirs: [
      { path: '~/components/home', prefix: false },
      { path: '~/components/blog', prefix: false },
      { path: '~/components/agent', prefix: false },
      { path: '~/components/shared', prefix: false },
    ],
  },

  // CSS
  css: ['~/assets/css/main.css'],
})
