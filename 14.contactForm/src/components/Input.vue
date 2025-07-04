<script setup lang="ts">
    import { ref, defineModel, defineProps, watch } from 'vue';
    const props = withDefaults(defineProps<{
        title?: string
        type?: string
        regex?: string
        error?: string
    }>(), {
        type: 'text'
    })
    const inputValue = ref('')
    const isCorrectModel = defineModel<boolean>()
    watch(inputValue, (newVal) => {
        const pattern = props.regex ? new RegExp(props.regex) : null
        isCorrectModel.value = pattern ? pattern.test(newVal) : false
    })
</script>

<template>
  <input :type="props.type" v-model="inputValue" @blur="" @focus=""
  class="p-1.5 border-1 border-gray-500 rounded-lg"/>
</template> 