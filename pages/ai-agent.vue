<template>
  <div class="space-y-6 lg:space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-headline-lg text-on-surface flex items-center gap-3">
        🤖 AI Agent
      </h1>
      <p class="mt-2 text-body-lg text-on-surface-variant">
        AI 驱动 · 智能助手
      </p>
    </div>

    <!-- Placeholder card -->
    <div class="card space-y-4">
      <p class="text-body-md text-on-surface-variant">
        即将上线，敬请期待。
      </p>
      <div
        class="flex items-center justify-center py-16
               text-on-surface-variant/40 text-body-lg"
      >
        AI Agent 模块建设中...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'AI Agent — Lucas Space',
  meta: [
    { name: 'description', content: 'AI Agent 智能助手 — Lucas Space' },
  ],
})
</script>
