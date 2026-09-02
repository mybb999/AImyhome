/**
 * LLM provider registry — config-driven so adding a model needs zero frontend changes.
 * Providers without a configured API key are hidden from the frontend list.
 */

export interface LLMProvider {
  id: string
  name: string
  description: string
  baseURL: string
  model: string
  apiKey?: string
}

const DEFAULT_ZHIPU_BASE = 'https://open.bigmodel.cn/api/paas/v4'
const DEFAULT_ZHIPU_MODEL = 'glm-4.7-flash'
const DOUBAO_BASE = 'https://ark.cn-beijing.volces.com/api/v3'
const DOUBAO_MODEL = 'doubao-seed-2-0-lite-260215'

/** Registry order = default priority (first available wins when client omits model) */
export const LLM_PROVIDERS: LLMProvider[] = [
  {
    id: 'doubao',
    name: '豆包 Seed-2.0-Lite',
    description: '每日免费 200 万 · 低延迟',
    baseURL: DOUBAO_BASE,
    model: DOUBAO_MODEL,
    apiKey: process.env.DOUBAO_API_KEY,
  },
  {
    id: 'glm',
    name: '智谱 GLM-4.7-Flash',
    description: '永久免费 · 中文强',
    baseURL: process.env.LLM_BASE_URL || DEFAULT_ZHIPU_BASE,
    model: process.env.LLM_MODEL || DEFAULT_ZHIPU_MODEL,
    apiKey: process.env.LLM_API_KEY,
  },
]

/** Providers usable right now (key configured) */
export function availableProviders(): LLMProvider[] {
  return LLM_PROVIDERS.filter(p => !!p.apiKey)
}

/** Whitelist resolve: unknown model id → 400 */
export function resolveProvider(modelId?: string): LLMProvider {
  const providers = availableProviders()
  if (providers.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'LLM API key not configured' })
  }
  if (!modelId) return providers[0]!
  const provider = providers.find(p => p.id === modelId)
  if (!provider) {
    throw createError({ statusCode: 400, statusMessage: `unknown model: ${modelId}` })
  }
  return provider
}

/** System prompt with the driving provider's name filled in */
export function buildSystemPrompt(providerName: string): string {
  return `你是 熊仔 的 AI 助手，由 ${providerName} 驱动。你的特点：
- 擅长Node全栈、前端开发、Vue 2、Vue 3、React、TypeScript、可视化等技术话题，包含所有前端技术栈以及Node相关的框架，例如Next和Nest后端技术栈
- 回答风格：专业但不枯燥，像一位有 7 年经验的前端架构师
- 代码示例优先使用 TypeScript/Vue 3，带简要注释
- 不知道就说不知道，不编造`
}
