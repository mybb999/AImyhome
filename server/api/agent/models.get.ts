// GET /api/agent/models —— 给前端聊天页的模型下拉列表提供数据。
// 列表由博客侧的注册表(llm.ts)维护,id 会随 /api/agent 请求透传给
// Python Agent 服务,由它选择真正的对话模型。没配 key 的模型已被过滤。
//
// 2026-11-11:收费模型(DeepSeek)只对白名单账号展示。白名单只在 Agent 服务
// 维护,这里带上 Authorization 问 /api/auth/me,不重复一份名单。
import { availableProviders } from '~/server/utils/llm'

async function paidModelsAllowed(auth?: string): Promise<boolean> {
  if (!auth) return false
  const base = (process.env.AGENT_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')
  try {
    const res = await fetch(`${base}/api/auth/me`, {
      headers: { Authorization: auth },
      // Agent 挂了/超时:保守返回 false,少显示而不是多显示
      signal: AbortSignal.timeout(2000),
    })
    if (!res.ok) return false
    const data = await res.json() as { paid_models_allowed?: boolean }
    return data.paid_models_allowed === true
  } catch {
    return false
  }
}

// 组装返回:{ models: [{id, name, description}] }
export default defineEventHandler(async (event) => {
  // 列表因人而异(收费模型),禁止共享缓存,否则会把 lucas 的列表缓存给游客
  setHeader(event, 'Cache-Control', 'private, no-store')

  const allowed = await paidModelsAllowed(getHeader(event, 'authorization'))
  return {
    models: availableProviders()
      .filter(p => !p.paid || allowed)
      .map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
  }
})
