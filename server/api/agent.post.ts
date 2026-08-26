/**
 * AI Agent API endpoint — proxies chat requests to the selected LLM provider.
 * Uses SSE streaming for real-time token-by-token output.
 */

import { PassThrough } from 'node:stream'
import type { AgentRequest } from '~/types/chat'
import { resolveProvider, buildSystemPrompt } from '~/server/utils/llm'

// Provider error body: {"error":{"code":"...","message":"..."}}
function extractLlmErrorMessage(text: string): string {
  try {
    const message = JSON.parse(text)?.error?.message
    if (message) return message
  } catch {
    // keep raw text
  }
  return `LLM API error: ${text.slice(0, 200)}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<AgentRequest>(event)

  // Validate
  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'messages is required' })
  }

  const { messages } = body

  // Route to the selected provider (whitelist-checked)
  const provider = resolveProvider(body.model)
  const apiKey = provider.apiKey!

  // Prepend system prompt (named after the selected provider)
  const fullMessages = [
    { role: 'system', content: buildSystemPrompt(provider.name) },
    ...messages,
  ]

  const baseUrl = provider.baseURL.replace(/\/$/, '')

  // Call provider API with streaming
  // thinking disabled → instant answers, no reasoning_content chunks
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
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
    // Free tier occasionally returns rate-limit/overload errors — retry once
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
