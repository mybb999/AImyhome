<template>
  <div class="space-y-6 lg:space-y-8">
    <BlogList :posts="posts" :loading="pending" />
  </div>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

useHead({
  title: '博客中心 — Lucas Space',
  meta: [
    { name: 'description', content: 'Lucas 的技术博客 — 前端架构、可视化、性能优化、AI 辅助开发' },
  ],
})

const { data, pending } = useFetch<BlogListItem[]>('/api/blog', {
  default: () => [],
})

const posts = computed(() => data.value || [])
</script>
