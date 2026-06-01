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

        <p class="mb-5 text-3xl font-bold text-green-600">
          {{ productStore.currentProduct.price }} грн
        </p>

        <button
          @click="handleAddToCart"
          class="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
          :disabled="cartStore.loading"
        >
          {{ cartStore.loading ? 'Додавання...' : 'Додати в кошик' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductStore } from '../stores/productStore'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(async () => {
  await productStore.fetchProductById(route.params.id)
})

async function handleAddToCart() {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }

  await cartStore.addToCart(
    authStore.user.uid,
    productStore.currentProduct
  )

  router.push('/cart')
}
</script>