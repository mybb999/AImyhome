/**
 * AI Agent API endpoint — proxies chat requests to 智谱 GLM API.
 * Uses SSE streaming for real-time token-by-token output.
 */

import { PassThrough } from 'node:stream'
import type { AgentRequest } from '~/types/chat'

// 智谱 error body: {"error":{"code":"1305","message":"..."}}
function extractLlmErrorMessage(text: string): string {
  try {
    const message = JSON.parse(text)?.error?.message
    if (message) return message
  } catch {
    // keep raw text
  }
  return `LLM API error: ${text.slice(0, 200)}`
}

// ── System prompt ──
const SYSTEM_PROMPT = `你是 熊仔 的 AI 助手，由智谱 GLM 驱动。你的特点：
- 擅长Node全栈、前端开发、Vue 3、TypeScript、可视化等技术话题
- 回答风格：专业但不枯燥，像一位有 7 年经验的前端架构师
- 代码示例优先使用 TypeScript/Vue 3，带简要注释
- 不知道就说不知道，不编造`

export default defineEventHandler(async (event) => {
  const body = await readBody<AgentRequest>(event)

  // Validate
  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'messages is required' })
  }

  const { messages } = body

  // Prepend system prompt
  const fullMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ]

  // Build the LLM API URL
  const baseUrl = (process.env.LLM_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4').replace(/\/$/, '')
  const model = process.env.LLM_MODEL || 'glm-4.7-flash'
  const apiKey = process.env.LLM_API_KEY

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'LLM API key not configured' })
  }

  // Call 智谱 GLM API with streaming
  // thinking disabled → instant answers, no reasoning_content chunks (GLM-4.7-Flash thinks by default)
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: fullMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 4096,
      thinking: { type: 'disabled' },
    }),
  }

  let llmResponse: Response
  try {
    llmResponse = await fetch(`${baseUrl}/chat/completions`, requestOptions)
  } catch (err) {
    throw createError({ statusCode: 502, statusMessage: 'AI service unavailable' })
  }

  let errorText = ''
  if (!llmResponse.ok) {
    errorText = await llmResponse.text().catch(() => 'Unknown error')
    // Free tier occasionally returns 1305 (访问量过大) — retry once
    const retriable = llmResponse.status === 429 || llmResponse.status >= 500 || errorText.includes('1305')
    if (retriable) {
      await new Promise(resolve => setTimeout(resolve, 1200))
      try {
        llmResponse = await fetch(`${baseUrl}/chat/completions`, requestOptions)
      } catch {
        throw createError({ statusCode: 502, statusMessage: 'AI service unavailable' })
      }
      if (!llmResponse.ok) {
        errorText = await llmResponse.text().catch(() => 'Unknown error')
      }
    }
    if (!llmResponse.ok) {
      throw createError({
        statusCode: 502,
        statusMessage: extractLlmErrorMessage(errorText),
      })
    }
  }

  // Bridge web ReadableStream → Node.js PassThrough for Nuxt's sendStream
  const webStream = llmResponse.body!
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
