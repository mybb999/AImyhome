/**
 * TEMPORARY debug endpoint — reveals runtime env config seen by the serverless function.
 * Exposes NO credential values: only model id, base URL hostname, and whether the key exists.
 * TODO: remove after production model routing is diagnosed.
 */
export default defineEventHandler(() => {
  let baseUrlHost: string | null = null
  if (process.env.LLM_BASE_URL) {
    try {
      baseUrlHost = new URL(process.env.LLM_BASE_URL).hostname
    } catch {
      baseUrlHost = 'unparseable'
    }
  }
  return {
    llmModel: process.env.LLM_MODEL ?? null,
    llmBaseUrlHost: baseUrlHost,
    apiKeySet: !!process.env.LLM_API_KEY,
    nodeEnv: process.env.NODE_ENV ?? null,
  }
})
