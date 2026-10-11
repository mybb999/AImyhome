/**
 * 改密码接口转发(M3.2 补全) —— 透传 Authorization + 请求体,原样透传状态码。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ old_password: string; new_password: string }>(event)
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  // 透传状态码:401(旧密码错)/400(新密码太短)要让前端原样看到
  setResponseStatus(event, res.status)
  return res.json()
})
