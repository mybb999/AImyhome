/**
 * AI Agent API endpoint — 转发到 Python Agent 服务(AImyhome-agent)。
 * 博客只做薄壳透传;SSE 契约保持 OpenAI 格式,前端解析零改动。
 */

import { PassThrough } from 'node:stream'
import type { AgentRequest } from '~/types/chat'

// POST /api/agent —— 聊天接口的「薄壳」:不碰 LLM,只做两件事。
// 1. 把前端请求原样转发给 Python Agent 服务(地址由 AGENT_BASE_URL 定)
// 2. 把 Agent 的 SSE 流「桥接」回浏览器:fetch 返回的是 Web ReadableStream,
//    sendStream 要的是 Node 流,中间用 PassThrough 管道把字节原样搬运
export default defineEventHandler(async (event) => {
  const body = await readBody<AgentRequest>(event)

  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'messages is required' })
  }

  // Agent 服务地址:本地开发默认 127.0.0.1:8000,生产在 Vercel 配环境变量
  const agentBase = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

  let res: Response
  try {
    res = await fetch(`${agentBase}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Agent service unavailable' })
  }

  if (!res.ok) {
    const text = await res.text().catch(() => 'Unknown error')
    throw createError({ statusCode: 502, statusMessage: `Agent error: ${text.slice(0, 200)}` })
  }

  const webStream = res.body!
  const nodeStream = new PassThrough()

  const reader = webStream.getReader()
  const pump = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          nodeStream.end()
          break
        }
        nodeStream.write(Buffer.from(value))
      }
    } catch {
      nodeStream.destroy()
    }
  }
  pump() // 后台抽水:sendStream 会等 nodeStream 结束才返回

  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'X-Accel-Buffering', 'no')

  return sendStream(event, nodeStream)
})
