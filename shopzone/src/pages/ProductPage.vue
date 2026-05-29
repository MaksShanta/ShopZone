<template>
  <section>
    <div v-if="productStore.loading" class="rounded bg-white p-6 shadow">
      Завантаження товару...
    </div>

    <div v-else-if="productStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ productStore.error }}
    </div>

    <div v-else-if="!productStore.currentProduct" class="rounded bg-white p-6 shadow">
      Товар не знайдено
    </div>

    <div v-else class="grid gap-6 rounded bg-white p-6 shadow md:grid-cols-2">
      <img
        :src="productStore.currentProduct.imageUrl"
        :alt="productStore.currentProduct.title"
        class="w-full rounded object-cover"
      />

      <div>
        <h1 class="mb-3 text-3xl font-bold">
          {{ productStore.currentProduct.title }}
        </h1>

        <p class="mb-3 text-gray-600">
          {{ productStore.currentProduct.description }}
        </p>

        <p class="mb-2 text-sm text-gray-500">
          Категорія: {{ productStore.currentProduct.category }}
        </p>

        <p class="mb-2">
          Рейтинг: ⭐ {{ productStore.currentProduct.rating }}
        </p>

        <p
          class="mb-4"
          :class="productStore.currentProduct.inStock ? 'text-green-600' : 'text-red-600'"
        >
          {{ productStore.currentProduct.inStock ? 'Є в наявності' : 'Немає в наявності' }}
        </p>

        <p
          v-if="productStore.currentProduct.oldPrice"
          class="text-gray-400 line-through"
        >
          {{ productStore.currentProduct.oldPrice }} грн
        </p>

        <p class="mb-5 text-3xl font-bold text-green-600">
          {{ productStore.currentProduct.price }} грн
        </p>

        <button
          class="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
          :disabled="!productStore.currentProduct.inStock"
        >
          Додати в кошик
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProductById(route.params.id)
})
</script>