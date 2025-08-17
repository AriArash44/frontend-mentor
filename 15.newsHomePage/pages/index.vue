<script setup lang="ts">
  import Main from '~/layouts/Main.vue'
  type MainNews = {
    title: string
    caption: string
    desktop_figure: string
    mobile_figure: string
    alt: string
  }
  type CardNews = {
    title: string
    caption: string
    figure: string
    alt: string
  }
  type NewNewsItem = {
    title: string
    caption: string
  }
  interface NewsResponse {
    main: MainNews
    card: CardNews[]
    new: NewNewsItem[]
  }
  const { data, error } = await useGet<NewsResponse>('/news')
</script>

<template>
  <Main>
    <NewNews v-if="data?.new" :news="data.new" />
    <div class="mt-2" v-if="data?.card" v-for="(item, idx) in data.card" :key="idx">
      <CardNews v-bind="{ ...item, id: idx + 1 }" />
    </div>
  </Main>
</template>
