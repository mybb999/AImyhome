/**
 * Agent 登录状态(M3.2):token + 用户信息存 localStorage,提供登录/注册/退出。
 *
 * 说明:token 只存浏览器本地,请求时放 Authorization 头里;
 * 用户信息只存 username/user_id —— 密码绝不进前端存储。
 */
export function useAgentAuth() {
  const token = ref('')
  const user = ref<{ user_id: number; username: string } | null>(null)

  // 页面加载时恢复登录态(localStorage 里有 token 就还登录着)
  function restore() {
    const savedToken = localStorage.getItem('agent-token')
    if (savedToken) {
      token.value = savedToken
    }
    const savedUser = localStorage.getItem('agent-user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        // 存坏了就当没登录
      }
    }
  }

  // 登录/注册成功后:记住 token + 用户信息
  function persist(data: { token: string; user_id: number; username: string }) {
    token.value = data.token
    user.value = { user_id: data.user_id, username: data.username }
    localStorage.setItem('agent-token', data.token)
    localStorage.setItem('agent-user', JSON.stringify(user.value))
  }

  // 登录和注册共用同一段逻辑,只是打的接口不同
  async function submit(path: string, username: string, password: string) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      const message = data?.detail || data?.statusMessage || '请求失败,请重试'
      throw new Error(message)
    }
    persist(data)
  }

  // 登录:POST /api/auth/login(博客转发到 Agent 服务)
  function login(username: string, password: string) {
    return submit('/api/auth/login', username, password)
  }

  // 注册:POST /api/auth/register
  function register(username: string, password: string) {
    return submit('/api/auth/register', username, password)
  }

  // 退出:清掉本地登录态(服务端 token 无状态,过期自动失效)
  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('agent-token')
    localStorage.removeItem('agent-user')
  }

  return { token, user, restore, login, register, logout }
}
