/**
 * LLM 提供方注册表 —— 配置驱动:加一个模型 = 数组里加一条,前端零改动。
 * 没配 API key 的提供方会自动从下拉列表隐藏(见 availableProviders)。
 *
 * 注意(Task 7 之后):本文件只剩 availableProviders 被 models.get.ts 使用 ——
 * 只负责「告诉前端有哪些模型可选」。真正的模型调用在 Python Agent 服务
 * 那边(aimyhome-agent 的 app/llm.py),id 由前端透传过去。
 * 下面的 resolveProvider / buildSystemPrompt 是旧版 agent.post.ts 直连
 * LLM 时用的,现已无调用方,保留作参考。
 */

export interface LLMProvider {
  /** 模型 id:前端透传给 Agent 服务的 key("doubao" / "glm") */
  id: string
  /** 下拉列表里显示的名字 */
  name: string
  /** 下拉列表里的说明文字(免费额度/特点) */
  description: string
  /** API 根地址(不带头路径) */
  baseURL: string
  /** 具体模型名 */
  model: string
  /** API key;没配 = undefined = 该模型不可用 */
  apiKey?: string
}

const DEFAULT_ZHIPU_BASE = 'https://open.bigmodel.cn/api/paas/v4'
const DEFAULT_ZHIPU_MODEL = 'glm-4.7-flash'
const DOUBAO_BASE = 'https://ark.cn-beijing.volces.com/api/v3'
const DOUBAO_MODEL = 'doubao-seed-2-0-lite-260215'

/** 注册表。数组顺序 = 默认优先级(客户端不传 model 时,取第一个配了 key 的) */
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

/** 现在真正可用的提供方:过滤掉没配 key 的(前端下拉只显示这些) */
export function availableProviders(): LLMProvider[] {
  return LLM_PROVIDERS.filter(p => !!p.apiKey)
}

/** 【已停用】按 id 从白名单里取提供方;未知 id 抛 400。旧版直连 LLM 时用的 */
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

/** 【已停用】组装系统提示词(把当前提供方名字填进去)。旧版直连 LLM 时用的 */
export function buildSystemPrompt(providerName: string): string {
  return `你是 熊仔 的 AI 助手，由 ${providerName} 驱动。你的特点：
- 擅长Node全栈、前端开发、Vue 2、Vue 3、React、TypeScript、可视化等技术话题，包含所有前端技术栈以及Node相关的框架，例如Next和Nest后端技术栈
- 回答风格：专业但不枯燥，像一位有 7 年经验的前端架构师
- 代码示例优先使用 TypeScript/Vue 3，带简要注释
- 不知道就说不知道，不编造`
}
