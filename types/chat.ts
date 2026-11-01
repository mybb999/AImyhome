/** AI Agent chat message types */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  /** 回答引用的资料来源(RAG 命中,仅 assistant 消息) */
  sources?: SourceItem[]
  /** 流式生成中:期间纯文本直出,结束后再渲染 Markdown(防每 token 重渲染卡顿) */
  streaming?: boolean
  /** 重新生成过的版本列表(角色卡模型,服务器存档),箭头切换纯浏览 */
  versions?: ChatVersion[]
  /** 当前浏览的版本下标(指向 versions 数组) */
  versionIndex?: number
}

/** 一个生成版本(角色卡重新生成,服务器存档跨刷新保留) */
export interface ChatVersion {
  version_no: number
  content: string
}

/** RAG 命中来源,由 Agent 服务经 SSE sources 事件下发 */
export interface SourceItem {
  content: string
  section: string
  source: string
  score: number
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
