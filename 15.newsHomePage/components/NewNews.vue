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
  <div class="bg-neutral-very-dark-blue p-4">
    <h1 class="text-soft-orange">New</h1>
    <div v-for="(item, idx) in news" :key="idx">
      <h2 class="mt-4 hover:text-soft-orange cursor-pointer">{{ item.title }}</h2>
      <p class="text-neutral-grayish-blue mt-1">{{ item.caption }}</p>
      <hr v-if="idx !== news.length - 1" class="border-neutral-grayish-blue mt-4"/>
    </div>
  </div>
</template>
