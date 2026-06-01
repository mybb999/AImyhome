# Nuxt 3 SSR 性能优化实战：从 LCP 3s 到 1.2s

## 问题诊断

接手一个企业级 Nuxt 3 官网项目时，Lighthouse 评分只有 45 分，LCP 高达 3.2 秒。通过 Chrome DevTools Performance 面板分析，发现三个瓶颈：

1. **首屏 JS 体积过大**：初始 HTML 仅 15KB，但 hydration 的 JS bundle 达到 480KB
2. **字体阻塞渲染**：Google Fonts 的 CSS 请求链路过长
3. **图片未优化**：首页 banner 图 2.4MB，未经压缩

## 优化策略

### 1. 混合渲染策略

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  routeRules: {
    '/': { prerender: true },          // 首页静态生成
    '/blog/**': { swr: 3600 },         // 博客 ISR，1小时过期
    '/api/**': { cors: true },         // API 跨域
  },
})
```

### 2. 字体加载优化

将 Google Fonts 的外链改为本地托管 + `font-display: swap`：

```css
@font-face {
  font-family: 'Geist';
  src: url('/fonts/Geist.woff2') format('woff2');
  font-display: swap;
}
```

### 3. 图片优化

- WebP 格式替代 PNG/JPEG
- `<NuxtImg>` 组件自动生成 srcset 响应式图片
- 首屏图片使用 `fetchpriority="high"`

## 优化成果

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| LCP | 3.2s | 1.2s | 62%↓ |
| TBT | 480ms | 85ms | 82%↓ |
| Lighthouse | 45 | 92 | +47 |
| JS Bundle | 480KB | 142KB | 70%↓ |

核心经验：**先静态后动态，能预渲染的绝不 CSR**。
