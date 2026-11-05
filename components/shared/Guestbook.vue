<template>
  <section ref="sectionEl" class="space-y-5">
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

    <!-- Twikoo 初始化时会替换/移动挂载节点，所以这里只让 Vue 管理一个空壳，
         评论节点和占位节点都用原生 DOM 创建，避免和 Vue 的虚拟 DOM 打架 -->
    <div ref="mountEl" class="card">
      <ClientOnly>
        <template #fallback>
          <div class="flex items-center justify-center py-12 min-h-[160px] text-on-surface-variant text-body-md">
            评论加载中...
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

const sectionEl = ref<HTMLElement | null>(null)
const mountEl = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let placeholderEl: HTMLDivElement | null = null
let started = false

function setPlaceholder(text: string) {
  if (!mountEl.value) return
  if (!placeholderEl) {
    placeholderEl = document.createElement('div')
    placeholderEl.className = 'flex items-center justify-center py-12 min-h-[160px] text-on-surface-variant text-body-md'
    mountEl.value.appendChild(placeholderEl)
  }
  placeholderEl.textContent = text
}

async function loadTwikoo() {
  if (started || !mountEl.value) return
  started = true
  setPlaceholder('评论加载中...')

  const container = document.createElement('div')
  container.id = 'twikoo-container'
  mountEl.value.appendChild(container)

  try {
    const twikoo = await import('twikoo')

    // 开发环境：浏览器直连 Vercel（需设备开 VPN）
    // 生产环境：走 Nuxt 服务端代理（Vercel 内部互通，无需 VPN）
    const isDev = window.location.hostname === 'localhost'
      || window.location.hostname.startsWith('192.168.')
      || window.location.hostname.startsWith('10.')
      || window.location.hostname.startsWith('172.')
    const envId = isDev
      ? 'https://message-board-pi-pearl.vercel.app'
      : `${window.location.origin}/api/twikoo`

    await twikoo.default({
      envId,
      el: container,
      lang: 'zh-CN',
      path: window.location.pathname,
    })
    // Twikoo 已接管：移除占位，后续不再由 Vue 触碰这块 DOM
    placeholderEl?.remove()
    placeholderEl = null
  } catch (err) {
    container.remove()
    setPlaceholder('留言板加载失败，请刷新重试')
    console.error('Twikoo 加载失败:', err)
  }
}

// 留言板在首屏以下：滚动到附近（提前 300px）才下载 Twikoo，
// 访客没滚到这里就不必为 900KB+ 的评论组件付费。
onMounted(() => {
  const el = sectionEl.value
  if (!el) return

  if (typeof IntersectionObserver === 'undefined') {
    loadTwikoo()
    return
  }

  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer?.disconnect()
      observer = null
      loadTwikoo()
    }
  }, { rootMargin: '300px 0px' })

  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
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

/* 移动端防溢出 */
#twikoo-container {
  max-width: 100%;
  overflow-x: hidden;
  word-break: break-word;
}

:deep(#twikoo-container *) {
  max-width: 100%;
}

:deep(.tk-comment),
:deep(.tk-submit),
:deep(.tk-actions),
:deep(.tk-row) {
  max-width: 100%;
  word-break: break-word;
}

:deep(.tk-input),
:deep(.tk-textarea),
:deep(textarea),
:deep(input) {
  max-width: 100%;
  box-sizing: border-box;
}

:deep(.tk-avatar) {
  flex-shrink: 0;
}

:deep(.tk-content) {
  min-width: 0;
  flex: 1;
}
</style>
