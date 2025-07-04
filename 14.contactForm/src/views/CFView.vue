<script setup lang="ts">
    import { reactive } from 'vue';
    import CFLayout from '../layouts/CFLayout.vue';
    import Input from '../components/Input.vue';
    import RadioButton from '../components/RadioButton.vue';
    import { showToast } from '../utils/showToast';
    import throttle from 'lodash/throttle';
    const toastOnce = throttle(
        (success = true) => showToast(success),
        2000,
        { leading: true, trailing: false }
    );
    const isFormValid = reactive({
        isFirstNameValid: false,
        isLastNameValid: false,
        isEmailValid: false,
        isQyeryTypeSelected: '',    
    })
</script>

<template>
  <CFLayout>
    <template #header>
      <h1 class="sr-only hidden">contact form task from frontend mentor</h1>
    </template>
    <template #main>
      <h1 class="font-bold text-gray-900">Contact Us</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input title="First Name" :regex="/^(?!\s*$).+/" error="This feild is required" v-model:isCorrect="isFormValid.isFirstNameValid" />
        <Input title="Last Name" :regex="/^(?!\s*$).+/" error="This feild is required" v-model:isCorrect="isFormValid.isLastNameValid" />
        <Input title="Email Address" :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" error="Please enter a valid email address" 
        v-model:isCorrect="isFormValid.isEmailValid" class="md:col-span-2 md:mt-2" />
        <RadioButton v-model="isFormValid.isQyeryTypeSelected" label="General Enquiry" value="General Enquiry" />
        <RadioButton v-model="isFormValid.isQyeryTypeSelected" label="Support Request" value="Support Request" />
        <button class="bg-green-600 text-white py-2 rounded-md cursor-pointer md:col-span-2" 
          @click.prevent="toastOnce">Submit</button>
      </div>
    </template>
  </CFLayout>
</template>