<template>
  <BlogContent :data="data" :pending="pending" :reading-time="readingTime" />
</template>

<script setup lang="ts">
import type { TocItem } from '~/components/BlogToc.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, pending } = await useAsyncData(
  `blog-${slug.value}`,
  async () => {
    try {
      const doc = await queryContent('blog', slug.value).findOne()
      if (doc) return doc
    } catch {}
    try {
      return await $fetch(`/api/blog?id=${slug.value}`)
    } catch {
      return null
    }
  }
)

// Compute TOC from content
const toc = computed<TocItem[]>(() => {
  if (!data.value?.body?.toc?.links) return []
  return data.value.body.toc.links.map((link: any) => ({
    id: link.id,
    text: link.text,
    depth: link.depth,
  }))
})

// Inject TOC into layout
const setBlogToc = inject<(toc: TocItem[]) => void>('setBlogToc', () => {})
watch(toc, (val) => setBlogToc(val), { immediate: true })

const readingTime = computed(() => {
  if (!data.value) return 0
  const text = data.value.description || ''
  const bodyText = data.value.body ? JSON.stringify(data.value.body) : ''
  return Math.max(1, Math.ceil((text.length + bodyText.length) / 200))
})

useHead({
  title: computed(() => data.value?.title || '文章 — Lucas Space'),
  meta: computed(() => [
    { name: 'description', content: data.value?.description || '' },
    { property: 'og:title', content: data.value?.title || 'Lucas Space' },
    { property: 'og:description', content: data.value?.description || '' },
    { property: 'og:type', content: 'article' },
  ]),
})
</script>
