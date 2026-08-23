<template>
  <AppShell>
    <template #sidebar>
      <AvatarCard />
    </template>

    <div class="space-y-6 lg:space-y-8">
      <BlogList :posts="posts" :loading="pending" />
      <Guestbook />
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

useHead({
  title: 'Lucas Space — 个人网站',
  meta: [
    { name: 'description', content: 'Lucas (Lucas) — ai agent开发工程师 | 小熊博客' },
  ],
})

const { data, pending } = useFetch<BlogListItem[]>('/api/blog', {
  default: () => [],
})

const posts = computed(() => data.value || [])
</script>
