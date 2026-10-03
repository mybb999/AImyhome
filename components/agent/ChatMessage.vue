<template>
  <div
    class="flex gap-3 animate-slide-up"
    :class="isUser ? 'justify-end' : 'justify-start'"
  >
    <!-- Assistant avatar -->
    <div
      v-if="!isUser"
      class="w-8 h-8 rounded-full flex items-center justify-center shrink-0
             bg-brand-accent/15 text-brand-accent text-label-md font-semibold"
      aria-hidden="true"
    >
      AI
    </div>

    <!-- Message bubble -->
    <div
      class="max-w-[75%] px-4 py-3 rounded-lg text-body-md"
      :class="isUser
        ? 'bg-brand-accent/15 text-on-surface rounded-br-sm'
        : 'bg-surface-high text-on-surface rounded-bl-sm'"
    >
      <!-- User message: plain text -->
      <p v-if="isUser" class="whitespace-pre-wrap break-words">{{ message.content }}</p>

      <!-- Assistant message: rendered Markdown -->
      <div
        v-else
        class="prose prose-invert prose-sm max-w-none
               prose-headings:text-on-surface
               prose-p:text-on-surface-variant
               prose-code:text-brand-accent prose-code:bg-surface-low prose-code:px-1 prose-code:py-0.5 prose-code:rounded
               prose-pre:bg-brand-bg prose-pre:border prose-pre:border-brand-border
               prose-a:text-secondary
               prose-strong:text-on-surface
               prose-li:text-on-surface-variant
               prose-hr:border-brand-border
               [&_pre_code]:bg-transparent [&_pre_code]:p-0
               [&_table]:border-brand-border [&_th]:border-brand-border [&_td]:border-brand-border
               [&_th]:bg-surface-low [&_td]:bg-surface-low/50
               [&_blockquote]:border-brand-accent [&_blockquote]:text-on-surface-variant"
        v-html="renderedMarkdown"
      />

      <!-- Sources(RAG 命中来源,仅 assistant 消息)
           注意不显示 score:混合检索后它是 RRF 排序分,不是置信度,
           显示「相关度 2%」会误导访客,只展示文件名 + 章节 -->
      <div v-if="!isUser && message.sources?.length"
        class="mt-2 pt-2 border-t border-brand-border space-y-1">
        <p class="text-label-sm text-on-surface-variant/60">📎 参考资料</p>
        <div
          v-for="(s, i) in message.sources"
          :key="i"
          class="text-label-sm text-on-surface-variant/80 bg-surface-low px-2 py-1 rounded"
        >
          <span class="text-brand-accent">{{ s.source }} · {{ s.section }}</span>
        </div>
      </div>

      <!-- Timestamp -->
      <p class="text-label-sm text-on-surface-variant/60 mt-1 select-none">
        {{ formattedTime }}
      </p>
    </div>

    <!-- User avatar -->
    <div
      v-if="isUser"
      class="w-8 h-8 rounded-full flex items-center justify-center shrink-0
             bg-on-surface/10 text-on-surface-variant text-label-md font-semibold"
      aria-hidden="true"
    >
      U
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import type { ChatMessage } from '~/types/chat'

const props = defineProps<{
  message: ChatMessage
}>()

// 是不是用户发的:决定气泡靠左还是靠右、渲染纯文本还是 Markdown
const isUser = computed(() => props.message.role === 'user')

// 时间戳 → 显示用时间(今天只显示时分,跨天带日期)
const formattedTime = computed(() => {
  const d = new Date(props.message.timestamp)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const time = d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  if (isToday) return time
  return `${d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })} ${time}`
})

// ── Markdown renderer ──
// Markdown 渲染器:一次建好,整个组件复用。html:false = 不渲染原始 HTML(防 XSS)
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`
      } catch {
        // fall through to escaped HTML
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`
  },
})

// 消息正文 → HTML,交给 v-html 渲染(用户消息不用,直接返回空)
const renderedMarkdown = computed(() => {
  if (isUser.value) return ''
  return md.render(props.message.content || '▋')
})

// ── Inject highlight.js dark theme (client only) ──
// 代码高亮的配色写死成一段内联样式,只在浏览器端注入一次(SSR 时没有 document)
if (typeof document !== 'undefined') {
  const themeId = 'hljs-theme-agent'
  if (!document.getElementById(themeId)) {
    const style = document.createElement('style')
    style.id = themeId
    style.textContent = `
      .hljs { color: #dae2fd; background: #0b1326; }
      .hljs-keyword { color: #ffb3af; }
      .hljs-string { color: #6ffbbe; }
      .hljs-comment { color: #86948a; font-style: italic; }
      .hljs-function { color: #7bd0ff; }
      .hljs-number { color: #ffb3af; }
      .hljs-title { color: #7bd0ff; }
      .hljs-params { color: #dae2fd; }
      .hljs-built_in { color: #ffb3af; }
      .hljs-literal { color: #ffb3af; }
      .hljs-type { color: #7bd0ff; }
      .hljs-meta { color: #4edea3; }
      .hljs-attr { color: #7bd0ff; }
      .hljs-tag { color: #ffb3af; }
      .hljs-name { color: #ffb3af; }
      .hljs-selector-class { color: #7bd0ff; }
      .hljs-selector-id { color: #7bd0ff; }
      .hljs-property { color: #dae2fd; }
      .hljs-variable { color: #dae2fd; }
      .hljs-operator { color: #4edea3; }
    `
    document.head.appendChild(style)
  }
}
</script>

<style scoped>
.prose :deep(*) {
  --tw-prose-body: #bbcabf;
}
</style>
