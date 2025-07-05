<script setup lang="ts">
    import { reactive, ref, computed } from 'vue';
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
        isMessageWritten: '',
        isConsented: false
    });
    const submitAttempted = ref(false);
    const submitHandler = () => {
        submitAttempted.value = true;
        const allValid = Object.entries(isFormValid).every(([key, value]) => {
            if (key === 'isQyeryTypeSelected' || key === 'isMessageWritten') return value !== '';
            return value === true;
        });
        if (allValid) {
            toastOnce();
        }
    };
    const textAreaIsBlurred = ref(false);
    const textAreaShowError = computed(() => {
        return submitAttempted.value || textAreaIsBlurred.value;
    });
    const borderClass = computed(() => {
        if (!textAreaShowError.value) return 'border-gray-500';
        return isFormValid.isMessageWritten ? 'border-green-600' : 'border-red'
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
        <Input title="First Name" :regex="/^(?!\s*$).+/" error="This feild is required" v-model:isCorrect="isFormValid.isFirstNameValid" :forceShowErrors="submitAttempted" />
        <Input title="Last Name" :regex="/^(?!\s*$).+/" error="This feild is required" v-model:isCorrect="isFormValid.isLastNameValid" :forceShowErrors="submitAttempted" />
        <Input title="Email Address" :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" error="Please enter a valid email address" 
        v-model:isCorrect="isFormValid.isEmailValid" class="md:col-span-2 md:mt-2" :forceShowErrors="submitAttempted" />
        <div class="flex gap-1 md:col-span-2">
          <p>Query Type</p>
          <p class="text-green-600">*</p>
        </div>
        <RadioButton v-model="isFormValid.isQyeryTypeSelected" label="General Enquiry" value="General Enquiry" />
        <RadioButton v-model="isFormValid.isQyeryTypeSelected" label="Support Request" value="Support Request" />
        <p v-if="submitAttempted && isFormValid.isQyeryTypeSelected === ''" class="text-red">Please select a query type</p>
        <div class="flex gap-1 md:col-span-2">
          <p>Message</p>
          <p class="text-green-600">*</p>
        </div>
        <textarea :class="['border-1 md:col-span-2 outline-0 p-1 rounded-lg resize-none h-25', borderClass]"
        @blur="textAreaIsBlurred = true" @focus="textAreaIsBlurred = false" v-model="isFormValid.isMessageWritten"></textarea>
        <p v-if="textAreaShowError && !isFormValid.isMessageWritten" class="text-red">This field is required</p>
        <div class="flex justify-start gap-2 md:col-span-2">
          <input id="consentCheckbox" type="checkbox" v-model="isFormValid.isConsented"/>
          <label for="consentCheckbox">I consent to being contacted by the team</label>
          <p class="text-green-600">*</p>
        </div>
        <p v-if="submitAttempted && !isFormValid.isConsented" class="text-red md:col-span-2">To submit this form, please consent to be contacted</p>
        <button class="bg-green-600 text-white py-2 rounded-md cursor-pointer md:col-span-2" 
          @click.prevent="submitHandler">Submit</button>
      </div>
    </template>
  </CFLayout>
</template>