<template>
  <aside class="hidden w-72 md:block">
    <div class="rounded bg-white shadow">
      <div class="border-b border-gray-200 p-4">
        <h2 class="font-bold">
          Категорії товарів
        </h2>
      </div>

      <ul>
        <li
          v-for="category in productStore.categories"
          :key="category"
          @click="productStore.setCategory(category)"
          class="cursor-pointer px-4 py-3 transition hover:bg-green-50 hover:text-green-600"
          :class="
            productStore.selectedCategory === category
              ? 'bg-green-50 font-medium text-green-600'
              : ''
          "
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()
</script>