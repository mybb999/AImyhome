/**
 * 登录接口转发(M3.2) —— 薄壳:把前端请求原样转给 Agent 服务,原样透传状态码。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ username: string; password: string }>(event)

  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  // 透传状态码:401(用户名或密码错)要让前端原样看到
  setResponseStatus(event, res.status)
  return res.json()
})
