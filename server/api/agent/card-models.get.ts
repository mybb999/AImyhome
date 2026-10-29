// GET /api/agent/card-models —— 角色卡模型列表(只对 lucas 账号开放)。
// 透传 Authorization 给 Agent 服务校验;非 lucas 返回 403,前端就不显示级联菜单。
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: '未登录' })
  }
  try {
    return await $fetch(`${agentBase}/api/card-models`, {
      headers: { Authorization: auth },
      timeout: 8000,
    })
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 502,
      statusMessage: 'Card models unavailable',
    })
  }
})
