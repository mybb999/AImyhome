/**
 * Twikoo 代理共享逻辑
 */
const TWIKOO_BACKEND = 'https://message-board-pi-pearl.vercel.app'

export async function proxyTwikoo(event: any, subPath: string) {
  const targetUrl = `${TWIKOO_BACKEND}${subPath}`

  let body: string | null = null
  if (event.method !== 'GET' && event.method !== 'HEAD') {
    body = await readRawBody(event)
  }

  try {
    const response = await $fetch(targetUrl, {
      method: event.method as any,
      body: body || undefined,
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': getRequestIP(event) || '',
      },
      ignoreResponseError: true,
    })
    return response
  } catch (err: any) {
    console.error('Twikoo proxy error:', err.message)
    throw createError({
      statusCode: 502,
      message: '留言板服务暂时不可用',
    })
  }
}
