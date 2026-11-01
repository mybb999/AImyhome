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

      <!-- 流式期间:纯文本直出。每来一个 token 都重新 md.render + 代码高亮太贵,
           长回答会明显卡;流结束再一次性渲染 Markdown -->
      <div
        v-else-if="message.streaming"
        class="whitespace-pre-wrap break-words text-on-surface-variant"
      >{{ message.content || '▋' }}</div>

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
           默认折叠成一行,点开才看明细 —— 表格类文档切片很碎,
           6 条命中全列出来像重复刷屏;同文件的章节也合并成一行。
           注意不显示 score:混合检索后它是 RRF 排序分,不是置信度,
           显示「相关度 2%」会误导访客,只展示文件名 + 章节 -->
      <div v-if="!isUser && message.sources?.length"
        class="mt-2 pt-2 border-t border-brand-border">
        <button
          class="text-label-sm text-on-surface-variant/60 hover:text-on-surface-variant/90 transition-colors cursor-pointer"
          @click="showSources = !showSources"
        >
          <span class="inline-block transition-transform" :class="showSources ? 'rotate-90' : ''">▸</span>
          📎 参考资料 ({{ sourceGroups.length }})
        </button>
        <div v-if="showSources" class="mt-1 space-y-1">
          <div
            v-for="g in sourceGroups"
            :key="g.file"
            class="text-label-sm text-on-surface-variant/80 bg-surface-low px-2 py-1 rounded"
          >
            <span class="text-brand-accent">{{ g.file }}</span><template v-if="g.sections.length"> · {{ g.sections.join('、') }}</template><template v-if="g.more"> 等{{ g.more }}处</template>
          </div>
        </div>
      </div>

      <!-- 重新生成 + 版本切换(仅角色卡模型的最后一条回答):
           右下角 🔄 重新生成;有版本时 ◀ x/N ▶ 左右切换浏览(1/1 也显示,
           让用户看到「版本已拉取,只是还没重生过」) -->
      <div
        v-if="!isUser && !message.streaming && (canRegenerate || versionCount > 0)"
        class="mt-2 flex items-center justify-end gap-2 select-none"
      >
        <div
          v-if="versionCount > 0"
          class="flex items-center gap-1 rounded-lg border border-brand-border bg-surface-low px-1 py-1"
        >
          <button
            class="w-8 h-8 flex items-center justify-center rounded-md text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-high transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
            :disabled="currentIndex <= 0"
            title="上一个版本"
            @click="$emit('version-change', currentIndex - 1)"
          >◀</button>
          <span class="px-1.5 text-body-sm text-on-surface-variant tabular-nums">{{ currentIndex + 1 }}/{{ versionCount }}</span>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-md text-body-md text-on-surface-variant hover:text-on-surface hover:bg-surface-high transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
            :disabled="currentIndex >= versionCount - 1"
            title="下一个版本"
            @click="$emit('version-change', currentIndex + 1)"
          >▶</button>
        </div>
        <button
          v-if="canRegenerate"
          class="px-3.5 py-1.5 rounded-lg border border-brand-border bg-surface-low text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-high hover:border-brand-accent/40 transition-colors cursor-pointer"
          title="重新生成"
          @click="$emit('regenerate')"
        >🔄 重新生成</button>
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
  /** 只有最后一条回答能重新生成,由父组件传入 */
  canRegenerate?: boolean
}>()

const emit = defineEmits<{
  regenerate: []
  'version-change': [index: number]
}>()

// 是不是用户发的:决定气泡靠左还是靠右、渲染纯文本还是 Markdown
const isUser = computed(() => props.message.role === 'user')

// 版本浏览:有多个版本才显示 ◀ x/N ▶;当前浏览的下标(纯展示,不改记忆)
const versionCount = computed(() => props.message.versions?.length || 0)
const currentIndex = computed(() => {
  const i = props.message.versionIndex ?? versionCount.value - 1
  return Math.min(Math.max(i, 0), Math.max(versionCount.value - 1, 0))
})

// 正文显示:正在浏览某个历史版本时显示该版本,否则显示 message.content
const displayContent = computed(() => {
  if (isUser.value) return props.message.content
  const v = props.message.versions?.[currentIndex.value]
  return v ? v.content : props.message.content
})

// 参考资料默认折叠,点开才看明细(每个消息气泡自己记自己的展开态)
const showSources = ref(false)

// 参考资料分组:按文件名合并,同文件去重章节;每文件最多显示前 3 个章节,
// 超出的记进 more(显示「等 N 处」)。碎切片文档(登记表)不会再刷屏
const sourceGroups = computed(() => {
  const groups = new Map<string, { sections: string[]; total: number }>()
  for (const s of props.message.sources || []) {
    let g = groups.get(s.source)
    if (!g) {
      g = { sections: [], total: 0 }
      groups.set(s.source, g)
    }
    const sec = (s.section || '').trim()
    if (sec && !g.sections.includes(sec)) {
      g.total++
      if (g.sections.length < 3) g.sections.push(sec)
    }
  }
  return [...groups.entries()].map(([file, g]) => ({
    file,
    sections: g.sections,
    more: g.total > g.sections.length ? g.total - g.sections.length : 0,
  }))
})

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
  return md.render(displayContent.value || '▋')
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
