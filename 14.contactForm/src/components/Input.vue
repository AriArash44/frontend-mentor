<!-- <script setup lang="ts">
    import { useId, ref, computed } from 'vue';
    const props = defineProps({
        title: String,
        leftTitle: String,
        regex: String,
        modelValue: String,
        error: String,
    });
    const emit = defineEmits(['update:modelValue']);
    const inputId = useId();
    const value = ref(props.modelValue || '');
    const isCorrect = computed(() => {
        try {
            return new RegExp(props.regex).test(value.value);
        } catch (e) {
            return false;
        }
    });
    const inputClass = computed(() => {
        if (!value.value) return 'border-grey-border';
        return isCorrect.value ? 'border-primary-green' : 'border-secondary-red';
    });
</script>

<template>
  <div class="d-flex justify-content-between mb-1">
    <label :for="inputId" class="d-block fs-14px fw-semibold text-nowrap">{{ title }}</label>
  </div>
  <div class="position-relative">
    <input />
    <!-- <input
      :id="inputId"
      type="text"
      :value="value"
      @input="handleInput"
      :class="['w-100 p-2 border-solid rounded-1', inputClass]"
      :placeholder="placeholder"
    /> 
    </div>
  <p v-if="value && !isCorrect" class="text-secondary-red">{{ error }}</p>
</template> --> 