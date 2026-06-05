<template>
  <div class="flex flex-col items-center gap-5 text-center">
    <!-- Avatar — 替换 src 为真实头像路径 -->
    <div class="relative">
      <div
        class="w-28 h-28 rounded-full overflow-hidden border-2 border-brand-accent/40"
        style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
      >
        <img
          v-if="avatarSrc"
          :src="avatarSrc"
          alt="刘俊雄"
          class="w-full h-full object-cover object-center"
        />
        <span
          v-else
          class="w-full h-full flex items-center justify-center text-4xl font-bold text-brand-accent select-none leading-none"
          >{{ initials }}</span
        >
      </div>
      <!-- Green status ring -->
      <div
        class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-brand-bg bg-brand-accent"
      />
    </div>

    <!-- Name & Title -->
    <div class="space-y-1">
      <h1 class="text-headline-lg text-on-surface">刘俊雄</h1>
      <p class="text-body-md text-on-surface-variant">Lucas</p>
      <p class="text-body-md text-secondary">
        高级前端开发工程师 · 7年前端经验
      </p>
      <p class="text-label-md text-on-surface-variant/60">
        深圳大学 · 计算机科学与技术 本科
      </p>
    </div>

    <!-- Status Badge -->
    <StatusBadge />

    <!-- Divider -->
    <div class="divider" />

    <!-- Social Links -->
    <SocialLinks />

    <!-- Divider -->
    <div class="divider" />

    <!-- Skill Tree -->
    <div class="w-full text-left">
      <SkillTree />
    </div>

    <!-- Divider -->
    <div class="divider" />

    <!-- Resume Download (disabled) -->
    <!-- <ResumeButton /> -->

    <!-- Footer note -->
    <p class="text-label-md text-on-surface-variant/60">
      Made with Nuxt 3 · Hosted on Vercel
    </p>
  </div>
</template>

<script setup lang="ts">
// 将真实头像图片放入 public/ 目录后，修改此路径即可
const avatarSrc = ref("/avatar.png"); // 例: 'c.jpg'
const initials = "刘";
</script>
