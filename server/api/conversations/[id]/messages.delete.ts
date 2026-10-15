/**
 * 清空会话历史转发(M3.2 补全):透传 Authorization + 状态码。
 * 前端「清空对话」靠它删服务端 checkpointer 记忆 —— 只清前端刷新会复原。
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/conversations/${id}/messages`, {
      method: 'DELETE',
      headers: { ...(auth ? { Authorization: auth } : {}) },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  setResponseStatus(event, res.status)
  return res.json()
})
