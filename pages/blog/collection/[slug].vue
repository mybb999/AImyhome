<template>
  <AppShell>
    <template #sidebar>
      <BlogSidebar />
    </template>

    <div class="space-y-6 lg:space-y-8">
      <!-- Collection header -->
      <header v-if="collection" class="card">
        <div class="flex items-start gap-4">
          <span class="text-4xl shrink-0 leading-none">{{ collection.icon }}</span>
          <div class="min-w-0 space-y-2">
            <h1 class="text-headline-lg text-on-surface">
              {{ collection.name }}
            </h1>
            <p class="text-body-md text-on-surface-variant">
              {{ collection.description }}
            </p>
            <p class="text-label-md text-on-surface-variant/60">
              {{ collection.count }} 篇文章
            </p>
          </div>
        </div>
      </header>

      <!-- Posts -->
      <BlogList :posts="posts" :loading="pending" :initial-count="24" />
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import type { BlogCollectionWithCount, BlogListItem } from '~/types/blog'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: collections } = await useFetch<BlogCollectionWithCount[]>('/api/collections', {
  default: () => [],
})

const collection = computed(() => collections.value?.find(c => c.slug === slug.value))

if (!collection.value) {
  throw createError({ statusCode: 404, statusMessage: '文集不存在' })
}

const { data: postsData, pending } = await useFetch<BlogListItem[]>('/api/blog', {
  query: { collection: slug },
  default: () => [],
})

const posts = computed(() => postsData.value || [])

useHead({
  title: computed(() =>
    collection.value ? `${collection.value.name} — Lucas Space` : '文集 — Lucas Space'
  ),
  meta: computed(() => [
    { name: 'description', content: collection.value?.description || '' },
  ]),
})
</script>
