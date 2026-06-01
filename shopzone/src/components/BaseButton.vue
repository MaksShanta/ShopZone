<template>
  <button
    class="rounded px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:bg-gray-400"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const buttonClass = computed(() => {
  if (props.variant === 'danger') {
    return 'bg-red-600 text-white hover:bg-red-700'
  }

  if (props.variant === 'outline') {
    return 'border bg-white text-gray-700 hover:bg-gray-100'
  }

  return 'bg-green-600 text-white hover:bg-green-700'
})
</script>