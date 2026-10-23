<template>
  <section class="space-y-5">
    <!-- Section header -->
    <div class="flex items-center justify-between">
      <h2 class="text-headline-lg text-on-surface">
        📝 博客中心
      </h2>
      <span class="text-body-md text-on-surface-variant">
        {{ total ?? posts.length }} 篇文章
      </span>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="space-y-4">
      <div
        v-for="n in 3"
        :key="n"
        class="card animate-pulse"
      >
        <div class="space-y-3">
          <div class="h-4 w-32 bg-surface-high rounded" />
          <div class="h-6 w-3/4 bg-surface-high rounded" />
          <div class="h-4 w-full bg-surface-high rounded" />
        </div>
      </div>
    </div>

    <!-- Blog Card Grid -->
    <TransitionGroup
      v-else
      name="blog-list"
      tag="div"
      class="space-y-4"
    >
      <BlogCard
        v-for="(post, idx) in visiblePosts"
        :key="post.slug"
        :post="post"
        :style="{ animationDelay: `${idx * 80}ms` }"
        class="animate-slide-up"
        @click="openPost(post.slug)"
      />
    </TransitionGroup>

    <!-- Empty state -->
    <div v-if="!loading && posts.length === 0" class="card text-center py-10">
      <p class="text-body-lg text-on-surface-variant">暂无文章</p>
    </div>

    <!-- More: link out on the home page, load more on list pages -->
    <div v-if="!loading && hasMore" class="pt-2 text-center">
      <NuxtLink v-if="moreLink" :to="moreLink" class="btn-primary">
        查看全部 {{ total ?? posts.length }} 篇 →
      </NuxtLink>
      <button v-else type="button" class="btn-ghost" @click="showMore">
        加载更多（还有 {{ posts.length - visibleCount }} 篇）
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogListItem } from '~/types/blog'

const props = defineProps<{
  posts: BlogListItem[]
  loading?: boolean
  /** Total post count, when `posts` is already limited by the caller. */
  total?: number
  /** How many cards to render before the "more" affordance. */
  initialCount?: number
  /** When set, show a link instead of a load-more button. */
  moreLink?: string
}>()

const PAGE_SIZE = 24

const route = useRoute()
const { save, take } = useBlogOrigin()

const visibleCount = ref(props.initialCount ?? props.posts.length)

// 点卡片进文章前，记下来源页面、滚动位置和当前已渲染的卡片数，
// 供文章页的「返回博客列表」还原。
function openPost(slug: string) {
  save({
    path: route.path,
    scrollY: window.scrollY,
    visibleCount: visibleCount.value,
  })
  navigateTo(`/blog/${slug}`)
}

// Nuxt 路由切换结束后会把页面滚回顶部，会覆盖这里刚恢复的位置；
// 卡片也要等几帧才撑开足够高度。因此在 2 秒内持续校正，
// 用户一旦自己滚动就立即放弃。
function restoreScroll(target: number) {
  const deadline = Date.now() + 2000
  let cancelled = false

  const cancel = () => { cancelled = true }
  window.addEventListener('wheel', cancel, { once: true, passive: true })
  window.addEventListener('touchstart', cancel, { once: true, passive: true })

  const tick = () => {
    if (cancelled) return
    // 全局 CSS 开了 scroll-behavior: smooth，必须显式用 instant，
    // 否则每次校正都会重新开始一段动画，永远停不到目标位置。
    window.scrollTo({ top: target, behavior: 'instant' })
    if (Math.abs(window.scrollY - target) > 2 && Date.now() < deadline) {
      setTimeout(() => requestAnimationFrame(tick), 60)
    }
  }
  tick()
}

// 数据首次就绪时决定初始渲染数量：若有匹配的来源记录，就恢复数量和滚动位置。
// 加锁避免后续数据变化把用户「加载更多」的状态重置掉。
const initialized = ref(false)

watch(
  () => props.posts,
  (posts) => {
    if (!posts.length || initialized.value) return
    initialized.value = true

    const origin = take(route.path)
    if (origin) {
      visibleCount.value = Math.max(props.initialCount ?? posts.length, origin.visibleCount)
      nextTick(() => restoreScroll(origin.scrollY))
      return
    }

    visibleCount.value = props.initialCount ?? posts.length
  },
  { immediate: true }
)

const visiblePosts = computed(() => props.posts.slice(0, visibleCount.value))
const hasMore = computed(() => {
  // With a link-out, "more" means there are posts we never fetched.
  if (props.moreLink) return (props.total ?? props.posts.length) > props.posts.length
  return visibleCount.value < props.posts.length
})

function showMore() {
  visibleCount.value += PAGE_SIZE
}
</script>

<style scoped>
.blog-list-enter-active {
  transition: all 0.4s ease-out;
}
.blog-list-leave-active {
  transition: all 0.3s ease-in;
}
.blog-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.blog-list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
