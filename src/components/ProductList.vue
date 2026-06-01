<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>