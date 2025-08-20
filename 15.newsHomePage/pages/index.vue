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
  const { data, error, pending } = await useGet<NewsResponse>('/news')
</script>

<template>
  <Main>
    <div v-if="pending" role="status" class="text-center py-10 text-gray-500" aria-live="polite">
      Loading news content...
    </div>
    <div v-else-if="error" role="alert" class="text-center py-10 text-red-600" aria-live="assertive">
      Failed to load news. Please try again later.
    </div>
    <div v-else-if="data" class="md:grid md:grid-cols-3 md:grid-rows-[auto_auto] gap-8 mt-2 md:mt-6">
      <div class="md:grid md:grid-cols-2 md:grid-rows-[auto_auto] md:col-span-2 gap-8 mb-8 md:mb-0">
        <img class="md:hidden" :src="data?.main.mobile_figure" :alt="data?.main.alt"/>
        <img class="hidden md:block col-span-2" :src="data?.main.desktop_figure" :alt="data?.main.alt"/>
        <h1 class="mt-4 md:mt-0">{{ data?.main?.title }}</h1>
        <div>
          <p class="text-neutral-dark-grayish-blue mt-4 md:mt-2">{{ data?.main?.caption }}</p>
          <button class="px-5 md:px-6 py-2 md:py-3 mt-5 md:mt-6 mb-5 font-bold text-neutral-very-dark-blue bg-soft-red text-sm md:text-base
          hover:bg-neutral-very-dark-blue hover:text-neutral-off-white cursor-pointer">R E A D <span class="ml-2">M O R E</span></button>
        </div>
      </div>
      <NewNews :news="data.new" />
      <div :class="idx === 0 ? 'mt-12 md:mt-4' : 'mt-4'" v-for="(item, idx) in data.card" :key="idx">
        <CardNews v-bind="{ ...item, id: idx + 1 }" />
      </div>
    </div>
  </Main>
</template>
