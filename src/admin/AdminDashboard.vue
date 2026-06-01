<template>
  <AdminLayout>
    <h2 class="mb-4 text-xl font-bold">Головна адмін-панель</h2>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded bg-green-50 p-4">
        <p class="text-gray-600">Товарів</p>
        <p class="text-3xl font-bold text-green-600">
          {{ productStore.products.length }}
        </p>
      </div>

      <div class="rounded bg-blue-50 p-4">
        <p class="text-gray-600">Роль</p>
        <p class="text-3xl font-bold text-blue-600">
          Admin
        </p>
      </div>

      <div class="rounded bg-yellow-50 p-4">
        <p class="text-gray-600">Статус</p>
        <p class="text-3xl font-bold text-yellow-600">
          Active
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>