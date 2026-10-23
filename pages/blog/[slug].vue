<template>
  <AppShell>
    <template #sidebar>
      <BlogToc :toc="toc" :back-to="backTo" />
    </template>

    <BlogContent :data="data" :pending="pending" :reading-time="readingTime" :back-to="backTo" />
  </AppShell>
</template>

<script setup lang="ts">
import type { TocItem } from "~/components/blog/BlogToc.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// 返回目标 = 进入文章前的列表页（全部文章或某个文集）。
// 只在客户端读取 sessionStorage，避免 SSR 与客户端渲染不一致。
const { peek } = useBlogOrigin();
const backTo = ref("/blog");
onMounted(() => {
  const origin = peek();
  if (origin?.path) backTo.value = origin.path;
});

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

// Keep the friendly not-found card, but report the correct status to crawlers.
if (!data.value) {
  const event = useRequestEvent();
  if (event) setResponseStatus(event, 404);
}

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
  if (data.value.readingTime) return data.value.readingTime;
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
