/**
 * 压缩会话上下文转发(记忆治理):透传 Authorization + 状态码。
 * 前端「压缩上下文」按钮调这里 —— 服务端把历史压成摘要,保留最近几轮。
 */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/conversations/${id}/summarize`, {
      method: 'POST',
      headers: { ...(auth ? { Authorization: auth } : {}) },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  setResponseStatus(event, res.status)
  return res.json()
})
