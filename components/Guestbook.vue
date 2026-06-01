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
        GitHub 登录即可留言
      </span>
    </div>

    <div class="card">
      <div ref="giscusContainer" />
    </div>

    <div class="card-elevated flex items-start gap-3">
      <span class="text-lg mt-0.5">💡</span>
      <div class="space-y-1 text-body-md text-on-surface-variant">
        <p>留言由 GitHub Discussions 驱动，无需注册额外账号。</p>
        <p>点击下方输入框会自动跳转 GitHub 授权，授权后即可发表评论。</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const giscusContainer = ref<HTMLElement>()

const giscusConfig = {
  repo: 'mybb999/AImyhome',
  repoId: 'R_kgDOStfn4w',
  category: 'General',
  categoryId: 'DIC_kwDOStfn484C-RGL',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'dark',
  lang: 'zh-CN',
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', giscusConfig.repo)
  script.setAttribute('data-repo-id', giscusConfig.repoId)
  script.setAttribute('data-category', giscusConfig.category)
  script.setAttribute('data-category-id', giscusConfig.categoryId)
  script.setAttribute('data-mapping', giscusConfig.mapping)
  script.setAttribute('data-strict', giscusConfig.strict)
  script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
  script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
  script.setAttribute('data-input-position', giscusConfig.inputPosition)
  script.setAttribute('data-theme', giscusConfig.theme)
  script.setAttribute('data-lang', giscusConfig.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  if (giscusContainer.value) {
    giscusContainer.value.appendChild(script)
  }
})
</script>
