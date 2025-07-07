<script setup lang="ts">
    import { useId } from 'vue'
    const props = defineProps<{
        label: string
        value: string
    }>()
    const selected = defineModel<string>()
    const radioId = useId()
</script>

<template>
  <button :class="['flex items-center gap-2 border-1 border-gray-500 rounded-lg p-2 px-4 cursor-pointer',
  selected === value ? 'bg-green-200 border-green-600' : '']" @click="selected = value">
    <input
      :id="radioId"
      type="radio"
      :value="props.value"
      v-model="selected"
      class="cursor-pointer"
    />
    <label :for="radioId" class="cursor-pointer">
      {{ props.label }}
    </label>
  </button>
</template>
