<script setup lang="ts">
    import { computed, unref, useId, watch, type PropType, type Ref } from 'vue';
    import { useFieldValidation } from '../composables/useFieldValidation';
    const props = defineProps({
        tag: {
            type: String as PropType<'input' | 'textarea'>,
            default: 'input'
        },
        type: {
            type: String,
            default: 'text'
        },
        rows: {
            type: Number,
            default: 3
        },
        title: String,
        regex: RegExp,
        error: String,
        forceShowErrors: {
            type: [Boolean, Object] as PropType<boolean | Ref<boolean>>,
            default: false
        }
    });
    const forceShowErrorsRef = computed<boolean>({
        get: () => unref(props.forceShowErrors),
        set: () => {}
    });
    const inputId  = useId();
    const isCorrect = defineModel<boolean>('isCorrect');
    const {
        value,
        isValid,
        isBlurred,
        showError,
        borderClass
    } = useFieldValidation(forceShowErrorsRef, props.regex);
    watch(isValid, valid => {
        isCorrect.value = valid;
    });
</script>

<template>
  <div class="mb-4">
    <div class="flex gap-1 mb-1">
      <label :for="inputId">{{ props.title }}</label>
      <span class="text-green-600">*</span>
    </div>
    <component
      :is="props.tag"
      :id="inputId"
      :value="value"
      @input="value = $event.target.value"
      :type="props.tag === 'input' ? props.type : undefined"
      :rows="props.tag === 'textarea' ? props.rows : undefined"
      @blur="isBlurred = true"
      @focus="isBlurred = false"
      :class="[
        'w-full p-2 border rounded-lg outline-none',
        props.tag === 'textarea' ? 'resize-none h-24' : '',
        borderClass
      ]"
    />
    <p v-if="showError && !isValid" class="mt-1 text-red">
      {{ props.error }}
    </p>
  </div>
</template>