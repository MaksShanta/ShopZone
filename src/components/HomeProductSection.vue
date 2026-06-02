<template>
  <section class="mt-6">
    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        Найкращі пропозиції для вас
      </h2>

      <RouterLink to="/catalog" class="text-green-600 hover:underline">
        Дивитися всі →
      </RouterLink>
    </div>

    <div v-if="productStore.loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SkeletonProductCard
        v-for="item in 8"
        :key="item"
      />
    </div>

    <div v-else-if="productStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ productStore.error }}
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ProductCard from './ProductCard.vue'
import SkeletonProductCard from './SkeletonProductCard.vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

const visibleProducts = computed(() => {
  return productStore.products.slice(0, 8)
})

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
})
</script>