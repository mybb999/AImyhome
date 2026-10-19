<template>
  <div class="card flex h-[calc(100vh-12rem)] lg:h-[calc(100vh-10rem)] relative overflow-hidden">
    <!-- ── 会话侧栏(M3.2):登录用户有会话列表;游客显示登录表单 ── -->
    <!-- 注意:aside 本身不滚 —— 滚动只发生在中间的会话列表区,
         这样顶部「新会话」和底部用户区(用户卡/退出)始终固定 -->
    <!-- -ml-5 + w-[228px]:.card 自带 20px 内边距,会把侧栏整体右推,
         视觉上「左边距 30px、右边距 10px」不居中。负外边距抵消这 20px、
         宽度补回来 —— 右边框线和聊天区纹丝不动,内容真正居中 -->
    <aside class="w-[228px] shrink-0 -ml-5 border-r border-brand-border flex flex-col">
      <!-- 登录态就绪前(首屏 JS 未加载完)不渲染内容:否则会先闪一下登录表单 -->
      <div v-if="!authReady" class="flex-1" />
      <template v-else-if="authUser">
        <!-- 新建会话按钮(顶部主操作) -->
        <div class="p-2.5 shrink-0">
          <button
            class="w-full py-2 rounded-lg text-body-sm font-medium bg-brand-accent/10 text-brand-accent
                   border border-brand-accent/30 hover:bg-brand-accent/20 transition-colors
                   flex items-center justify-center gap-1.5"
            :disabled="isStreaming"
            @click="newConversation"
          >
            <span class="text-body-md leading-none">＋</span> 新会话
          </button>
        </div>

        <!-- 会话列表(豆包式:主会话置顶 📌,分支对话排在下面)。
             点哪条切哪条,当前高亮。这是唯一滚动的区域(flex-1 + overflow-y-auto) -->
        <div class="flex-1 px-2 pb-2 space-y-0.5 overflow-y-auto sidebar-scroll">
          <button
            v-for="c in conversations"
            :key="c.id"
            class="w-full text-center px-3 py-2 rounded-lg text-body-sm transition-colors truncate flex items-center justify-center gap-1 group"
            :class="currentConversationId === c.id
              ? 'bg-brand-accent/15 text-brand-accent font-medium'
              : 'text-on-surface-variant hover:bg-surface-high/50 hover:text-on-surface'"
            @click="selectConversation(c.id)"
          >
            <!-- 主会话标记:置顶 + 不可删(后端也拦);分支可删 -->
            <span v-if="c.is_main" class="shrink-0 text-label-sm" title="主对话">📌</span>
            <!-- 主对话永远叫「主对话」,不看库里标题(用户 2026-10-14 定);分支才显示标题 -->
            <span class="truncate">{{ c.is_main ? '主对话' : (c.title || '新会话') }}</span>
            <span
              v-if="!c.is_main"
              class="opacity-0 group-hover:opacity-100 text-on-surface-variant/50 hover:text-red-400 shrink-0"
              title="删除会话"
              @click.stop="removeConversation(c.id)"
            >✕</span>
          </button>
          <p v-if="conversations.length === 0" class="px-3 py-2 text-label-sm text-on-surface-variant/50 text-center">
            还没有会话,点「新会话」开始
          </p>
        </div>

        <!-- 底部用户区:用户卡(或改密码表单)+ 操作行,沉在侧栏底部,整体居中 -->
        <div class="shrink-0">
          <!-- 分隔线:两端留白居中,不贴边 -->
          <div class="border-t border-brand-border mx-3" />
          <div class="p-3 pb-2">
            <template v-if="!showChangePwd">
              <!-- 用户卡:竖排居中(头像/用户名/剩余积分)+ 操作行 -->
              <div class="flex flex-col items-center text-center">
                <div class="w-9 h-9 rounded-full bg-brand-accent/15 text-brand-accent flex items-center justify-center
                            text-body-md font-semibold">
                  {{ authUser.username.slice(0, 1).toUpperCase() }}
                </div>
                <div class="mt-1.5 text-body-sm font-medium text-on-surface truncate max-w-full">
                  {{ authUser.username }}
                </div>
                <!-- 剩余积分:占位值,后续随所选模型切换而变化(计费体系未做) -->
                <div class="mt-0.5 text-label-sm text-on-surface-variant/60">剩余积分 {{ points }}</div>
              </div>
            </template>
            <template v-else>
              <!-- 改密码表单:旧密码证明本人 → 新密码覆盖 -->
              <p class="text-body-sm font-medium text-on-surface mb-2 text-center">修改密码</p>
              <form class="space-y-2" @submit.prevent="handleChangePassword">
                <input v-model="pwdForm.oldPassword" type="password" placeholder="旧密码"
                  class="w-full rounded-lg px-3 py-2 text-body-sm bg-brand-bg border border-brand-border text-on-surface
                         placeholder-on-surface-variant focus:outline-none focus:border-brand-accent/50" />
                <input v-model="pwdForm.newPassword" type="password" placeholder="新密码(至少 6 位)"
                  class="w-full rounded-lg px-3 py-2 text-body-sm bg-brand-bg border border-brand-border text-on-surface
                         placeholder-on-surface-variant focus:outline-none focus:border-brand-accent/50" />
                <p v-if="pwdMsg" class="text-label-sm text-center" :class="pwdOk ? 'text-green-400' : 'text-red-400'">{{ pwdMsg }}</p>
                <div class="flex gap-2">
                  <button type="submit" :disabled="pwdLoading"
                    class="flex-1 py-1.5 rounded-lg text-body-sm font-medium bg-brand-accent text-on-primary
                           hover:bg-brand-accent-strong disabled:opacity-40 transition-colors">
                    {{ pwdLoading ? '提交中…' : '提交' }}
                  </button>
                  <button type="button"
                    class="px-3 py-1.5 rounded-lg text-body-sm text-on-surface-variant hover:bg-surface-high/50 transition-colors"
                    @click="showChangePwd = false; pwdMsg = ''">
                    取消
                  </button>
                </div>
              </form>
            </template>
          </div>
          <div class="px-2.5 pb-2.5 flex items-center justify-center gap-2">
            <button
              class="flex-1 py-1.5 rounded-lg text-body-sm text-on-surface-variant
                     hover:text-on-surface hover:bg-surface-high/50 transition-colors"
              @click="showChangePwd = true"
            >
              改密码
            </button>
            <button
              class="flex-1 py-1.5 rounded-lg text-body-sm text-on-surface-variant
                     hover:text-on-surface hover:bg-surface-high/50 transition-colors"
              @click="handleLogout"
            >
              退出登录
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- 未登录:登录表单(注册入口已关闭 2026-10-19,前后端都关:
             只藏按钮挡不住 XSS 注入,后端 /api/auth/register 也返回 403) -->
        <div class="p-3 flex-1 overflow-y-auto">
          <p class="text-body-sm font-medium text-on-surface text-center">会员</p>

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
              {{ authLoading ? '请稍候…' : '登录' }}
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
            {{ confirmClear ? '确认清空?' : '清空对话' }}
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
        <!-- 文档上传(仅会员;M4):解析成功挂在当前会话的临时库,直接开问 -->
        <div v-if="authUser" class="mb-2 flex items-center gap-2">
          <label class="chip cursor-pointer hover:bg-surface-high/50 transition-colors">
            📄 上传文档
            <input type="file" accept=".pdf,.doc,.docx" class="hidden" :disabled="uploading"
              @change="handleUpload" />
          </label>
          <span v-if="uploading" class="text-label-sm text-on-surface-variant/70">解析中,稍等…</span>
          <span v-else-if="uploadMsg" class="text-label-sm" :class="uploadOk ? 'text-green-400' : 'text-red-400'">
            {{ uploadMsg }}
          </span>
        </div>
        <!-- 记忆治理:上下文过长时提示压缩(手动按钮;超硬上限服务端自动兜底)。
             字数超过 5000 就显示计数(用户能看着它涨到阈值),超阈值再亮按钮;
             压缩反馈(compressMsg)单独算显示条件,压完字数掉下来也还能看到 -->
        <div v-if="authUser && (historyChars > 5000 || compressMsg)" class="mb-2 flex items-center gap-2">
          <span v-if="historyChars > 5000" class="text-label-sm text-on-surface-variant/70">📊 上下文 {{ historyChars }} 字</span>
          <button
            v-if="historyChars > historyThreshold"
            class="chip cursor-pointer hover:bg-surface-high/50 transition-colors disabled:opacity-50"
            :disabled="compressing"
            @click="compressContext"
          >
            {{ compressing ? '压缩中…' : '⚠ 压缩上下文' }}
          </button>
          <span v-if="compressMsg" class="text-label-sm text-on-surface-variant/70">{{ compressMsg }}</span>
        </div>
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
const { user: authUser, token: authToken, login, register, logout, restore: restoreAuth, changePassword } = useAgentAuth()
// 登录态是否已从 localStorage 恢复(onMounted 里置 true):
// 首屏 JS 未就绪前侧栏不渲染,避免闪出「登录表单」(SSR 时本地没 token 的默认形态)
const authReady = ref(false)
const authMode = ref<'login' | 'register'>('login')
const authForm = ref({ username: '', password: '' })
const authError = ref('')
const authLoading = ref(false)

// ── 改密码状态(用户卡里切换显示) ──
const showChangePwd = ref(false)
const pwdForm = ref({ oldPassword: '', newPassword: '' })
const pwdMsg = ref('')
const pwdOk = ref(false)
const pwdLoading = ref(false)

// 剩余积分:占位值 —— 后续做计费体系时,按所选大模型的单价扣减并在这里变化
const points = ref(100)

// ── 会话管理(M3.2,登录用户才有) ──
const conversations = ref<{ id: number; title: string; is_main?: boolean }[]>([])
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

// ── 改密码 ──
// 提交改密码表单:成功后提示 + 清空表单,不自动退出(当前 token 仍有效)
async function handleChangePassword() {
  pwdMsg.value = ''
  if (!pwdForm.value.oldPassword || !pwdForm.value.newPassword) {
    pwdMsg.value = '请填写旧密码和新密码'
    pwdOk.value = false
    return
  }
  pwdLoading.value = true
  try {
    await changePassword(pwdForm.value.oldPassword, pwdForm.value.newPassword)
    pwdOk.value = true
    pwdMsg.value = '密码已修改'
    pwdForm.value = { oldPassword: '', newPassword: '' }
  } catch (err: any) {
    pwdOk.value = false
    pwdMsg.value = err.message || '修改失败,请重试'
  } finally {
    pwdLoading.value = false
  }
}

// 退出:登录态/会话列表/聊天区/输入框全清干净(游客消息本来就不保存)。
// 连正在生成中的流也拦不住地清 —— 流还在写也没用,写入处有存在性检查
function handleLogout() {
  logout()
  conversations.value = []
  currentConversationId.value = null
  messages.value = []
  historyChars.value = 0
  errorMessage.value = ''
  input.value = ''
  // 上传/压缩的会话反馈也清掉:否则换账号登录后还显示上一账号
  // 的「《xxx》解析完成」文件名(线上踩坑:泄露上一账号的文档名)
  uploadMsg.value = ''
  uploadOk.value = false
  compressMsg.value = ''
  showChangePwd.value = false
  pwdForm.value = { oldPassword: '', newPassword: '' }
  pwdMsg.value = ''
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
  }
}

// ── 会话管理 ──
// 拉会话列表(服务端已排好:主会话置顶,分支按活跃倒序);
// 还没选中任何会话时,自动进主会话 —— 刷新/登录进来就落在主会话上(豆包式)
async function refreshConversations() {
  const res = await fetch('/api/conversations', {
    headers: { Authorization: `Bearer ${authToken.value}` },
  })
  if (!res.ok) return
  const data = await res.json()
  conversations.value = data.items || []
  if (authUser.value && currentConversationId.value == null && conversations.value.length > 0) {
    await selectConversation(conversations.value[0].id)
  }
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
  // 新会话是「分支」:插到主会话下面(主会话永远置顶在 index 0)
  conversations.value.splice(1, 0, { id: data.id, title: '', is_main: false })
  currentConversationId.value = data.id
  messages.value = []
  historyChars.value = 0
  errorMessage.value = ''
}

// 从服务端拉会话完整历史回填消息区(切换会话/压缩后共用)
async function loadHistory(id: number) {
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
  // 服务端口径的历史总字数 + 亮按钮阈值(压缩按钮按这个判断)
  historyChars.value = data.chars ?? messages.value.reduce((n, m) => n + (m.content?.length || 0), 0)
  if (data.threshold) historyThreshold.value = data.threshold
  await nextTick()
  scrollToBottom()
}

// 切换会话:清空消息区 → 从服务端拉该会话的完整历史回填
async function selectConversation(id: number) {
  if (isStreaming.value || currentConversationId.value === id) return
  currentConversationId.value = id
  messages.value = []
  historyChars.value = 0
  errorMessage.value = ''
  await loadHistory(id)
}

// ── 记忆治理(压缩上下文)──
// 当前会话历史总字数 + 亮按钮阈值。口径 = 服务端真实字数(含工具轮内容):
// 加载历史/每轮结束时服务端返回,前端不自己数(按显示文字数会永远数不够,
// 按钮基本不亮)。聊天中途本地先累加,等服务端每轮末尾的 chars 事件校正。
const historyChars = ref(0)
const historyThreshold = ref(20000)
const compressing = ref(false)
const compressMsg = ref('')

// 手动压缩:服务端把历史压成 200 字摘要 + 保留最近几轮,然后重载历史
async function compressContext() {
  if (!currentConversationId.value || compressing.value) return
  compressing.value = true
  compressMsg.value = ''
  try {
    const res = await fetch(`/api/conversations/${currentConversationId.value}/summarize`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken.value}` },
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      throw new Error(data?.detail || '压缩失败,请重试')
    }
    if (data.compressed) {
      compressMsg.value = '已压缩:历史压成摘要,保留最近几轮'
      await loadHistory(currentConversationId.value)
    } else {
      compressMsg.value = data.reason || '上下文还不够长'
    }
  } catch (err: any) {
    compressMsg.value = err.message || '压缩失败,请重试'
  } finally {
    compressing.value = false
  }
}

// 删除会话(只能删分支,主会话无删除入口且后端也拦):
// 删掉后从列表移除;删的是当前分支则自动回到主会话 —— 永远有个「家」可回
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
    historyChars.value = 0
    const main = conversations.value.find(c => c.is_main)
    if (main) {
      selectConversation(main.id)
    }
  }
}

// ── 文档上传(M4,仅会员)──
const uploading = ref(false)
const uploadOk = ref(false)
const uploadMsg = ref('')

// 解析服务地址:HTTPS 域名就绪(2026-10-15)后浏览器直传 —— 绕开 Vercel
// 4.5MB 请求体上限,文件可到 25MB;跨域已由解析服务的 CORS 放行
const PARSE_URL = 'https://agent.ai-myhome.space/api/parse'

// 上传文档:解析服务(8001)解析成 Markdown,切片挂当前会话的临时库;
// 解析完直接在对话里问,问题会命中 Agent 的 search_document 工具
async function handleUpload(e: Event) {
  const el = e.target as HTMLInputElement
  const file = el.files?.[0]
  if (!file) return
  el.value = ''               // 同一文件可重复选
  if (!currentConversationId.value) {
    uploadMsg.value = '先选一个会话再上传'
    uploadOk.value = false
    return
  }
  const form = new FormData()
  form.append('file', file)
  form.append('conversation_id', String(currentConversationId.value))
  uploading.value = true
  uploadOk.value = false
  uploadMsg.value = ''
  try {
    const res = await fetch(PARSE_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken.value}` },
      body: form,
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      throw new Error(data?.detail || '解析失败,请重试')
    }
    uploadOk.value = true
    uploadMsg.value = `《${file.name}》解析完成,直接问它内容吧`
  } catch (err: any) {
    uploadOk.value = false
    uploadMsg.value = err.message || '解析失败,请重试'
  } finally {
    uploading.value = false
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
  // 本地先累加字数(按钮实时感);服务端每轮末尾的 chars 事件会校正成真实值
  historyChars.value += content.length
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
            // (存在性检查:流没结束就退出登录时,消息已被清空,别再往空数组写)
            if (messages.value[assistantIndex]) {
              messages.value[assistantIndex].sources = parsed.items || [] as SourceItem[]
            }
          } else if (currentEvent === 'chars') {
            // 每轮结束:服务端真实历史字数(含工具轮内容),压缩按钮按它亮/灭
            historyChars.value = parsed.chars || 0
          } else {
            const content = parsed.choices?.[0]?.delta?.content
            if (content && messages.value[assistantIndex]) {
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
// 游客:纯前端清数组;登录用户:先调服务端删 checkpointer 记忆再清本地
// (线上踩坑:只清前端,刷新后历史从服务端复原,像「清不掉」)。
// 破坏性操作加确认:第一次点变「确认清空?」,3 秒内再点才执行。
const confirmClear = ref(false)
let confirmClearTimer: ReturnType<typeof setTimeout> | null = null

async function clearChat() {
  if (!confirmClear.value) {
    confirmClear.value = true
    confirmClearTimer = setTimeout(() => { confirmClear.value = false }, 3000)
    return
  }
  confirmClear.value = false
  if (confirmClearTimer) {
    clearTimeout(confirmClearTimer)
    confirmClearTimer = null
  }
  messages.value = []
  historyChars.value = 0
  errorMessage.value = ''
  input.value = ''
  isStreaming.value = false
  isThinking.value = false
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
  }
  // 登录用户:删服务端记忆(会话保留);失败也照清本地,下次再试
  if (authUser.value && currentConversationId.value != null) {
    try {
      await fetch(`/api/conversations/${currentConversationId.value}/messages`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken.value}` },
      })
    } catch {
      // 网络失败不阻塞本地清空
    }
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
  authReady.value = true
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
  if (confirmClearTimer) {
    clearTimeout(confirmClearTimer)
  }
})
</script>

<style scoped>
/* 侧栏滚动条定制:默认 Windows 滚动条又宽又贴边,压细成 4px 半透明,
   贴着内容滚动不抢视觉(「有一条线贴到右边」就是这个滚动条) */
.sidebar-scroll {
  scrollbar-width: thin;                    /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
</style>
