/**
 * AI Agent API endpoint — 转发到 Python Agent 服务(AImyhome-agent)。
 * Agent 服务负责 RAG 检索 + LangGraph 编排 + 流式输出,博客只做薄壳透传。
 * SSE 契约保持 OpenAI 格式,前端解析零改动。
 */

import { PassThrough } from 'node:stream'
import type { AgentRequest } from '~/types/chat'

export default defineEventHandler(async (event) => {
  const body = await readBody<AgentRequest>(event)

  // Validate
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

  // Bridge web ReadableStream → Node.js PassThrough(和原实现一致)
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
  pump() // Background — sendStream will wait for nodeStream to end

  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'X-Accel-Buffering', 'no')

  return sendStream(event, nodeStream)
})
