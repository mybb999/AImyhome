<template>
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
        to="/ai-agent"
        class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
        :class="isAiAgentActive
          ? 'text-brand-accent bg-brand-accent/10'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
      >
        聊天工具
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
</template>

<script setup lang="ts">
const route = useRoute()

const isHomeActive = computed(() => route.path === '/')
const isAiAgentActive = computed(() => route.path.startsWith('/ai-agent'))
const isBlogActive = computed(() => route.path.startsWith('/blog'))
</script>
