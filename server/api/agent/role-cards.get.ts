// GET /api/agent/role-cards —— 角色卡列表(只对 lucas 开放),透传 Authorization
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')
  if (!auth) throw createError({ statusCode: 401, statusMessage: '未登录' })
  try {
    return await $fetch(`${agentBase}/api/role-cards`, {
      headers: { Authorization: auth },
      timeout: 8000,
    })
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 502,
      statusMessage: 'Role cards unavailable',
    })
  }
})
