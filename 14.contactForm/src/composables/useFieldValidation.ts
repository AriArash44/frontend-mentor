import { ref, computed, watch, type Ref } from 'vue'

export function useFieldValidation(forceShowErrors: Ref<boolean>, regex?: RegExp) {
    const value = ref('');
    const isValid = ref(false);
    const isBlurred = ref(false);
    const showError = computed(() => forceShowErrors.value || isBlurred.value);
    const borderClass = computed(() => {
        if (!showError.value) return 'border-gray-500';
        return isValid.value ? 'border-green-600' : 'border-red';
    });
    watch(value, (val) => {
        isValid.value = regex ? regex.test(val.trim()) : val.trim() !== '';
    });
    return {
        value,
        isValid,
        isBlurred,
        showError,
        borderClass,
    };
}