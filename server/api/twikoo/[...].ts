/**
 * Twikoo 代理 — 处理 /api/twikoo/* (带子路径)
 */
import { proxyTwikoo } from './proxy'

export default defineEventHandler(async (event) => {
  const subPath = event.path.replace('/api/twikoo', '')
  return proxyTwikoo(event, subPath)
})
