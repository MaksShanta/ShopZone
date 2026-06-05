<template>
  <section class="mt-5 rounded bg-white p-4 shadow">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        Акції
      </h2>

      <button
        @click="openDiscounts"
        class="text-green-600 hover:underline"
      >
        Всі акції →
      </button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <button
        v-for="promo in promos"
        :key="promo.title"
        @click="openPromo(promo)"
        class="overflow-hidden rounded border text-left transition hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          class="flex h-32 items-center justify-center text-center text-2xl font-bold"
          :class="promo.bg"
        >
          {{ promo.label }}
        </div>

        <div class="p-3">
          <h3 class="font-bold">
            {{ promo.title }}
          </h3>

          <p class="mt-1 text-sm text-gray-600">
            {{ promo.description }}
          </p>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const productStore = useProductStore()

const promos = [
  {
    label: '-35%',
    title: 'Знижки на техніку',
    description: 'Телевізори, монітори та аксесуари.',
    type: 'discount',
    bg: 'bg-green-100 text-green-700',
  },
  {
    label: '0%',
    title: 'Оплата частинами',
    description: 'Ноутбуки та смартфони до 20 платежів.',
    type: 'multi-category',
    categories: ['Ноутбуки', 'Смартфони'],
    bg: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'TOP',
    title: 'Популярні товари',
    description: 'Те, що найчастіше купують користувачі.',
    type: 'top',
    bg: 'bg-yellow-100 text-yellow-700',
  },
  {
    label: 'NEW',
    title: 'Новинки',
    description: 'Свіжі товари в каталозі ShopZone.',
    type: 'default',
    bg: 'bg-purple-100 text-purple-700',
  },
]

function openDiscounts() {
  productStore.showDiscounts()
  router.push('/catalog')
}

function openPromo(promo) {
  if (promo.type === 'discount') {
    productStore.showDiscounts()
  }

  if (promo.type === 'multi-category') {
    productStore.showCategories(promo.categories)
  }

  if (promo.type === 'top') {
    productStore.showTopProducts()
  }

  if (promo.type === 'default') {
    productStore.resetFilters()
  }

  router.push('/catalog')
}
</script>