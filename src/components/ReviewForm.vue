<template>
  <form
    @submit.prevent="handleSubmit"
    class="mt-6 rounded border p-4"
  >
    <h2 class="mb-4 text-xl font-bold">
      Залишити оцінку або відгук
    </h2>

    <div class="mb-4">
      <label class="mb-1 block font-medium">
        Оцінка
      </label>

      <select
        v-model.number="rating"
        class="w-full rounded border px-3 py-2"
      >
        <option :value="5">5 — Відмінно</option>
        <option :value="4">4 — Добре</option>
        <option :value="3">3 — Нормально</option>
        <option :value="2">2 — Погано</option>
        <option :value="1">1 — Дуже погано</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="mb-1 block font-medium">
        Коментар
        <span class="text-sm font-normal text-gray-500">
          необов’язково
        </span>
      </label>

      <textarea
        v-model="comment"
        class="w-full rounded border px-3 py-2"
        rows="4"
        placeholder="Можете написати вашу думку про товар або залишити тільки оцінку..."
      ></textarea>
    </div>

    <button
      type="submit"
      class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
      :disabled="loading"
    >
      {{ loading ? 'Додавання...' : 'Додати оцінку' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const rating = ref(5)
const comment = ref('')

function handleSubmit() {
  emit('submit', {
    rating: rating.value,
    comment: comment.value.trim(),
  })

  rating.value = 5
  comment.value = ''
}
</script>