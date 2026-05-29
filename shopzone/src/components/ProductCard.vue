<template>
  <div class="rounded bg-white p-4 shadow transition hover:-translate-y-1 hover:shadow-lg">
    <RouterLink :to="`/product/${product.id}`">
      <img
        :src="product.imageUrl"
        :alt="product.title"
        class="mb-3 h-44 w-full rounded object-cover"
      />

      <h2 class="line-clamp-2 font-bold hover:text-green-600">
        {{ product.title }}
      </h2>
    </RouterLink>

    <p class="mt-2 text-sm text-gray-500">
      {{ product.category }}
    </p>

    <div class="mt-2 flex items-center gap-2">
      <span class="text-yellow-500">★</span>
      <span>{{ product.rating }}</span>
    </div>

    <div class="mt-3">
      <p v-if="product.oldPrice" class="text-sm text-gray-400 line-through">
        {{ product.oldPrice }} грн
      </p>

      <p class="text-xl font-bold text-green-600">
        {{ product.price }} грн
      </p>
    </div>

    <p
      class="mt-2 text-sm"
      :class="product.inStock ? 'text-green-600' : 'text-red-600'"
    >
      {{ product.inStock ? 'Є в наявності' : 'Немає в наявності' }}
    </p>

    <button
    @click="handleAddToCart"
    class="mt-4 w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
    :disabled="!product.inStock || cartStore.loading"
    >
    {{ cartStore.loading ? 'Додавання...' : 'Додати в кошик' }}
    </button>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

async function handleAddToCart() {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }

  await cartStore.addToCart(authStore.user.uid, props.product)
}
</script>