<template>
  <div class="space-y-6 lg:space-y-8">
    <BlogList :posts="posts" :loading="pending" />
    <Guestbook />
  </div>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

useHead({
  title: 'Lucas Space — 个人全栈网站',
  meta: [
    { name: 'description', content: 'Lucas (Lucas) — 高级前端开发工程师 | 7年前端经验，全栈独立博客' },
  ],
})

const { data, pending } = useFetch<BlogListItem[]>('/api/blog', {
  default: () => [],
})

const posts = computed(() => data.value || [])
</script>
