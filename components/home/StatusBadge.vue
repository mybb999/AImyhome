<template>
  <div class="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
       style="background: rgba(78, 222, 163, 0.1);">
    <!-- Pulse dot -->
    <span class="relative flex h-2.5 w-2.5">
      <span class="absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75 animate-ping" />
      <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-accent" />
    </span>
    <!-- Label -->
    <span class="text-label-md font-medium text-brand-accent">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: '求职中：前端开发工程师 | 深圳',
})
</script>
