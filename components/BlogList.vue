<template>
  <section class="space-y-5">
    <!-- Section header -->
    <div class="flex items-center justify-between">
      <h2 class="text-headline-lg text-on-surface">
        📝 博客中心
      </h2>
      <span class="text-body-md text-on-surface-variant">
        {{ posts.length }} 篇文章
      </span>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="space-y-4">
      <div
        v-for="n in 3"
        :key="n"
        class="card animate-pulse"
      >
        <div class="space-y-3">
          <div class="h-4 w-32 bg-surface-high rounded" />
          <div class="h-6 w-3/4 bg-surface-high rounded" />
          <div class="h-4 w-full bg-surface-high rounded" />
        </div>
      </div>
    </div>

    <!-- Blog Card Grid -->
    <TransitionGroup
      v-else
      name="blog-list"
      tag="div"
      class="space-y-4"
    >
      <BlogCard
        v-for="(post, idx) in posts"
        :key="post.id"
        :post="post"
        :style="{ animationDelay: `${idx * 80}ms` }"
        class="animate-slide-up"
        @click="navigateTo(`/blog/${post.slug}`)"
      />
    </TransitionGroup>

    <!-- Empty state -->
    <div v-if="!loading && posts.length === 0" class="card text-center py-10">
      <p class="text-body-lg text-on-surface-variant">暂无文章</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

defineProps<{
  posts: BlogListItem[]
  loading?: boolean
}>()
</script>

<style scoped>
.blog-list-enter-active {
  transition: all 0.4s ease-out;
}
.blog-list-leave-active {
  transition: all 0.3s ease-in;
}
.blog-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.blog-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
