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
        class="w-full rounded object-contain"
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
          Рейтинг:
          <span class="font-bold text-yellow-500">
            ⭐ {{ displayRating }}
          </span>
          /
          {{ displayReviewsCount }} відгуків
        </p>

        <p
          v-if="productStore.currentProduct.oldPrice"
          class="text-gray-400 line-through"
        >
          {{ productStore.currentProduct.oldPrice }} грн
        </p>

        <p class="mb-5 text-3xl font-bold text-red-600">
          {{ productStore.currentProduct.price }} грн
        </p>

        <button
          @click="handleAddToCart"
          class="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:bg-gray-400"
          :disabled="cartStore.loading || !productStore.currentProduct.inStock"
        >
          {{ cartStore.loading ? 'Додавання...' : 'Додати в кошик' }}
        </button>
      </div>
    </div>

    <div
      v-if="productStore.currentProduct"
      class="mt-6 rounded bg-white p-6 shadow"
    >
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-2xl font-bold">
          Відгуки про товар
        </h2>

        <div class="text-sm text-gray-600">
          <span class="font-bold text-yellow-500">
            ★ {{ displayRating }}
          </span>
          /
          {{ displayReviewsCount }} відгуків
        </div>
      </div>

      <ReviewForm
        v-if="authStore.isLoggedIn"
        :loading="reviewStore.loading"
        @submit="handleAddReview"
      />

      <div v-else class="rounded bg-gray-50 p-4 text-gray-600">
        Щоб залишити відгук, потрібно увійти в акаунт.

        <RouterLink to="/login" class="text-green-600 hover:underline">
          Увійти
        </RouterLink>
      </div>

      <ReviewList :reviews="reviewStore.reviews" />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

import { useProductStore } from '../stores/productStore'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useReviewStore } from '../stores/reviewStore'

import ReviewForm from '../components/ReviewForm.vue'
import ReviewList from '../components/ReviewList.vue'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const reviewStore = useReviewStore()

const displayReviewsCount = computed(() => {
  const productReviews = Number(productStore.currentProduct?.reviews || 0)
  return productReviews + reviewStore.reviewsCount
})

const displayRating = computed(() => {
  const productRating = Number(productStore.currentProduct?.rating || 0)
  const productReviews = Number(productStore.currentProduct?.reviews || 0)

  if (reviewStore.reviewsCount === 0) {
    return productRating
  }

  const productRatingSum = productRating * productReviews

  const newReviewsSum = reviewStore.reviews.reduce((sum, review) => {
    return sum + Number(review.rating)
  }, 0)

  const totalReviews = productReviews + reviewStore.reviewsCount

  if (totalReviews === 0) {
    return 0
  }

  return ((productRatingSum + newReviewsSum) / totalReviews).toFixed(1)
})

onMounted(async () => {
  await productStore.fetchProductById(route.params.id)
  await reviewStore.fetchReviews(route.params.id)
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

async function handleAddReview(reviewData) {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }

  await reviewStore.createReview(
    route.params.id,
    authStore.user,
    authStore.profile,
    reviewData
  )
}
</script>