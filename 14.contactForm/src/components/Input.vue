<script setup lang="ts">
    import { useId, ref, computed, watch } from 'vue';
    const props = withDefaults(defineProps<{
        title?: string
        type?: string
        regex?: RegExp
        error?: string
        forceShowErrors?: boolean
    }>(), {
        type: 'text',
        forceShowErrors: false
    });
    const inputValue = ref('');
    const isCorrect = defineModel<boolean>();
    watch(inputValue, (newVal) => {
        const pattern = props.regex ? new RegExp(props.regex) : null
        isCorrect.value = pattern ? pattern.test(newVal) : false
    });
    const inputId = useId();
    const isBlurred = ref(false);
    const showError = computed(() => {
        return props.forceShowErrors || isBlurred.value;
    });
    const borderClass = computed(() => {
        if (!showError.value) return 'border-gray-500';
        return isCorrect.value ? 'border-green-600' : 'border-red'
    })
</script>

<template>
  <div>
    <div class="flex gap-1">
      <label :for="inputId">{{ props.title }}</label>
      <p class="text-green-600">*</p>
    </div>
    <input :type="props.type" v-model="inputValue" :id="inputId"
    @blur="isBlurred = true" @focus="isBlurred = false"
    :class="['w-full p-1.5 border-1 rounded-lg outline-none', borderClass]"/>
    <p v-if="showError && !isCorrect" class="text-red">{{ props.error }}</p>
  </div>
</template> 