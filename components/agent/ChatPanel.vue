<template>
  <div class="card flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)] relative">
    <!-- ── Header ── -->
    <div class="flex items-center justify-between pb-4 border-b border-brand-border shrink-0">
      <div>
        <h1 class="text-headline-lg text-on-surface flex items-center gap-3">
          🤖 AI Agent
        </h1>
        <p class="mt-1 text-body-md text-on-surface-variant">
          AI 驱动 · 智能助手
        </p>
      </div>
      <button
        v-if="messages.length > 0"
        class="btn-ghost text-body-sm"
        :disabled="isStreaming"
        @click="clearChat"
      >
        清空对话
      </button>
    </div>

    <!-- ── Message list ── -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto py-4 space-y-4 scroll-smooth"
    >
      <!-- Empty state: welcome -->
      <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
        <div class="text-6xl mb-4">👋</div>
        <p class="text-body-lg text-on-surface font-medium">
          你好！我是 Lucas 的 AI 助手
        </p>
        <p class="mt-2 text-body-md text-on-surface-variant max-w-md">
          由智谱 GLM-4-Flash 驱动。我可以聊前端开发、Vue 3、TypeScript、可视化等技术话题，有什么想了解的？
        </p>
      </div>

      <!-- Messages -->
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
      />

      <!-- Thinking indicator -->
      <div v-if="isThinking && !isStreaming" class="flex gap-3">
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    bg-brand-accent/15 text-brand-accent text-label-md font-semibold">AI</div>
        <div class="px-4 py-3 rounded-lg bg-surface-high rounded-bl-sm">
          <span class="flex gap-1.5">
            <span class="w-2 h-2 rounded-full bg-brand-accent/40 animate-bounce" />
            <span class="w-2 h-2 rounded-full bg-brand-accent/40 animate-bounce" style="animation-delay: 0.1s" />
            <span class="w-2 h-2 rounded-full bg-brand-accent/40 animate-bounce" style="animation-delay: 0.2s" />
          </span>
        </div>
      </div>

      <!-- Error banner -->
      <div v-if="errorMessage" class="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-body-md">
        <span>⚠️</span>
        <span>{{ errorMessage }}</span>
        <button class="ml-auto text-on-surface-variant hover:text-on-surface transition-colors" @click="errorMessage = ''">
          ✕
        </button>
      </div>
    </div>

    <!-- ── Scroll to bottom button ── -->
    <button
      v-if="showScrollButton"
      class="absolute bottom-24 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full
             bg-surface-high border border-brand-border
             flex items-center justify-center text-on-surface-variant
             hover:text-on-surface hover:bg-surface-highest transition-all
             animate-fade-in z-10"
      style="box-shadow: 0 2px 8px rgba(0,0,0,0.3)"
      @click="scrollToBottom()"
    >
      ↓
    </button>

    <!-- ── Input area ── -->
    <div class="pt-3 border-t border-brand-border shrink-0">
      <div class="flex gap-2">
        <textarea
          ref="inputEl"
          v-model="input"
          class="flex-1 resize-none rounded-lg px-4 py-2.5 text-body-md
                 bg-brand-bg border border-brand-border
                 text-on-surface placeholder-on-surface-variant
                 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20
                 transition-colors duration-150
                 disabled:opacity-50 disabled:cursor-not-allowed"
          rows="1"
          placeholder="输入你的问题...（Enter 发送，Shift+Enter 换行）"
          :disabled="isStreaming"
          @keydown="handleKeydown"
          @input="autoResize"
        />
        <button
          class="shrink-0 px-5 py-2.5 rounded-lg font-semibold
                 bg-brand-accent text-on-primary
                 hover:bg-brand-accent-strong
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-200
                 flex items-center gap-2"
          :disabled="isStreaming || !input.trim()"
          @click="send"
        >
          <template v-if="isStreaming">
            <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style="animation-delay: 0.15s" />
          </template>
          <span v-else>发送</span>
        </button>
      </div>
      <p class="mt-1.5 text-label-sm text-on-surface-variant/60">
        Enter 发送 · Shift+Enter 换行 · 刷新后对话消失
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'
import { generateMessageId } from '~/types/chat'

// ── State ──
const messages = ref<ChatMessage[]>([])
const input = ref('')
const isStreaming = ref(false)
const isThinking = ref(false)
const errorMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)
const showScrollButton = ref(false)

// ── Send message ──
async function send() {
  const content = input.value.trim()
  if (!content || isStreaming.value) return

  errorMessage.value = ''

  // Add user message
  const userMsg: ChatMessage = {
    id: generateMessageId(),
    role: 'user',
    content,
    timestamp: Date.now(),
  }
  messages.value.push(userMsg)
  input.value = ''

  // Create blank assistant message for streaming
  const assistantMsg: ChatMessage = {
    id: generateMessageId(),
    role: 'assistant',
    content: '',
    timestamp: Date.now(),
  }
  messages.value.push(assistantMsg)

  isThinking.value = true
  isStreaming.value = true

  await nextTick()
  scrollToBottom()

  // Build request messages (don't include the empty streaming placeholder)
  const requestMessages = messages.value
    .filter(m => m.content !== '')
    .map(m => ({ role: m.role, content: m.content }))

  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: requestMessages }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({ statusMessage: 'AI 服务暂时不可用' }))
      throw new Error(errData.statusMessage || `请求失败 (${response.status})`)
    }

    isThinking.value = false

    // Parse SSE stream
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data: ')) continue

        const data = trimmed.slice(6)
        if (data === '[DONE]') break

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            assistantMsg.content += content
            scrollToBottom()
          }
        } catch {
          // Skip unparseable SSE lines
        }
      }
    }
  } catch (err: any) {
    // Remove the empty assistant message on error
    const idx = messages.value.indexOf(assistantMsg)
    if (idx !== -1) messages.value.splice(idx, 1)
    errorMessage.value = err.message || '生成失败，请重试'
  } finally {
    isStreaming.value = false
    isThinking.value = false
    // Reset textarea height
    if (inputEl.value) {
      inputEl.value.style.height = 'auto'
    }
  }
}

// ── Keyboard handling ──
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

// ── Auto-resize textarea ──
function autoResize() {
  const el = inputEl.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 160) + 'px'
}

// ── Scroll ──
function scrollToBottom() {
  nextTick(() => {
    const el = messagesContainer.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  })
}

function checkScrollPosition() {
  const el = messagesContainer.value
  if (!el) return
  const threshold = 100
  showScrollButton.value = (el.scrollHeight - el.scrollTop - el.clientHeight) > threshold
}

// ── Clear chat ──
function clearChat() {
  messages.value = []
  errorMessage.value = ''
  input.value = ''
  isStreaming.value = false
  isThinking.value = false
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
  }
}

// ── Lifecycle ──
onMounted(() => {
  const el = messagesContainer.value
  if (el) {
    el.addEventListener('scroll', checkScrollPosition, { passive: true })
  }
})

onUnmounted(() => {
  const el = messagesContainer.value
  if (el) {
    el.removeEventListener('scroll', checkScrollPosition)
  }
})
</script>
