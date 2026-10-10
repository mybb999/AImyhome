/**
 * 新建会话转发(M3.2) —— 透传 Authorization 头给 Agent 服务鉴权。
 */
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/conversations`, {
      method: 'POST',
      headers: auth ? { Authorization: auth } : {},
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  setResponseStatus(event, res.status)
  return res.json()
})
