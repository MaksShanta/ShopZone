<template>
  <AdminLayout>
    <h2 class="mb-4 text-xl font-bold">Керування товарами</h2>

    <AdminProductForm
      :editing-product="editingProduct"
      @submit="handleSaveProduct"
      @cancel="editingProduct = null"
    />

    <p v-if="productStore.error" class="mb-4 rounded bg-red-100 p-3 text-red-700">
      {{ productStore.error }}
    </p>

    <div v-if="productStore.loading" class="rounded bg-gray-100 p-4">
      Завантаження...
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="product in productStore.products"
        :key="product.id"
        class="flex flex-wrap items-center gap-4 rounded border p-4"
      >
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="h-20 w-20 rounded object-cover"
        />

        <div class="flex-1">
          <h3 class="font-bold">{{ product.title }}</h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-bold text-green-600">{{ product.price }} грн</p>
        </div>

        <button
          @click="editingProduct = product"
          class="rounded border px-3 py-2 hover:bg-gray-100"
        >
          Редагувати
        </button>

        <button
          @click="handleDeleteProduct(product.id)"
          class="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
        >
          Видалити
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import AdminLayout from '../layouts/AdminLayout.vue'
import AdminProductForm from './AdminProductForm.vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()
const editingProduct = ref(null)

onMounted(() => {
  productStore.fetchProducts()
})

async function handleSaveProduct(productData) {
  if (editingProduct.value) {
    await productStore.editProduct(editingProduct.value.id, productData)
    editingProduct.value = null
  } else {
    await productStore.addProduct(productData)
  }
}

async function handleDeleteProduct(productId) {
  const isConfirmed = confirm('Видалити цей товар?')

  if (isConfirmed) {
    await productStore.removeProduct(productId)
  }
}
</script>