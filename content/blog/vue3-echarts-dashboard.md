# Vue 3 + ECharts 构建金融数据可视化大屏

## 项目背景

为某券商打造一套面向投顾团队的数据可视化大屏系统，核心需求：

- 实时展示 A 股市场行情数据
- 支持多屏联动（主屏 + 2 块副屏）
- 暗色主题，符合 Midnight Slate 设计规范
- 自适应 1920×1080 到 4K 分辨率

## 技术选型

| 模块 | 方案 | 理由 |
|------|------|------|
| 框架 | Vue 3 + Composition API | 逻辑复用方便 |
| 图表 | ECharts 5 | 金融图表生态最完善 |
| 实时数据 | WebSocket + Pinia | 全局状态同步 |
| 自适应 | CSS transform: scale | 等比缩放，无布局错乱 |
| 构建 | Vite | 秒级 HMR |

## 核心实现

### 大屏自适应缩放

```typescript
// composables/useScreenScale.ts
export function useScreenScale(
  designWidth = 1920,
  designHeight = 1080
) {
  const scale = ref(1)
  
  function updateScale() {
    const w = window.innerWidth / designWidth
    const h = window.innerHeight / designHeight
    scale.value = Math.min(w, h)
  }
  
  onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
  })
  
  return { scale }
}
```

### 实时数据推送

WebSocket 接收行情推送，Pinia store 统一管理状态。图表组件通过 `watch` 监听数据变化后调用 ECharts 的 `setOption` 增量更新，避免全量重绘。

## 上线效果

系统上线后支撑了营业部 20+ 块大屏的同时展示，数据刷新延迟控制在 100ms 以内。
