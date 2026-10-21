<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="mb-5">
      <h2 class="text-headline-md text-on-surface flex items-center gap-2">
        <span>📚</span>
        <span>文集</span>
      </h2>
    </div>

    <!-- Collection nav -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="space-y-0.5">
        <!-- All posts -->
        <li>
          <NuxtLink
            to="/blog"
            class="flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-body-md transition-all duration-150"
            :class="isAllActive
              ? 'text-brand-accent bg-brand-accent/10 border-l-2 border-brand-accent'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50 border-l-2 border-transparent'"
          >
            <span class="font-medium truncate">全部文章</span>
            <span class="text-label-md text-on-surface-variant/60 shrink-0">{{ total }}</span>
          </NuxtLink>
        </li>

        <!-- Collections -->
        <li v-for="c in collections" :key="c.slug">
          <NuxtLink
            :to="`/blog/collection/${c.slug}`"
            class="flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-body-md transition-all duration-150"
            :class="isActive(c.slug)
              ? 'text-brand-accent bg-brand-accent/10 border-l-2 border-brand-accent'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50 border-l-2 border-transparent'"
          >
            <span class="flex items-center gap-2 min-w-0">
              <span class="shrink-0">{{ c.icon }}</span>
              <span class="font-medium truncate">{{ c.name }}</span>
            </span>
            <span class="text-label-md text-on-surface-variant/60 shrink-0">{{ c.count }}</span>
          </NuxtLink>
        </li>
      </ul>

      <p v-if="!collections.length" class="text-body-md text-on-surface-variant py-4">
        暂无文集
      </p>
    </nav>

    <!-- Bottom toolbar -->
    <div class="mt-5 pt-4 border-t border-brand-border space-y-3">
      <NuxtLink to="/" class="btn-ghost w-full">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogCollectionWithCount } from '~/types/blog'

const route = useRoute()

// Non-blocking fetch: the sidebar renders immediately, counts fill in when ready.
const { data } = useFetch<BlogCollectionWithCount[]>('/api/collections', {
  default: () => [],
})

const collections = computed(() => data.value || [])
const total = computed(() => collections.value.reduce((sum, c) => sum + c.count, 0))

const isAllActive = computed(() => route.path === '/blog')

function isActive(slug: string) {
  return route.path === `/blog/collection/${slug}`
}
</script>
