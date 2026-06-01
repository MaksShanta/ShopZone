<template>
  <aside class="hidden w-64 rounded bg-white p-4 shadow md:block">
    <h2 class="mb-3 font-bold">Категорії</h2>

    <ul class="space-y-2">
      <li
        v-for="category in productStore.categories"
        :key="category"
        @click="selectCategory(category)"
        class="cursor-pointer rounded px-2 py-1 hover:bg-green-50 hover:text-green-600"
        :class="productStore.selectedCategory === category ? 'bg-green-100 text-green-700' : ''"
      >
        {{ category }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const productStore = useProductStore()

function selectCategory(category) {
  productStore.setCategory(category)
  router.push('/catalog')
}
</script>