/**
 * 博客返回位置记忆。
 *
 * 点击文章卡片时记录来源页面、滚动位置和已渲染的卡片数量；
 * 文章页的「返回博客列表」据此回到原处，列表页负责恢复数量与滚动位置。
 * 用 sessionStorage 保存，刷新文章页后返回仍然有效。
 */
export interface BlogOrigin {
  /** 来源页面路径，如 `/blog` 或 `/blog/collection/vue` */
  path: string
  /** 点击卡片时的滚动位置 */
  scrollY: number
  /** 当时已渲染的卡片数量（用户可能点过「加载更多」） */
  visibleCount: number
  /** 记录时间，用于忽略过期数据 */
  savedAt: number
}

const STORAGE_KEY = 'lucas:blog-origin'

/** 超过 10 分钟的记录不再用于恢复，避免很久以后误跳 */
const MAX_AGE = 10 * 60 * 1000

export function useBlogOrigin() {
  function save(origin: Omit<BlogOrigin, 'savedAt'>) {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...origin, savedAt: Date.now() }))
    } catch {
      // 隐私模式 / 配额已满：记录失败不影响正常跳转
    }
  }

  /** 只读查看，不清除 */
  function peek(): BlogOrigin | null {
    if (typeof window === 'undefined') return null
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as BlogOrigin
      if (!parsed?.path || Date.now() - (parsed.savedAt || 0) > MAX_AGE) {
        sessionStorage.removeItem(STORAGE_KEY)
        return null
      }
      return parsed
    } catch {
      return null
    }
  }

  /** 取出并清除：仅当记录与当前页面路径匹配时返回 */
  function take(path: string): BlogOrigin | null {
    const origin = peek()
    if (!origin || origin.path !== path) return null
    clear()
    return origin
  }

  function clear() {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return { save, peek, take, clear }
}
