<template>
  <form @submit.prevent="handleSubmit" class="mb-6 space-y-4 rounded border p-4">
    <h2 class="text-xl font-bold">
      {{ editingProduct ? 'Редагувати товар' : 'Додати товар' }}
    </h2>

    <input
      v-model="form.title"
      class="w-full rounded border px-3 py-2"
      placeholder="Назва товару"
      required
    />

    <textarea
      v-model="form.description"
      class="w-full rounded border px-3 py-2"
      placeholder="Опис товару"
      required
    ></textarea>

    <input
      v-model.number="form.price"
      type="number"
      class="w-full rounded border px-3 py-2"
      placeholder="Ціна"
      required
    />

    <input
      v-model.number="form.oldPrice"
      type="number"
      class="w-full rounded border px-3 py-2"
      placeholder="Стара ціна"
    />

    <input
      v-model="form.category"
      class="w-full rounded border px-3 py-2"
      placeholder="Категорія"
      required
    />

    <input
      v-model="form.imageUrl"
      class="w-full rounded border px-3 py-2"
      placeholder="URL зображення"
      required
    />

    <input
      v-model.number="form.rating"
      type="number"
      step="0.1"
      max="5"
      min="1"
      class="w-full rounded border px-3 py-2"
      placeholder="Рейтинг"
    />

    <label class="flex items-center gap-2">
      <input v-model="form.inStock" type="checkbox" />
      Є в наявності
    </label>

    <div class="flex gap-3">
      <button
        type="submit"
        class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        {{ editingProduct ? 'Зберегти зміни' : 'Додати товар' }}
      </button>

      <button
        v-if="editingProduct"
        type="button"
        @click="$emit('cancel')"
        class="rounded border px-4 py-2 hover:bg-gray-100"
      >
        Скасувати
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingProduct: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  price: 0,
  oldPrice: 0,
  category: '',
  imageUrl: '',
  rating: 4.5,
  inStock: true,
})

watch(
  () => props.editingProduct,
  (product) => {
    if (product) {
      form.title = product.title
      form.description = product.description
      form.price = product.price
      form.oldPrice = product.oldPrice || 0
      form.category = product.category
      form.imageUrl = product.imageUrl
      form.rating = product.rating || 4.5
      form.inStock = product.inStock
    } else {
      form.title = ''
      form.description = ''
      form.price = 0
      form.oldPrice = 0
      form.category = ''
      form.imageUrl = ''
      form.rating = 4.5
      form.inStock = true
    }
  },
  { immediate: true }
)

function handleSubmit() {
  emit('submit', { ...form })
}
</script>