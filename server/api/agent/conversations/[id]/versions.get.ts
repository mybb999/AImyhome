// GET /api/agent/conversations/:id/versions —— 会话当前轮的生成版本列表
// (角色卡重新生成用),透传 Authorization 给 Agent 服务校验。
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: '未登录' })
  }
  const id = getRouterParam(event, 'id')
  try {
    return await $fetch(`${agentBase}/api/conversations/${id}/versions`, {
      headers: { Authorization: auth },
      timeout: 8000,
    })
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 502,
      statusMessage: e?.data?.detail || 'Versions unavailable',
    })
  }
})
