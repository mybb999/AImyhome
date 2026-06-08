<template>
  <section class="space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="text-headline-lg text-on-surface">
        💬 留言板
      </h2>
      <span class="flex items-center gap-1.5 text-label-md text-on-surface-variant">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        支持匿名评论 · 无需登录
      </span>
    </div>

    <div class="card">
      <ClientOnly>
        <div id="twikoo-container" />
        <template #fallback>
          <div class="flex items-center justify-center py-12 text-on-surface-variant text-body-md">
            评论加载中...
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

/**
 * Twikoo 留言板配置
 *
 * 部署步骤：
 * 1. 去 https://twikoo.js.org/backend.html 点 "Deploy to Vercel"
 * 2. 在 Vercel 部署时填入 MongoDB Atlas 连接字符串（环境变量 MONGODB_URI）
 * 3. 部署完成后将你的 Vercel 地址填到下方 envId（替换 YOUR_TWIKOO_BACKEND）
 *
 * 示例：
 *   envId: 'https://twikoo-lucas-space.vercel.app'
 */

const TWIKOO_ENV_ID = 'https://message-board-pi-pearl.vercel.app'

onMounted(async () => {
  try {
    const twikoo = await import('twikoo')
    twikoo.default({
      envId: TWIKOO_ENV_ID,
      el: '#twikoo-container',
      lang: 'zh-CN',
      path: window.location.pathname,
    })
  } catch (err) {
    console.error('Twikoo 加载失败:', err)
  }
})
</script>

<style scoped>
/* Twikoo Midnight Slate 暗色适配 */
:deep(.twikoo) {
  --twikoo-bg: #131b2e;
  --twikoo-text: #dae2fd;
  --twikoo-text-secondary: #bbcabf;
  --twikoo-border: #334155;
  --twikoo-accent: #4edea3;
  --twikoo-card: #171f33;
}
</style>
