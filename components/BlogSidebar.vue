<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="mb-5">
      <h2 class="text-headline-md text-on-surface flex items-center gap-2">
        <span>📝</span>
        <span>所有文章</span>
      </h2>
    </div>

    <!-- Article list -->
    <nav class="flex-1 overflow-y-auto">
      <ul v-if="posts.length > 0" class="space-y-0.5">
        <li v-for="post in posts" :key="post.id">
          <NuxtLink
            :to="`/blog/${post.slug}`"
            class="block py-2 px-3 rounded-lg text-body-md transition-all duration-150"
            :class="$route.params.slug === post.slug
              ? 'text-brand-accent bg-brand-accent/10 border-l-2 border-brand-accent'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50 border-l-2 border-transparent'"
          >
            <div class="font-medium truncate">{{ post.title }}</div>
            <div class="flex items-center gap-3 mt-1 text-label-md text-on-surface-variant/60">
              <span>{{ formatDate(post.date) }}</span>
              <span>{{ post.readingTime }} min</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <p v-else class="text-body-md text-on-surface-variant py-4">
        暂无文章
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
      <ResumeButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

const { data: posts } = await useFetch<BlogListItem[]>('/api/blog', {
  default: () => [],
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}-${d.getDate()}`
}
</script>
