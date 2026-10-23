<template>
  <article v-if="data" class="space-y-6">
    <!-- Article header -->
    <header class="space-y-4">
      <!-- Collection + tags -->
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-if="collectionMeta"
          :to="`/blog/collection/${data.collection}`"
          class="chip-accent text-label-md hover:bg-brand-accent/20 transition-colors"
        >
          {{ collectionMeta.icon }} {{ collectionMeta.name }}
        </NuxtLink>
        <span
          v-for="tag in data.tags"
          :key="tag"
          class="chip text-label-md"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-headline-lg text-on-surface">
        {{ data.title }}
      </h1>

      <!-- Meta -->
      <div class="flex flex-wrap items-center gap-4 text-body-md text-on-surface-variant">
        <!-- Date -->
        <span class="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ formattedDate }}
        </span>
        <!-- Reading time -->
        <span class="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ readingTime }} min read
        </span>
      </div>

      <!-- Divider -->
      <div class="divider" />
    </header>

    <!-- Markdown body -->
    <div
      class="prose prose-invert max-w-none
             prose-headings:text-on-surface
             prose-h2:text-headline-md prose-h2:mt-8 prose-h2:mb-4
             prose-h3:text-headline-md prose-h3:mt-6 prose-h3:mb-3
             prose-p:text-body-lg prose-p:text-on-surface-variant
             prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
             prose-code:text-secondary prose-code:bg-surface-high prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
             prose-pre:bg-surface-lowest prose-pre:border prose-pre:border-brand-border prose-pre:rounded-lg
             prose-blockquote:border-l-brand-accent prose-blockquote:text-on-surface-variant
             prose-li:text-body-md prose-li:text-on-surface-variant
             prose-strong:text-on-surface
             prose-img:rounded-lg
             prose-hr:border-brand-border
             [&_pre_code]:bg-transparent"
    >
      <ContentRenderer :value="data" />
    </div>

    <!-- End divider -->
    <div class="divider" />

    <!-- Share / back -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <NuxtLink :to="backTo" class="btn-ghost text-body-md">
        ← 返回博客列表
      </NuxtLink>
      <div class="flex items-center gap-4">
        <a
          v-if="data.originalUrl"
          :href="data.originalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-label-md text-on-surface-variant hover:text-brand-accent transition-colors"
        >
          原文发表于简书 ↗
        </a>
        <span class="text-label-md text-on-surface-variant">
          Thanks for reading 🎉
        </span>
      </div>
    </div>
  </article>

  <!-- Loading -->
  <div v-else-if="pending" class="card space-y-4 animate-pulse">
    <div class="h-6 w-24 bg-surface-high rounded" />
    <div class="h-10 w-3/4 bg-surface-high rounded" />
    <div class="h-4 w-48 bg-surface-high rounded" />
    <div class="divider" />
    <div class="space-y-3">
      <div class="h-4 w-full bg-surface-high rounded" />
      <div class="h-4 w-full bg-surface-high rounded" />
      <div class="h-4 w-2/3 bg-surface-high rounded" />
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="card text-center py-16 space-y-4">
    <p class="text-headline-md text-on-surface">文章未找到</p>
    <p class="text-body-md text-on-surface-variant">请检查链接是否正确</p>
    <NuxtLink :to="backTo" class="btn-primary inline-flex">返回博客列表</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { collectionMap } from '~/data/collections'

const props = withDefaults(defineProps<{
  data: any | null
  pending?: boolean
  readingTime?: number
  /** 返回目标：进入文章前的列表页，默认全部文章 */
  backTo?: string
}>(), {
  backTo: '/blog',
})

const collectionMeta = computed(() => {
  const slug = props.data?.collection
  return slug ? collectionMap.get(slug) : undefined
})

const formattedDate = computed(() => {
  if (!props.data?.date) return ''
  const d = new Date(props.data.date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>
