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
          <li class="navItem">Home</li>
          <li class="navItem">New</li>
          <li class="navItem">Popular</li>
          <li class="navItem">Trending</li>
          <li class="navItem">Categories</li>
        </ul>
      </nav>
      <button @click="asideOpened = true" v-if="!asideOpened" class="md:hidden cursor-pointer"><img src="/images/icon-menu.svg" alt="menu" class="w-6 h-4"/></button>
      <Aside v-model:controler="asideOpened" :items="['Home', 'New', 'Popular', 'Trending', 'Categories']" ></Aside>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>