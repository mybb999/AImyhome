// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  // App configuration
  app: {
    head: {
      title: 'Lucas Space — 个人品牌全栈网站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '刘俊雄 (Lucas) — 高级前端开发工程师 | 7年前端经验，全栈独立博客' },
        { property: 'og:title', content: 'Lucas Space' },
        { property: 'og:description', content: '融合7年前端经验高光与全栈独立博客的数字化职业名片' },
        { property: 'og:type', content: 'website' },
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

  // SSR + Vercel deployment
  nitro: {
    preset: 'vercel',
    prerender: {
      routes: ['/'],
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],
})
