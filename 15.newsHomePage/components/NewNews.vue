<script setup lang="ts">
  import { defineProps } from 'vue'
  type NewsItem = {
    title: string
    caption: string
  }
  const { news } = defineProps<{
    news: NewsItem[]
  }>()
</script>

<template>
  <div class="bg-neutral-very-dark-blue p-6 md:p-8 mb-4">
    <h1 class="text-soft-orange text-3xl md:text-4xl font-bold">New</h1>
    <div v-for="(item, idx) in news" :key="idx">
      <h2 class="mt-6 md:mt-8">
        <button class="hover:text-soft-orange cursor-pointer focus:outline-none focus:ring-2 focus:ring-soft-orange text-left w-full">
          {{ item.title }}
        </button>
      </h2>
      <p class="text-neutral-grayish-blue mt-2 md:mt-3 text-sm md:text-base">{{ item.caption }}</p>
      <hr v-if="idx !== news.length - 1" class="border-neutral-grayish-blue mt-6 md:mt-8"/>
    </div>
  </div>
</template>
