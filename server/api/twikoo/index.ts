/**
 * Twikoo 代理 — 处理 /api/twikoo (无子路径)
 */
import { proxyTwikoo } from './proxy'

export default defineEventHandler(async (event) => {
  return proxyTwikoo(event, '')
})
