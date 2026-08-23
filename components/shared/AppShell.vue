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
