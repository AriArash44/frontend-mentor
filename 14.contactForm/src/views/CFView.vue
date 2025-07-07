<script setup lang="ts">
    import { ref } from 'vue';
    import CFLayout from '../layouts/CFLayout.vue';
    import Field from '../components/Field.vue';
    import RadioButton from '../components/RadioButton.vue';
    import { showToast } from '../utils/showToast';
    import throttle from 'lodash/throttle';
    const toastOnce = throttle(
        (success = true) => showToast(success),
        2000,
        { leading: true, trailing: false }
    );
    const isFormValid = {
        isFirstNameValid: ref(false),
        isLastNameValid: ref(false),
        isEmailValid: ref(false),
        isQyeryTypeSelected: ref(''),
        isMessageWritten: ref(false),
        isConsented: ref(false),
    };
    const submitAttempted = ref(false);
    const submitHandler = () => {
        submitAttempted.value = true;
        const allValid = Object.entries(isFormValid).every(([key, refVal]) => {
            if (key === 'isQyeryTypeSelected') return refVal.value !== '';
            return refVal.value === true;
        });
        if (allValid) {
            toastOnce();
        }
    };
</script>

<template>
  <CFLayout>
    <template #header>
      <h1 class="sr-only hidden">contact form task from frontend mentor</h1>
    </template>
    <template #main>
      <h1 class="font-bold text-gray-900">Contact Us</h1>
      <form @submit.prevent="submitHandler">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field tag="input" title="First Name" error="This feild is required" v-model:isCorrect="isFormValid.isFirstNameValid.value" :forceShowErrors="submitAttempted" />
          <Field tag="input" title="Last Name" error="This feild is required" v-model:isCorrect="isFormValid.isLastNameValid.value" :forceShowErrors="submitAttempted" />
          <Field tag="input" title="Email Address" :regex="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" error="Please enter a valid email address" v-model:isCorrect="isFormValid.isEmailValid.value" class="md:col-span-2 md:mt-2" :forceShowErrors="submitAttempted" />
          <div class="flex gap-1 md:col-span-2">
            <p>Query Type</p>
            <p class="text-green-600">*</p>
          </div>
          <RadioButton v-model="isFormValid.isQyeryTypeSelected.value" label="General Enquiry" value="General Enquiry" />
          <RadioButton v-model="isFormValid.isQyeryTypeSelected.value" label="Support Request" value="Support Request" />
          <p v-if="submitAttempted && isFormValid.isQyeryTypeSelected.value === ''" class="text-red">Please select a query type</p>
          <Field tag="textarea" title="Message" error="This field is required" v-model:isCorrect="isFormValid.isMessageWritten.value" class="md:col-span-2" :forceShowErrors="submitAttempted" />
          <div class="flex justify-start gap-2 md:col-span-2">
            <input id="consentCheckbox" type="checkbox" v-model="isFormValid.isConsented.value" class="cursor-pointer"/>
            <label for="consentCheckbox" class="cursor-pointer">I consent to being contacted by the team</label>
            <p class="text-green-600">*</p>
          </div>
          <p v-if="submitAttempted && !isFormValid.isConsented.value" class="text-red md:col-span-2">To submit this form, please consent to be contacted</p>
          <button type="submit" class="bg-green-600 text-white py-2 rounded-md cursor-pointer md:col-span-2">Submit</button>
        </div>
      </form>
    </template>
  </CFLayout>
</template>