/**
 * 会话历史转发(M3.2) —— 切换会话时拉取完整对话,回填消息区。
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/conversations/${id}/messages`, {
      headers: auth ? { Authorization: auth } : {},
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  setResponseStatus(event, res.status)
  return res.json()
})
