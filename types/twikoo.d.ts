declare module 'twikoo' {
  interface TwikooOptions {
    envId: string
    el: string | HTMLElement
    lang?: string
    region?: string
    path?: string
    onCommentLoaded?: () => void
  }

  function init(options: TwikooOptions): void
  export default init
}
