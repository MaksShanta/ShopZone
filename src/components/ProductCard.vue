<template>
  <div class="group relative flex min-h-[390px] flex-col rounded bg-white p-3 shadow transition hover:shadow-lg">
    <button
      class="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-xl shadow hover:text-red-500"
      title="Додати в обране"
    >
      ♡
    </button>

    <div
      v-if="product.oldPrice && product.oldPrice > product.price"
      class="absolute left-3 top-3 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white"
    >
      Акція
    </div>

    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="flex h-44 items-center justify-center">
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="max-h-44 max-w-full object-contain transition duration-200 group-hover:scale-105"
        />
      </div>

      <h2 class="mt-3 line-clamp-2 min-h-10 text-sm leading-5 hover:text-green-600">
        {{ product.title }}
      </h2>
    </RouterLink>

    <div class="mt-2 flex items-center gap-2 text-sm">
      <span class="text-yellow-500">★</span>

      <span class="text-gray-600">
        {{ product.rating || 0 }}
      </span>

      <span class="text-gray-400">|</span>

      <span class="text-blue-600">
        {{ product.reviews || 0 }} відгуків
      </span>
    </div>

    <div class="mt-3">
      <p
        v-if="product.oldPrice && product.oldPrice > product.price"
        class="text-sm text-gray-400 line-through"
      >
        {{ product.oldPrice }} грн
      </p>

      <p class="text-2xl font-bold text-red-600">
        {{ product.price }} грн
      </p>
    </div>

    <p
      class="mt-2 text-sm"
      :class="product.inStock ? 'text-green-600' : 'text-red-600'"
    >
      {{ product.inStock ? 'Є в наявності' : 'Немає в наявності' }}
    </p>

    <p class="mt-1 text-xs text-green-600">
      Безкоштовна доставка
    </p>

    <div class="mt-auto flex items-center gap-2 pt-4">
      <button
        @click="handleAddToCart"
        class="flex flex-1 items-center justify-center gap-2 rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        :disabled="!product.inStock || cartStore.loading"
      >
        <span>🛒</span>
        <span>{{ cartStore.loading ? 'Додавання...' : 'Купити' }}</span>
      </button>

      <button
        class="rounded border px-3 py-2 text-lg hover:bg-gray-100"
        title="Порівняти"
      >
        ⇄
      </button>
    </div>
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