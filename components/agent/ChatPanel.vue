<template>
  <div class="card flex h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)] relative overflow-hidden">
    <!-- ── 会话侧栏(M3.2):登录用户有会话列表;游客显示登录表单 ── -->
    <aside class="w-52 shrink-0 border-r border-brand-border flex flex-col overflow-y-auto">
      <template v-if="authUser">
        <!-- 已登录:用户行 -->
        <div class="p-3 border-b border-brand-border flex items-center justify-between gap-2 shrink-0">
          <div class="min-w-0">
            <div class="text-body-sm font-medium text-on-surface truncate">{{ authUser.username }}</div>
            <div class="text-label-sm text-on-surface-variant/60">已登录</div>
          </div>
          <button class="btn-ghost text-label-sm shrink-0" title="退出登录" @click="handleLogout">退出</button>
        </div>

        <!-- 新建会话按钮 -->
        <div class="p-2 shrink-0">
          <button
            class="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-body-sm font-medium
                   border border-brand-accent/40 text-brand-accent hover:bg-brand-accent/10 transition-colors"
            :disabled="isStreaming"
            @click="newConversation"
          >
            <span>＋</span> 新会话
          </button>
        </div>

        <!-- 会话列表:点哪条切哪条,当前高亮 -->
        <div class="flex-1 px-2 pb-2 space-y-0.5">
          <button
            v-for="c in conversations"
            :key="c.id"
            class="w-full text-left px-3 py-2 rounded-lg text-body-sm transition-colors truncate flex items-center justify-between gap-1 group"
            :class="currentConversationId === c.id
              ? 'bg-brand-accent/15 text-brand-accent font-medium'
              : 'text-on-surface-variant hover:bg-surface-high/50 hover:text-on-surface'"
            @click="selectConversation(c.id)"
          >
            <span class="truncate">{{ c.title || '新会话' }}</span>
            <span
              class="opacity-0 group-hover:opacity-100 text-on-surface-variant/50 hover:text-red-400 shrink-0"
              title="删除会话"
              @click.stop="removeConversation(c.id)"
            >✕</span>
          </button>
          <p v-if="conversations.length === 0" class="px-3 py-2 text-label-sm text-on-surface-variant/50">
            还没有会话,点「新会话」开始
          </p>
        </div>
      </template>

      <template v-else>
        <!-- 未登录:登录/注册表单 -->
        <div class="p-3">
          <p class="text-body-sm font-medium text-on-surface">登录后对话不丢失</p>
          <p class="mt-0.5 text-label-sm text-on-surface-variant/60">会话历史跟着账号走,换设备也能接着聊</p>

          <div class="mt-3 flex rounded-lg overflow-hidden border border-brand-border text-label-sm">
            <button
              class="flex-1 py-1.5 transition-colors"
              :class="authMode === 'login' ? 'bg-brand-accent/15 text-brand-accent font-medium' : 'text-on-surface-variant'"
              @click="authMode = 'login'"
            >登录</button>
            <button
              class="flex-1 py-1.5 transition-colors"
              :class="authMode === 'register' ? 'bg-brand-accent/15 text-brand-accent font-medium' : 'text-on-surface-variant'"
              @click="authMode = 'register'"
            >注册</button>
          </div>

          <form class="mt-3 space-y-2" @submit.prevent="handleAuthSubmit">
            <input v-model="authForm.username" type="text" placeholder="用户名"
              class="w-full rounded-lg px-3 py-2 text-body-sm bg-brand-bg border border-brand-border text-on-surface
                     placeholder-on-surface-variant focus:outline-none focus:border-brand-accent/50" />
            <input v-model="authForm.password" type="password" placeholder="密码"
              class="w-full rounded-lg px-3 py-2 text-body-sm bg-brand-bg border border-brand-border text-on-surface
                     placeholder-on-surface-variant focus:outline-none focus:border-brand-accent/50" />
            <p v-if="authError" class="text-label-sm text-red-400">{{ authError }}</p>
            <button type="submit" :disabled="authLoading"
              class="w-full py-2 rounded-lg text-body-sm font-semibold bg-brand-accent text-on-primary
                     hover:bg-brand-accent-strong disabled:opacity-40 transition-all">
              {{ authLoading ? '请稍候…' : (authMode === 'login' ? '登录' : '注册并登录') }}
            </button>
          </form>
        </div>
      </template>
    </aside>

    <!-- ── 右侧对话区 ── -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- ── Header ── -->
      <div class="flex items-center justify-between pb-4 border-b border-brand-border shrink-0 px-4 pt-4">
        <div>
          <h1 class="text-headline-lg text-on-surface flex items-center gap-3">
            🤖 聊天工具
          </h1>
          <p class="mt-1 text-body-md text-on-surface-variant">
            AI 驱动 · 智能助手
          </p>
        </div>
        <div class="flex items-center gap-2">
          <!-- Model selector -->
          <div v-if="models.length > 1" class="relative">
            <button
              class="chip cursor-pointer hover:bg-surface-high/50 transition-colors"
              :disabled="isStreaming"
              :title="isStreaming ? '回复生成中，暂不可切换' : '切换模型'"
              @click="showModelMenu = !showModelMenu"
            >
              <span class="status-dot" />
              <span>{{ currentModelName }}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div v-if="showModelMenu" class="fixed inset-0 z-10" @click="showModelMenu = false" />
            <div v-if="showModelMenu" class="absolute right-0 top-full mt-2 w-64 card p-2 z-20 space-y-1">
              <button
                v-for="m in models"
                :key="m.id"
                class="w-full text-left px-3 py-2 rounded-lg text-body-md transition-colors"
                :class="selectedModel === m.id
                  ? 'text-brand-accent bg-brand-accent/10'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
                @click="selectModel(m.id)"
              >
                <div class="font-medium">{{ m.name }}</div>
                <div class="text-label-sm text-on-surface-variant/60">{{ m.description }}</div>
              </button>
            </div>
          </div>

          <button v-if="messages.length > 0" class="btn-ghost text-body-sm" :disabled="isStreaming" @click="clearChat">
            清空对话
          </button>
        </div>
      </div>

      <!-- ── Message list ── -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto py-4 space-y-4 scroll-smooth px-4">
        <!-- Empty state: welcome -->
        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center px-4">
          <div class="text-6xl mb-4">👋</div>
          <p class="text-body-lg text-on-surface font-medium">
            你好！我是 熊仔 的 AI 助手
          </p>
          <p class="mt-2 text-body-md text-on-surface-variant max-w-md">
            由智谱 GLM-4.7-Flash / 豆包 Seed-2.0-Lite 双模型驱动。我可以聊 Node 全栈、前端开发、Vue、React、TypeScript、可视化等技术话题，有什么想了解的？
          </p>
        </div>

        <!-- Messages -->
        <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg" />

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
        <div v-if="errorMessage"
          class="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-body-md">
          <span>⚠️</span>
          <span>{{ errorMessage }}</span>
          <span v-if="models.length > 1" class="text-label-sm text-on-surface-variant/60">可尝试切换模型重试</span>
          <button class="ml-auto text-on-surface-variant hover:text-on-surface transition-colors"
            @click="errorMessage = ''">
            ✕
          </button>
        </div>
      </div>

      <!-- ── Scroll to bottom button ── -->
      <button v-if="showScrollButton" class="absolute bottom-24 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full
               bg-surface-high border border-brand-border
               flex items-center justify-center text-on-surface-variant
               hover:text-on-surface hover:bg-surface-highest transition-all
               animate-fade-in z-10" style="box-shadow: 0 2px 8px rgba(0,0,0,0.3)" @click="scrollToBottom()">
        ↓
      </button>

      <!-- ── Input area ── -->
      <div class="pt-3 border-t border-brand-border shrink-0 px-4 pb-4">
        <div class="flex gap-2">
          <textarea ref="inputEl" v-model="input" class="flex-1 resize-none rounded-lg px-4 py-2.5 text-body-md
                   bg-brand-bg border border-brand-border
                   text-on-surface placeholder-on-surface-variant
                   focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20
                   transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed" rows="1"
            placeholder="输入你的问题...（Enter 发送，Shift+Enter 换行）" :disabled="isStreaming" @keydown="handleKeydown"
            @input="autoResize" />
          <button class="shrink-0 px-5 py-2.5 rounded-lg font-semibold
                   bg-brand-accent text-on-primary
                   hover:bg-brand-accent-strong
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200
                   flex items-center gap-2" :disabled="isStreaming || !input.trim()" @click="send">
            <template v-if="isStreaming">
              <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style="animation-delay: 0.15s" />
            </template>
            <span v-else>发送</span>
          </button>
        </div>
        <p class="mt-1.5 text-label-sm text-on-surface-variant/60">
          Enter 发送 · Shift+Enter 换行 · {{ authUser ? '对话已保存到账号' : '登录后对话不丢失' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage, LLMModelInfo, SourceItem } from '~/types/chat'
import { generateMessageId } from '~/types/chat'

// ── 登录状态(M3.2) ──
// 注意要解构成顶层 ref:模板里「普通对象里的 ref」不会自动解包(auth.user 永远是
// truthy 的 Ref 对象,v-if 恒真 —— 实测踩过);解构后 user/token 在模板里直接用
const { user: authUser, token: authToken, login, register, logout, restore: restoreAuth } = useAgentAuth()
const authMode = ref<'login' | 'register'>('login')
const authForm = ref({ username: '', password: '' })
const authError = ref('')
const authLoading = ref(false)

// ── 会话管理(M3.2,登录用户才有) ──
const conversations = ref<{ id: number; title: string }[]>([])
const currentConversationId = ref<number | null>(null)

// ── State ──
const messages = ref<ChatMessage[]>([])
const input = ref('')
const isStreaming = ref(false)
const isThinking = ref(false)
const errorMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)
const showScrollButton = ref(false)
const models = ref<LLMModelInfo[]>([])
const selectedModel = ref('')
const showModelMenu = ref(false)

// 当前选中模型的中文名,显示在顶栏切换按钮上
const currentModelName = computed(() =>
  models.value.find(m => m.id === selectedModel.value)?.name || 'AI 助手'
)

// ── 登录/注册 ──
// 表单提交:按当前 tab 走登录或注册;成功后拉会话列表并选中最近一个
async function handleAuthSubmit() {
  authError.value = ''
  if (!authForm.value.username.trim() || !authForm.value.password) {
    authError.value = '请填写用户名和密码'
    return
  }
  authLoading.value = true
  try {
    if (authMode.value === 'login') {
      await login(authForm.value.username.trim(), authForm.value.password)
    } else {
      await register(authForm.value.username.trim(), authForm.value.password)
    }
    authError.value = ''
    await refreshConversations()
  } catch (err: any) {
    authError.value = err.message || '操作失败,请重试'
  } finally {
    authLoading.value = false
  }
}

// 退出:清登录态 + 会话列表 + 当前对话(游客消息本来就不保存)
function handleLogout() {
  logout()
  conversations.value = []
  currentConversationId.value = null
  messages.value = []
  errorMessage.value = ''
}

// ── 会话管理 ──
// 拉会话列表;有会话则选中最近活跃的一个
async function refreshConversations() {
  const res = await fetch('/api/conversations', {
    headers: { Authorization: `Bearer ${authToken.value}` },
  })
  if (!res.ok) return
  const data = await res.json()
  conversations.value = data.items || []
}

// 新建会话:建完切过去(消息区清空)
async function newConversation() {
  if (isStreaming.value) return
  const res = await fetch('/api/conversations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken.value}` },
  })
  if (!res.ok) {
    errorMessage.value = '新建会话失败,请重试'
    return
  }
  const data = await res.json()
  conversations.value.unshift({ id: data.id, title: '' })
  currentConversationId.value = data.id
  messages.value = []
  errorMessage.value = ''
}

// 切换会话:清空消息区 → 从服务端拉该会话的完整历史回填
async function selectConversation(id: number) {
  if (isStreaming.value || currentConversationId.value === id) return
  currentConversationId.value = id
  messages.value = []
  errorMessage.value = ''
  const res = await fetch(`/api/conversations/${id}/messages`, {
    headers: { Authorization: `Bearer ${authToken.value}` },
  })
  if (!res.ok) return
  const data = await res.json()
  messages.value = (data.items || []).map((m: { role: 'user' | 'assistant'; content: string }) => ({
    id: generateMessageId(),
    role: m.role,
    content: m.content,
    timestamp: Date.now(),
  }))
  await nextTick()
  scrollToBottom()
}

// 删除会话:删掉后从列表移除;删的是当前会话则回空状态
async function removeConversation(id: number) {
  const res = await fetch(`/api/conversations/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken.value}` },
  })
  if (!res.ok) return
  conversations.value = conversations.value.filter(c => c.id !== id)
  if (currentConversationId.value === id) {
    currentConversationId.value = null
    messages.value = []
  }
}

// ── Send message ──
// 发送一条消息的完整流程:拼请求(登录用户只发最新一句 + 会话 id)→ fetch → 逐行解析 SSE 流
async function send() {
  const content = input.value.trim()
  if (!content || isStreaming.value) return

  errorMessage.value = ''

  const userMsg: ChatMessage = {
    id: generateMessageId(),
    role: 'user',
    content,
    timestamp: Date.now(),
  }
  messages.value.push(userMsg)
  input.value = ''

  // 空 assistant 占位消息:流式内容往里填
  messages.value.push({
    id: generateMessageId(),
    role: 'assistant',
    content: '',
    timestamp: Date.now(),
  })
  const assistantIndex = messages.value.length - 1

  isThinking.value = true
  isStreaming.value = true

  await nextTick()
  scrollToBottom()

  // M3.2:登录用户 → 只发最新一句 + conversation_id(历史由服务端 checkpointer 补);
  // 游客 → 老路,带完整历史(排除那条空的占位消息)
  const loggedIn = !!authUser.value && currentConversationId.value != null
  const requestMessages = messages.value
    .filter(m => m.content !== '')
    .map(m => ({ role: m.role, content: m.content }))
  const body = loggedIn
    ? {
        messages: [{ role: 'user', content }],
        model: selectedModel.value || undefined,
        session_id: String(currentConversationId.value),
      }
    : { messages: requestMessages, model: selectedModel.value || undefined }

  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(loggedIn ? { Authorization: `Bearer ${authToken.value}` } : {}),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({ statusMessage: 'AI 服务暂时不可用' }))
      throw new Error(errData.statusMessage || `请求失败 (${response.status})`)
    }

    isThinking.value = false

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let currentEvent = ''   // 记录当前 SSE 事件类型:决定后面 data: 行怎么解读

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith(':')) continue

        // 记录 event: 行,决定后面 data: 行怎么解读
        if (trimmed.startsWith('event:')) {
          currentEvent = trimmed.slice(6).trim()
          continue
        }

        let data: string
        if (trimmed.startsWith('data:')) {
          data = trimmed.slice(5)
          if (data.startsWith(' ')) data = data.slice(1)
        } else {
          continue
        }

        if (data === '[DONE]') {
          break
        }

        try {
          const parsed = JSON.parse(data)
          if (currentEvent === 'sources') {
            // 来源事件 → 挂到当前 assistant 消息,不追加正文
            messages.value[assistantIndex].sources = parsed.items || [] as SourceItem[]
          } else {
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              messages.value[assistantIndex].content += content
              scrollToBottom()
            }
          }
        } catch {
          // 解析不了的行(如心跳注释)跳过
        }
        currentEvent = ''   // 事件块结束,重置
      }
    }

    // 登录用户:发完刷新列表(首句会自动变成会话标题)
    if (loggedIn) {
      refreshConversations()
    }
  } catch (err: any) {
    // 出错删掉空占位消息,显示错误横幅
    if (messages.value[assistantIndex]?.content === '') {
      messages.value.splice(assistantIndex, 1)
    }
    errorMessage.value = err.message || '生成失败，请重试'
  } finally {
    isStreaming.value = false
    isThinking.value = false
    if (inputEl.value) {
      inputEl.value.style.height = 'auto'
    }
  }
}

// ── Keyboard handling ──
// Enter 发送,Shift+Enter 换行
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}

// ── Auto-resize textarea ──
// 输入框随内容自动长高,最高 160px
function autoResize() {
  const el = inputEl.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 160) + 'px'
}

// ── Scroll ──
// 滚动到最新一条消息(流式回答每追加一段就调一次)
function scrollToBottom() {
  nextTick(() => {
    const el = messagesContainer.value
    if (!el) return
    el.scrollTop = el.scrollHeight
  })
}

// 用户往上翻超过 100px 时,显示「回到底部」按钮
function checkScrollPosition() {
  const el = messagesContainer.value
  if (!el) return
  const threshold = 100
  showScrollButton.value = (el.scrollHeight - el.scrollTop - el.clientHeight) > threshold
}

// ── Clear chat ──
// 清空本页对话(游客纯前端清数组;登录用户清的是当前会话的消息区,历史仍在服务端)
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

// ── Model selection ──
// 切换对话模型:更新选中态 + 存 localStorage,下次打开还在
function selectModel(id: string) {
  selectedModel.value = id
  showModelMenu.value = false
  localStorage.setItem('agent-model', id)
}

// ── Lifecycle ──
// 挂载时:恢复登录态 + 绑滚动监听 + 拉模型列表
onMounted(async () => {
  restoreAuth()
  if (authUser.value) {
    await refreshConversations()
  }

  const el = messagesContainer.value
  if (el) {
    el.addEventListener('scroll', checkScrollPosition, { passive: true })
  }

  // Load available models (selector hidden when list has <2 entries)
  try {
    const res = await fetch('/api/agent/models')
    if (res.ok) {
      const data = await res.json()
      models.value = data.models || []
      const saved = localStorage.getItem('agent-model')
      selectedModel.value = models.value.some(m => m.id === saved)
        ? saved!
        : (models.value[0]?.id || '')
    }
  } catch {
    // keep selector hidden — chat still works with server default
  }
})

// 卸载时解绑滚动监听,防止内存泄漏
onUnmounted(() => {
  const el = messagesContainer.value
  if (el) {
    el.removeEventListener('scroll', checkScrollPosition)
  }
})
</script>
