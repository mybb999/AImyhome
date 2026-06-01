<template>
  <article
    class="card group cursor-pointer
           hover:border-brand-accent/30 transition-all duration-300
           hover:translate-y-[-2px]"
    @click="$emit('click')"
  >
    <div class="space-y-3">
      <!-- Meta row: date + reading time -->
      <div class="flex items-center gap-4 text-label-md text-on-surface-variant">
        <span class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ formattedDate }}
        </span>
        <span class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ post.readingTime }} min read
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-headline-md text-on-surface group-hover:text-brand-accent transition-colors duration-200">
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p class="text-body-md text-on-surface-variant line-clamp-2">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="chip text-label-md"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

const props = defineProps<{
  post: BlogListItem
}>()

defineEmits<{
  click: []
}>()

const formattedDate = computed(() => {
  const d = new Date(props.post.date)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>
