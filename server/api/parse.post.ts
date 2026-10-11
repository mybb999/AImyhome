/**
 * 文档解析接口转发(M4):multipart 透传到 Agent 服务。
 * multipart 透传两个要点:①readRawBody 读原始字节(不能用 readBody,
 * 它会按 JSON 解析 body 直接报错)②原样带上 Content-Type(含 boundary,
 * 丢了它服务端解析不了 multipart)。
 * 备案通过后改为浏览器直传 agent 域名(绕 Vercel 4.5MB 上限),删掉本文件。
 */
export default defineEventHandler(async (event) => {
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  const auth = getHeader(event, 'authorization')
  const contentType = getHeader(event, 'content-type')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/parse`, {
      method: 'POST',
      headers: {
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...(auth ? { Authorization: auth } : {}),
      },
      body: await readRawBody(event),   // 原始字节透传
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }
  setResponseStatus(event, res.status)
  return res.json()
})
