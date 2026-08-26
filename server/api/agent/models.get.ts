import { availableProviders } from '~/server/utils/llm'

export default defineEventHandler(() => {
  return {
    models: availableProviders().map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
    })),
  }
})
