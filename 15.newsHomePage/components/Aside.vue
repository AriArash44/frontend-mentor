<script setup lang="ts">
  import { defineModel, defineProps, ref, watch, nextTick } from 'vue'
  import 'animate.css'
  const controler = defineModel<boolean>('controler')
  const { items } = defineProps<{ items: string[] }>()
  const showBackdrop = ref(controler.value)
  const showSidebar = ref(controler.value)
  const sidebarRef = ref<HTMLElement | null>(null)
  watch(controler, async (visible) => {
    const el = sidebarRef.value!
    if (visible) {
      showSidebar.value = true
      showBackdrop.value = true
      await nextTick()
      el.classList.replace('animate__slideOutRight', 'animate__slideInRight')
    } else {
      el.classList.replace('animate__slideInRight', 'animate__slideOutRight')
      el.addEventListener('animationend',() => {
          showSidebar.value = false
          showBackdrop.value = false
        },
        { once: true }
      )
    }
  },
  { flush: 'post' }
)
</script>

<template>
  <div v-if="showBackdrop" @click="controler = false" class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
  <aside v-if="showSidebar" ref="sidebarRef" class=" fixed inset-y-0 right-0 w-64 bg-white z-50 overflow-y-auto animate__animated animate__slideInRight">
    <button @click="controler = false" class="absolute top-5 right-5 cursor-pointer"><img src="/images/icon-menu-close.svg" alt="close menu" class="w-6 h-6" /></button>
    <ul class="mt-32">
      <li v-for="(item, idx) in items" :key="idx" class="navItem">
        <button class="w-full text-left px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <p>{{item}}</p>
        </button>
      </li>
    </ul>
  </aside>
</template>
