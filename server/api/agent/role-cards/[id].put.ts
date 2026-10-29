// PUT /api/agent/role-cards/:id —— 编辑角色卡(只对 lucas 开放),透传 Authorization
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')
  if (!auth) throw createError({ statusCode: 401, statusMessage: '未登录' })
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  try {
    return await $fetch(`${agentBase}/api/role-cards/${id}`, {
      method: 'PUT',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body,
      timeout: 8000,
    })
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 502,
      statusMessage: e?.data?.detail || 'Update role card failed',
    })
  }
})
