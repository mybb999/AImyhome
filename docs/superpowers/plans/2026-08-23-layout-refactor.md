# 布局职责重构（thin 布局 + AppShell）实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将路由相关业务组件（AvatarCard / BlogSidebar / BlogToc）从 `layouts/default.vue` 移出，改为各页面通过共享外壳组件 AppShell 自组装侧栏与内容，并删除 TOC 的 provide/inject 机制。

**Architecture:** `layouts/default.vue` 瘦身为「AppHeader + slot」的纯外壳；新增 `AppHeader`（顶栏）与 `AppShell`（两栏网格 + sidebar 插槽 + 页脚）两个共享组件；四个页面各自用 AppShell 组装自己的侧栏和内容。

**Tech Stack:** Nuxt 3.12.4 (Vue 3.5 + SSR)、Tailwind CSS（Midnight Slate Token）、@nuxt/content。

## Global Constraints

- 所有 Vue 组件使用 `<script setup lang="ts">` + Composition API（CLAUDE.md）
- 组件 auto-import 配置为 `prefix: false`，共享组件放 `components/shared/`，直接以 `AppHeader` / `AppShell` 引用，无需手动 import
- 样式一律使用 Tailwind 类名与 `docs/DESIGN.md` 语义 Token（`bg-brand-bg`、`text-brand-accent` 等），不写行内样式（既有行内样式除外）
- 不修改 `nuxt.config.ts` 的 `pageTransition` 配置
- 不修改任何业务组件（AvatarCard / BlogSidebar / BlogToc / BlogList / Guestbook / ChatPanel / BlogContent）内部实现
- 每个任务结束时 `npm run build` 必须通过
- 提交信息风格：`refactor: <中文描述>`
- 验证命令在 Git Bash 下运行；dev 服务器 `npm run dev` 监听 `localhost:3000`（仅 IPv6 `[::1]`）
- dev 服务器与 `npm run build` 互斥（Nuxt 锁 + 共享 `.nuxt` 目录）：每个任务先停 dev（`taskkill //F //PID $(netstat -ano | grep ":3000.*LISTEN" | head -1 | awk '{print $NF}')`）再构建，构建完成后重启 dev 做 curl/浏览器断言

---

### Task 1: 新建共享外壳组件 AppHeader 与 AppShell（纯搬移，行为不变）

**Files:**
- Create: `components/shared/AppHeader.vue`
- Create: `components/shared/AppShell.vue`

**Interfaces:**
- Consumes: 无
- Produces:
  - `<AppHeader />` — 无 props 的顶栏组件（含导航高亮逻辑）
  - `<AppShell>` — 提供 `#sidebar` 具名插槽（侧栏内容）与默认插槽（正文内容），正文后自带统一页脚

- [ ] **Step 1: 创建 AppHeader.vue**（内容 = 现 `layouts/default.vue:4-48` 的 `<header>` 整段原样搬入）

```vue
<template>
  <header
    class="fixed top-0 left-0 right-0 z-20 h-14
           bg-brand-bg/95 backdrop-blur-sm
           border-b border-brand-border
           flex items-center justify-between px-4 lg:px-8"
  >
    <NuxtLink
      to="/"
      class="text-headline-md text-on-surface hover:text-brand-accent transition-colors duration-200 whitespace-nowrap"
    >
      Lucas的个人博客
    </NuxtLink>

    <nav class="flex items-center gap-1">
      <NuxtLink
        to="/"
        class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
        :class="isHomeActive
          ? 'text-brand-accent bg-brand-accent/10'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
      >
        首页
      </NuxtLink>
      <NuxtLink
        to="/ai-agent"
        class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
        :class="isAiAgentActive
          ? 'text-brand-accent bg-brand-accent/10'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
      >
        聊天工具
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-200"
        :class="isBlogActive
          ? 'text-brand-accent bg-brand-accent/10'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high/50'"
      >
        博客
      </NuxtLink>
    </nav>

    <div class="w-20 hidden lg:block" />
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const isHomeActive = computed(() => route.path === '/')
const isAiAgentActive = computed(() => route.path.startsWith('/ai-agent'))
const isBlogActive = computed(() => route.path.startsWith('/blog'))
</script>
```

- [ ] **Step 2: 创建 AppShell.vue**（内容 = 现 `layouts/default.vue:51-78` 的两栏网格 + 页脚，aside 子内容换成 `#sidebar` 插槽）

```vue
<template>
  <div class="pt-14 lg:flex">
    <!-- Left Sidebar -->
    <aside
      class="
        lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-[320px] lg:shrink-0
        overflow-y-auto
        p-4 lg:p-6
        border-b lg:border-b-0 lg:border-r border-brand-border
        bg-brand-bg
        z-10
      "
    >
      <slot name="sidebar" />
    </aside>

    <!-- Right Main Content -->
    <main class="flex-1 min-h-[calc(100vh-3.5rem)] p-4 lg:p-6">
      <slot />

      <footer class="mt-12 lg:mt-16 pb-8 text-center">
        <p class="text-label-md text-on-surface-variant">
          © 2026 Lucas Space — Built with Nuxt 3 & Tailwind CSS
        </p>
      </footer>
    </main>
  </div>
</template>
```

- [ ] **Step 3: 验证编译通过**

Run: `npm run build`
Expected: `Build complete`（两个新组件未被引用，不影响产物；编译无报错）

- [ ] **Step 4: Commit**

```bash
git add components/shared/AppHeader.vue components/shared/AppShell.vue
git commit -m "refactor: 提取共享外壳组件 AppHeader 与 AppShell"
```

---

### Task 2: 瘦身 default.vue 并迁移首页

**Files:**
- Modify: `layouts/default.vue`（整文件重写）
- Modify: `pages/index.vue`（template 重写）

**Interfaces:**
- Consumes: Task 1 的 `<AppHeader />`、`<AppShell>`（auto-import）
- Produces: 布局不再提供 `setBlogToc`（详情页 inject 将回退到默认空函数，属于已知过渡态，Task 5 修复）；首页拥有 AvatarCard

- [ ] **Step 1: 重写 layouts/default.vue**

```vue
<template>
  <div class="min-h-screen bg-brand-bg font-geist">
    <AppHeader />
    <slot />
  </div>
</template>
```

（删除：aside 三路 v-if、`blogToc` ref、`provide('setBlogToc')`、`useRoute` 相关 import 与 computed）

- [ ] **Step 2: 重写 pages/index.vue 的 template**（script 部分不变）

```vue
<template>
  <AppShell>
    <template #sidebar>
      <AvatarCard />
    </template>

    <div class="space-y-6 lg:space-y-8">
      <BlogList :posts="posts" :loading="pending" />
      <Guestbook />
    </div>
  </AppShell>
</template>
```

- [ ] **Step 3: 验证首页 SSR 结构**

```bash
timeout 90 bash -c 'until curl -sf http://localhost:3000/ >/dev/null 2>&1; do sleep 2; done'
curl -s http://localhost:3000/ | grep -c "高级全栈开发工程师"   # 期望 1（AvatarCard 在页面里）
curl -s http://localhost:3000/ | grep -c "📝 博客中心"          # 期望 1（首页内容在）
curl -s http://localhost:3000/ | grep -o "<aside" | wc -l      # 期望 1
```

Expected: 三个断言分别为 `1` / `1` / `1`；首页 PC 视口左侧侧栏 + 右侧内容不变

- [ ] **Step 4: 验证构建**

Run: `npm run build`
Expected: `Build complete`

- [ ] **Step 5: Commit**

```bash
git add layouts/default.vue pages/index.vue
git commit -m "refactor: 布局瘦身为纯外壳，首页自组装 AvatarCard 侧栏"
```

---

### Task 3: 迁移聊天工具页

**Files:**
- Modify: `pages/ai-agent.vue`

**Interfaces:**
- Consumes: `<AppShell>`、`<AvatarCard>`、`<ChatPanel>`（auto-import）

- [ ] **Step 1: 重写 pages/ai-agent.vue 的 template**（script 不变）

```vue
<template>
  <AppShell>
    <template #sidebar>
      <AvatarCard />
    </template>

    <ChatPanel />
  </AppShell>
</template>
```

- [ ] **Step 2: 验证 SSR**

```bash
curl -s http://localhost:3000/ai-agent | grep -c "高级全栈开发工程师"   # 期望 1
curl -s http://localhost:3000/ai-agent | grep -c "AI 驱动 · 智能助手"    # 期望 1
```

- [ ] **Step 3: 验证构建并提交**

```bash
npm run build   # 期望 Build complete
git add pages/ai-agent.vue
git commit -m "refactor: 聊天工具页自组装 AvatarCard 侧栏"
```

---

### Task 4: 迁移博客列表页

**Files:**
- Modify: `pages/blog/index.vue`

**Interfaces:**
- Consumes: `<AppShell>`、`<BlogSidebar>`、`<BlogList>`（auto-import）

- [ ] **Step 1: 重写 pages/blog/index.vue 的 template**（script 不变）

```vue
<template>
  <AppShell>
    <template #sidebar>
      <BlogSidebar />
    </template>

    <div class="space-y-6 lg:space-y-8">
      <BlogList :posts="posts" :loading="pending" />
    </div>
  </AppShell>
</template>
```

- [ ] **Step 2: 验证 SSR**

```bash
curl -s http://localhost:3000/blog | grep -c "所有文章"      # 期望 1（BlogSidebar 在页面里）
curl -s http://localhost:3000/blog | grep -c "📝 博客中心"   # 期望 1
```

- [ ] **Step 3: 验证构建并提交**

```bash
npm run build   # 期望 Build complete
git add pages/blog/index.vue
git commit -m "refactor: 博客列表页自组装 BlogSidebar 侧栏"
```

---

### Task 5: 迁移博客详情页并删除 provide/inject

**Files:**
- Modify: `pages/blog/[slug].vue`

**Interfaces:**
- Consumes: `<AppShell>`、`<BlogToc :toc="toc" />`（TocItem 类型定义在 `components/blog/BlogToc.vue` 导出）
- Produces: 详情页直接持有 `toc` computed 并作为 prop 传入；`setBlogToc` provide/inject 机制整体消失

- [ ] **Step 1: 重写 pages/blog/[slug].vue**

```vue
<template>
  <AppShell>
    <template #sidebar>
      <BlogToc :toc="toc" />
    </template>

    <BlogContent :data="data" :pending="pending" :reading-time="readingTime" />
  </AppShell>
</template>

<script setup lang="ts">
import type { TocItem } from "~/components/BlogToc.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data, pending } = await useAsyncData(`blog-${slug.value}`, async () => {
  try {
    const doc = await queryContent("blog", slug.value).findOne();
    if (doc) return doc;
  } catch {}
  try {
    return await $fetch(`/api/blog?id=${slug.value}`);
  } catch {
    return null;
  }
});

const toc = computed<TocItem[]>(() => {
  if (!data.value?.body?.toc?.links) return [];
  return data.value.body.toc.links.map((link: any) => ({
    id: link.id,
    text: link.text,
    depth: link.depth,
  }));
});

const readingTime = computed(() => {
  if (!data.value) return 0;
  const text = data.value.description || "";
  const bodyText = data.value.body ? JSON.stringify(data.value.body) : "";
  return Math.max(1, Math.ceil((text.length + bodyText.length) / 200));
});

useHead({
  title: computed(() => data.value?.title || "文章 — Lucas Space"),
  meta: computed(() => [
    { name: "description", content: data.value?.description || "" },
    { property: "og:title", content: data.value?.title || "Lucas Space" },
    { property: "og:description", content: data.value?.description || "" },
    { property: "og:type", content: "article" },
  ]),
});
</script>
```

（删除：`inject("setBlogToc", ...)` 与 `watch(toc, ...)`）

- [ ] **Step 2: 验证 SSR**

```bash
curl -s http://localhost:3000/blog/jsplumb-ai-mindmap | grep -c "文章目录"   # 期望 1（BlogToc 在页面里）
curl -s http://localhost:3000/blog/jsplumb-ai-mindmap | grep -c "返回博客"   # 期望 1
```

Expected: 详情页左侧 TOC 正常渲染（有目录的页面显示目录项，短文章显示「暂无目录」）

- [ ] **Step 3: 全局确认 provide/inject 已清除**

```bash
grep -rn "setBlogToc" layouts/ pages/ components/ 2>/dev/null   # 期望无输出
```

- [ ] **Step 4: 验证构建并提交**

```bash
npm run build   # 期望 Build complete
git add pages/blog/\[slug\].vue
git commit -m "refactor: 博客详情页自组装 BlogToc 侧栏，移除 TOC provide/inject"
```

---

### Task 6: 端到端验证与回归

**Files:**
- Modify: `devlog/2026-08-23.md`（追加本次重构记录）

**Interfaces:**
- Consumes: Task 1-5 全部产出

- [ ] **Step 1: 浏览器回归验证（Playwright + 本机 Edge）**

在临时目录准备驱动（如 `%TEMP%/pw-driver`，已装 playwright-core）：

```bash
mkdir -p "$TEMP/pw-driver" && cd "$TEMP/pw-driver" && npm init -y >/dev/null 2>&1 && npm i playwright-core --no-audit --no-fund 2>&1 | tail -1
```

创建并运行 `check.js`（Edge 路径按本机实际版本调整）：

```js
const { chromium } = require('playwright-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/EdgeCore/148.0.3967.96/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const check = async (path, sidebarText, contentText) => {
    await page.goto('http://localhost:3000' + path, { waitUntil: 'commit' });
    await page.waitForSelector('aside', { timeout: 30000 });
    await sleep(1200);
    const r = await page.evaluate(([st, ct]) => {
      const aside = document.querySelector('aside');
      return {
        path: location.pathname,
        asideHasSidebar: aside && aside.textContent.includes(st),
        mainHasContent: document.querySelector('main').textContent.includes(ct),
        asideWidth: aside ? Math.round(aside.getBoundingClientRect().width) : 0,
      };
    }, [sidebarText, contentText]);
    console.log(JSON.stringify(r));
    if (!r.asideHasSidebar || !r.mainHasContent) process.exitCode = 1;
  };
  await check('/', '高级全栈开发工程师', '📝 博客中心');
  await check('/ai-agent', '高级全栈开发工程师', 'AI 驱动 · 智能助手');
  await check('/blog', '所有文章', '📝 博客中心');
  await check('/blog/jsplumb-ai-mindmap', '文章目录', 'jsplumb');
  // 移动端视口：aside 在 main 上方（单列堆叠）
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/', { waitUntil: 'commit' });
  await page.waitForSelector('aside', { timeout: 30000 });
  await sleep(800);
  const mobile = await page.evaluate(() => {
    const a = document.querySelector('aside').getBoundingClientRect();
    const m = document.querySelector('main').getBoundingClientRect();
    return { asideBottom: Math.round(a.bottom), mainTop: Math.round(m.top), stacked: a.bottom <= m.top };
  });
  console.log('mobile:', JSON.stringify(mobile));
  if (!mobile.stacked) process.exitCode = 1;
  await browser.close();
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
```

Expected: 四个路由输出 `asideHasSidebar: true`、`mainHasContent: true`、`asideWidth: 320`；mobile 输出 `stacked: true`；进程退出码 0

- [ ] **Step 2: 布局 Bug 回归（快速切换探针）**

继续在 `pw-driver` 目录创建并运行 `storm.js`（CPU 节流 4x + /api/blog 延迟 1s + 首页↔博客高速连点，验证 AvatarCard 始终在 aside 内）：

```js
const { chromium } = require('playwright-core');
const EDGE = 'C:/Program Files (x86)/Microsoft/EdgeCore/148.0.3967.96/msedge.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch({ executablePath: EDGE, headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.route('**/api/blog', async (route) => { await sleep(1000); await route.continue(); });
  await page.goto('http://localhost:3000/', { waitUntil: 'commit' });
  await page.waitForSelector('aside h1', { timeout: 60000 });
  await page.waitForFunction(() => typeof window.useNuxtApp === 'function', { timeout: 120000 });
  await sleep(800);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  let bad = 0;
  await page.evaluate(() => {
    window.__bad = 0;
    const mo = new MutationObserver(() => {
      const h1s = [...document.querySelectorAll('h1')].filter((h) => h.textContent.trim() === 'Lucas');
      if (h1s.some((h) => !h.closest('aside'))) window.__bad++;
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
  for (const t of [60, 100, 150, 200, 250]) {
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => useNuxtApp().$router.push('/'));
      await sleep(600);
      await page.evaluate(() => useNuxtApp().$router.push('/blog'));
      await sleep(t);
      await page.evaluate(() => useNuxtApp().$router.push('/'));
      await sleep(300);
    }
  }
  bad = await page.evaluate(() => window.__bad);
  console.log('avatar-outside-aside occurrences:', bad);
  await browser.close();
  process.exitCode = bad > 0 ? 1 : 0;
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
```

Expected: 输出 `avatar-outside-aside occurrences: 0`，退出码 0

- [ ] **Step 3: TOC 交互验证**

浏览器（或人工）打开 `http://localhost:3000/blog/jsplumb-ai-mindmap`：点击左侧目录项能平滑滚动到对应标题、滚动正文时目录高亮跟随、URL hash 更新

- [ ] **Step 4: 最终构建**

Run: `npm run build`
Expected: `Build complete`

- [ ] **Step 5: 更新开发日志**

在 `devlog/2026-08-23.md` 的「已完成事项」追加：

```markdown
- [x] 布局职责重构：default.vue 瘦身为纯外壳（AppHeader+slot），新增 AppHeader/AppShell 共享组件，四个页面各自组装侧栏（首页/AI=AvatarCard、博客列表=BlogSidebar、详情=BlogToc），删除 TOC provide/inject 机制
```

- [ ] **Step 6: Commit**

```bash
git add devlog/2026-08-23.md
git commit -m "docs: 更新开发日志（布局职责重构）"
```

---

## 完成标准

- `layouts/default.vue` 不含任何业务组件 import、无路由判断
- 四个页面各自在 `<AppShell>` 中组装自己的侧栏与内容
- `grep -rn "setBlogToc" layouts/ pages/ components/` 无输出
- Task 6 两个探针退出码均为 0，`npm run build` 通过
- 全部任务提交独立 commit
