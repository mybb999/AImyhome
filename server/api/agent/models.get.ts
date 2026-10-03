// GET /api/agent/models —— 给前端聊天页的模型下拉列表提供数据。
// 列表由博客侧的注册表(llm.ts)维护,id 会随 /api/agent 请求透传给
// Python Agent 服务,由它选择真正的对话模型。没配 key 的模型已被过滤。
import { availableProviders } from '~/server/utils/llm'

// 组装返回:{ models: [{id, name, description}] }
export default defineEventHandler(() => {
  return {
    models: availableProviders().map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
    })),
  }
})
