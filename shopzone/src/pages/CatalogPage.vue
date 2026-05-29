<template>
  <section>
    <h1 class="mb-4 text-2xl font-bold">Каталог товарів</h1>

    <div v-if="productStore.loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in 6"
        :key="item"
        class="h-80 animate-pulse rounded bg-gray-200"
      ></div>
    </div>

    <p v-else-if="productStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ productStore.error }}
    </p>

    <ProductList
      v-else
      :products="productStore.products"
    />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductList from '../components/ProductList.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>