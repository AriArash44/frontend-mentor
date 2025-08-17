<script setup lang="ts">
  import { defineProps } from 'vue'
  const props = defineProps<{
    title: string
    caption: string
    figure: string
    alt: string
    id: number
  }>()
</script>

<template>
  <div class="flex gap-2">
    <img class="w-1/3" :src="props.figure" :alt="props.alt" />
    <div class="w-2/3">
      <h2 class="text-soft-red">{{ String(props.id).padStart(2, '0') }}</h2>
      <h3 class="mt-2 hover:text-soft-red cursor-pointer">{{ props.title }}</h3>
      <p class="text-neutral-dark-grayish-blue mt-2">{{ props.caption }}</p>
    </div>
  </div>
</template>