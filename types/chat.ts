/** AI Agent chat message types */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

/** Generate unique message ID */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/** API request body for /api/agent */
export interface AgentRequest {
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  /** Optional model id; server falls back to the first available provider */
  model?: string
}

/** Available LLM model option exposed to the frontend */
export interface LLMModelInfo {
  id: string
  name: string
  description: string
}
