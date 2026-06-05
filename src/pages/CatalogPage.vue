<template>
  <section>
    <div class="mb-4 rounded bg-white p-4 shadow">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold">
            Каталог товарів
          </h1>

          <p class="text-sm text-gray-500">
            Знайдено товарів: {{ productStore.filteredProducts.length }}
          </p>

          <p
            v-if="productStore.onlyDiscounts"
            class="mt-1 text-sm font-medium text-red-600"
          >
            Активний фільтр: товари зі знижкою
          </p>

          <p
            v-else-if="productStore.onlyTopProducts"
            class="mt-1 text-sm font-medium text-yellow-600"
          >
            Активний фільтр: популярні товари
          </p>

          <p
            v-else-if="productStore.selectedCategories.length > 0"
            class="mt-1 text-sm font-medium text-blue-600"
          >
            Активні категорії: {{ productStore.selectedCategories.join(', ') }}
          </p>

          <p
            v-else-if="productStore.selectedCategory !== 'Усі'"
            class="mt-1 text-sm font-medium text-green-600"
          >
            Активна категорія: {{ productStore.selectedCategory }}
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="productStore.resetFilters()"
            class="rounded border px-3 py-2 hover:bg-gray-100"
          >
            Скинути фільтри
          </button>

          <select
            v-model="productStore.sortBy"
            class="rounded border px-3 py-2"
          >
            <option value="default">За замовчуванням</option>
            <option value="price-asc">Спочатку дешевші</option>
            <option value="price-desc">Спочатку дорожчі</option>
            <option value="rating">За рейтингом</option>
          </select>
        </div>
      </div>

      <div class="mt-4 block md:hidden">
        <label class="mb-1 block text-sm font-medium">Категорія</label>

        <select
          v-model="productStore.selectedCategory"
          class="w-full rounded border px-3 py-2"
          @change="productStore.setCategory(productStore.selectedCategory)"
        >
          <option
            v-for="category in productStore.categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="productStore.loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonProductCard
        v-for="item in 6"
        :key="item"
      />
    </div>

    <p v-else-if="productStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ productStore.error }}
    </p>

    <div
      v-else-if="productStore.filteredProducts.length === 0"
      class="rounded bg-white p-6 text-center shadow"
    >
      Нічого не знайдено.
    </div>

    <ProductList
      v-else
      :products="productStore.filteredProducts"
    />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductList from '../components/ProductList.vue'
import SkeletonProductCard from '../components/SkeletonProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>