<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div class="w-full max-w-md rounded bg-white p-6 shadow">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">
          {{ title }}
        </h2>

        <button
          class="text-2xl leading-none text-gray-500 hover:text-black"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <slot />

      <div class="mt-6 flex justify-end gap-3">
        <button
          class="rounded border px-4 py-2 hover:bg-gray-100"
          @click="$emit('close')"
        >
          Скасувати
        </button>

        <button
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          @click="$emit('confirm')"
        >
          Підтвердити
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Модальне вікно',
  },
})

defineEmits(['close', 'confirm'])
</script>