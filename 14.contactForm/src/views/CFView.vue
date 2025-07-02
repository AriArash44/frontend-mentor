<script setup lang="ts">
    import CFLayout from '../layouts/CFLayout.vue';
    // import Input from '../components/Input.vue';
    import { showToast } from '../utils/showToast';
    import throttle from 'lodash/throttle';

    const toastOnce = throttle(
        (success = true) => showToast(success),
        2000,
        { leading: true, trailing: false }
    );
</script>

<template>
  <CFLayout>
    <template #header>
      <h1 class="sr-only hidden">contact form task from frontend mentor</h1>
    </template>
    <template #main>
      <h1 class="font-bold text-gray-900">Contact Us</h1>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <Input />
        <Input />
        <button class="bg-green-600 text-white py-2 rounded-md cursor-pointer md:col-span-2" 
          @click.prevent="toastOnce">Submit</button>
      </div>
    </template>
  </CFLayout>
</template>