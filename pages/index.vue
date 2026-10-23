<template>
  <AppShell>
    <template #sidebar>
      <AvatarCard />
    </template>

    <div class="space-y-6 lg:space-y-8">
      <BlogList
        :posts="posts"
        :loading="pending"
        :total="total"
        :initial-count="6"
        more-link="/blog"
      />
      <Guestbook />
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import type { BlogListResponse } from '~/types/blog'

useHead({
  title: 'Lucas Space — 个人网站',
  meta: [
    { name: 'description', content: 'Lucas (Lucas) — ai agent开发工程师 | 小熊博客' },
  ],
})

// 首页只取 6 篇，避免把全部 204 篇的元数据塞进首屏 payload
const { data, pending } = useFetch<BlogListResponse>('/api/blog', {
  query: { limit: 6 },
  default: () => ({ items: [], total: 0 }),
})

const posts = computed(() => data.value?.items || [])
const total = computed(() => data.value?.total || 0)
</script>
