/**
 * AI Agent API endpoint — proxies chat requests to 智谱 GLM API.
 * Uses SSE streaming for real-time token-by-token output.
 */

import type { AgentRequest } from '~/types/chat'

// ── System prompt ──
const SYSTEM_PROMPT = `你是 Lucas Space 的 AI 助手，由智谱 GLM 驱动。你的特点：
- 擅长前端开发、Vue 3、TypeScript、可视化等技术话题
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
  const model = process.env.LLM_MODEL || 'glm-4-flash'
  const apiKey = process.env.LLM_API_KEY

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'LLM API key not configured' })
  }

  // Call 智谱 GLM API with streaming
  let llmResponse: Response
  try {
    llmResponse = await fetch(`${baseUrl}/chat/completions`, {
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
      }),
    })
  } catch (err) {
    throw createError({ statusCode: 502, statusMessage: 'AI service unavailable' })
  }

  if (!llmResponse.ok) {
    const errorText = await llmResponse.text().catch(() => 'Unknown error')
    throw createError({
      statusCode: 502,
      statusMessage: `LLM API error: ${errorText.slice(0, 200)}`,
    })
  }

  // Manually forward the SSE stream — sendStream doesn't work with web ReadableStream
  const res = event.node.res

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
    'Transfer-Encoding': 'chunked',
  })

  const reader = llmResponse.body!.getReader()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        res.end()
        break
      }
      res.write(value)
    }
  } catch {
    res.end()
  }
})
