<template>
  <div class="space-y-4">
    <h3 class="text-label-md font-semibold text-on-surface-variant uppercase tracking-wider">
      核心技能树 · 7年经验
    </h3>

    <div class="space-y-3">
      <div
        v-for="(category, idx) in skills"
        :key="idx"
        class="card space-y-2"
      >
        <h4 class="text-body-md font-semibold text-secondary">
          {{ category.title }}
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="skill in category.items"
            :key="skill"
            class="chip text-label-md"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  {
    title: '框架与核心',
    items: ['Vue 3 / Pinia', 'React / HZero', 'TypeScript', 'UniApp', '小程序'],
  },
  {
    title: '工程化与性能',
    items: ['Nuxt.js (SSR)', 'Vite / Webpack', 'Jenkins CI/CD', 'Node.js / Express'],
  },
  {
    title: '可视化与图表',
    items: ['ECharts', 'jsplumb / mind-map', 'Draggable / Sortable', '大屏数据监控'],
  },
  {
    title: 'AI 前沿生产力',
    items: ['Cursor', 'Claude Code', 'CodeBuddy', '通义灵码', 'Vibe Coding'],
  },
]
</script>
