<script setup lang="ts">
  import Main from '~/layouts/Main.vue'
  const { data, error } = await useGet<{ title: string; id: number }[]>('/news')
</script>

<template>
  <Main>
    <!-- <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ul> -->
  </Main>
</template>
