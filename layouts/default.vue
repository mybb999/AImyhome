<template>
  <div class="min-h-screen bg-brand-bg font-geist">
    <!-- ===== Top Navigation Bar ===== -->
    <header
      class="fixed top-0 left-0 right-0 z-20 h-14
             bg-brand-bg/95 backdrop-blur-sm
             border-b border-brand-border
             flex items-center justify-between px-4 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="text-headline-md text-on-surface hover:text-brand-accent transition-colors duration-200 whitespace-nowrap"
      >
        Lucas的个人博客
      </NuxtLink>

      <nav class="flex items-center gap-1">
        <NuxtLink
          to="/"
          class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
          :class="isHomeActive
            ? 'text-brand-accent bg-brand-accent/10'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
        >
          首页
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
          :class="isBlogActive
            ? 'text-brand-accent bg-brand-accent/10'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
        >
          博客
        </NuxtLink>
      </nav>

      <div class="w-20 hidden lg:block" />
    </header>

    <!-- ===== Body below navbar ===== -->
    <div class="pt-14 lg:flex">
      <!-- Left Sidebar -->
      <aside
        class="
          lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-[320px] lg:shrink-0
          overflow-y-auto
          p-4 lg:p-6
          border-b lg:border-b-0 lg:border-r border-brand-border
          bg-brand-bg
          z-10
        "
      >
        <!-- Sidebar: switch by route -->
        <AvatarCard v-if="route.path === '/'" />
        <BlogSidebar v-else-if="route.path === '/blog'" />
        <BlogToc v-else :toc="blogToc" />
      </aside>

      <!-- Right Main Content -->
      <main class="flex-1 min-h-[calc(100vh-3.5rem)] p-4 lg:p-6">
        <slot />

        <footer class="mt-12 lg:mt-16 pb-8 text-center">
          <p class="text-label-md text-on-surface-variant">
            © 2026 Lucas Space — Built with Nuxt 3 & Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { TocItem } from '~/components/BlogToc.vue'

const route = useRoute()

const isHomeActive = computed(() => route.path === '/')
const isBlogActive = computed(() => route.path.startsWith('/blog'))

// TOC will be injected by blog detail page via a composable or provide/inject
// For now, use a simple reactive approach
const blogToc = ref<TocItem[]>([])

// Expose for blog detail page to set
provide('setBlogToc', (toc: TocItem[]) => {
  blogToc.value = toc
})
</script>
