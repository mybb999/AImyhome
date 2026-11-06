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

    <div class="card">
      <ClientOnly>
        <div
          ref="loadingEl"
          class="flex items-center justify-center py-12 min-h-[160px] text-on-surface-variant text-body-md"
          hidden
        >
          评论加载中...
        </div>
        <div id="twikoo-container" />
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
import { onBeforeUnmount, ref } from 'vue'

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
const loadingEl = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let started = false
let scriptPromise: Promise<TwikooApi> | null = null

// 官方 UMD 构建自托管：只在滚动到留言板时才注入 <script>，
// 不参与 Vite 打包（打包版在线上出现过 Vue 2 渲染异常）。
function loadTwikooScript(): Promise<TwikooApi> {
  if (window.twikoo) return Promise.resolve(window.twikoo)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<TwikooApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/vendor/twikoo.all.min.js'
    script.async = true
    script.onload = () => {
      if (window.twikoo) resolve(window.twikoo)
      else reject(new Error('Twikoo 脚本未注册 window.twikoo'))
    }
    script.onerror = () => reject(new Error('Twikoo 脚本加载失败'))
    document.head.appendChild(script)
  })
  return scriptPromise
}

// 等 Twikoo 真的把 DOM 渲染出来，再隐藏「加载中」
function waitForRender(timeout = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    const start = Date.now()
    const check = () => {
      if (document.querySelector('.twikoo, .tk-submit')) return resolve(true)
      if (Date.now() - start > timeout) return resolve(false)
      setTimeout(check, 100)
    }
    check()
  })
}

async function loadTwikoo(attempt = 0) {
  if (started) return
  const container = document.getElementById('twikoo-container')
  if (!container || !container.isConnected) {
    // ClientOnly 还没把容器渲染出来时重试，避免静默不加载
    if (attempt < 10) setTimeout(() => loadTwikoo(attempt + 1), 200)
    return
  }
  started = true
  if (loadingEl.value) loadingEl.value.hidden = false

  try {
    const twikoo = await loadTwikooScript()

    // 开发环境：浏览器直连 Vercel（需设备开 VPN）
    // 生产环境：走 Nuxt 服务端代理（Vercel 内部互通，无需 VPN）
    const isDev = window.location.hostname === 'localhost'
      || window.location.hostname.startsWith('192.168.')
      || window.location.hostname.startsWith('10.')
      || window.location.hostname.startsWith('172.')
    const envId = isDev
      ? 'https://message-board-pi-pearl.vercel.app'
      : `${window.location.origin}/api/twikoo`

    await twikoo.init({
      envId,
      el: '#twikoo-container',
      lang: 'zh-CN',
      path: window.location.pathname,
    })
    // 线上慢网络下 init 可能静默结束；确认渲染后再收起占位
    if (!(await waitForRender())) throw new Error('Twikoo 未渲染内容')
    if (loadingEl.value) loadingEl.value.hidden = true
  } catch (err) {
    if (loadingEl.value) {
      loadingEl.value.hidden = false
      loadingEl.value.textContent = '留言板加载失败，请刷新重试'
    }
    console.error('Twikoo 加载失败:', err)
  }
}

// 留言板在首屏以下：滚动到附近（提前 300px）才下载 Twikoo，
// 访客没滚到这里就不必为 900KB+ 的评论组件付费。
// 必须等 hydration 完成（onNuxtReady）再挂 observer：慢网络下 Vue 还在
// 补丁 ClientOnly 子树，过早插入的原生节点会被 hydration 清掉。
onNuxtReady(() => {
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
