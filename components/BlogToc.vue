<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="mb-5">
      <h2 class="text-headline-md text-on-surface flex items-center gap-2">
        <span>📄</span>
        <span>文章目录</span>
      </h2>
    </div>

    <!-- TOC Tree -->
    <nav class="flex-1 overflow-y-auto">
      <ul v-if="toc.length > 0" class="space-y-0.5">
        <li
          v-for="(item, idx) in toc"
          :key="idx"
          :style="{ paddingLeft: `${(item.depth - 1) * 14}px` }"
        >
          <a
            :href="`#${item.id}`"
            class="block py-1.5 text-body-md transition-colors duration-150
                   border-l-2 pl-3"
            :class="activeId === item.id
              ? 'text-brand-accent border-brand-accent'
              : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant'"
            @click.prevent="scrollToHeading(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
      <p v-else class="text-body-md text-on-surface-variant">
        暂无目录
      </p>
    </nav>

    <!-- Bottom toolbar -->
    <div class="mt-5 pt-4 border-t border-brand-border space-y-3">
      <!-- Back to blog list -->
      <NuxtLink
        to="/blog"
        class="btn-ghost w-full"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        返回博客
      </NuxtLink>

      <!-- Resume download -->
      <ResumeButton />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TocItem {
  id: string
  text: string
  depth: number
}

const props = defineProps<{
  toc: TocItem[]
}>()

const activeId = ref<string>('')

/**
 * Scroll to a heading and update URL hash
 */
function scrollToHeading(id: string) {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}

/**
 * Set up Intersection Observer for scrollspy
 */
onMounted(() => {
  if (props.toc.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.1,
    }
  )

  // Observe all heading elements
  for (const item of props.toc) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }

  onUnmounted(() => observer.disconnect())
})
</script>
