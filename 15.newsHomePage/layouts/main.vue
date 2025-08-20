<script setup>
  import { ref } from 'vue'
  const asideOpened = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen w-screen p-6 md:p-24 gap-5">
    <header class="flex justify-between items-center w-full">
      <h1 class="font-serif font-black">W.</h1>
      <nav class="hidden md:block">
        <ul class="flex gap-2">
          <button class="px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"><li class="navItem">Home</li></button>
          <button class="px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"><li class="navItem">New</li></button>
          <button class="px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"><li class="navItem">Popular</li></button>
          <button class="px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"><li class="navItem">Trending</li></button>
          <button class="px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"><li class="navItem">Categories</li></button>
        </ul>
      </nav>
      <button @click="asideOpened = true" v-if="!asideOpened" class="md:hidden cursor-pointer"><img src="/images/icon-menu.svg" alt="open menu" class="w-6 h-4"/></button>
      <Aside v-model:controler="asideOpened" :items="['Home', 'New', 'Popular', 'Trending', 'Categories']" ></Aside>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>