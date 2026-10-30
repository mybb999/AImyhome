// GET /api/credits —— 代理到 Agent 服务的「剩余积分」接口。
// 数据源是火山方舟费用中心(账户余额),Agent 侧缓存 5 分钟;这里只做薄壳转发,
// 不缓存(避免博客侧 CDN 把余额缓存住)。
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  // 余额是所有人共享的同一份数据:边缘缓存 1 分钟,少打一次 Vercel 函数和源站
  setHeader(event, 'Cache-Control', 'public, max-age=60, s-maxage=60')
  try {
    return await $fetch(`${agentBase}/api/credits`, { timeout: 8000 })
  } catch {
    // 查不到余额不该影响聊天:前端收到非 2xx 会显示「—」
    throw createError({ statusCode: 502, statusMessage: 'Credits unavailable' })
  }
})
