<template>
  <AppShell>
    <template #sidebar>
      <AvatarCard />
    </template>

    <ChatPanel />
  </AppShell>
</template>

<script setup lang="ts">
useHead({
  title: 'AI Agent — Lucas Space',
  meta: [
    { name: 'description', content: 'AI Agent 智能助手 — Lucas Space' },
  ],
})
</script>
