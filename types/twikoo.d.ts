interface TwikooOptions {
  envId: string
  el: string | HTMLElement
  lang?: string
  region?: string
  path?: string
  onCommentLoaded?: () => void
}

interface TwikooApi {
  init(options: TwikooOptions): void | Promise<void>
}

interface Window {
  /** 由 /vendor/twikoo.all.min.js 注入 */
  twikoo?: TwikooApi
}
