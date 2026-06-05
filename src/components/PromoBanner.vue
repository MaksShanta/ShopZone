<template>
  <section class="rounded bg-white p-4 shadow">
    <div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <button
        @click="openDiscounts"
        class="relative overflow-hidden rounded bg-gradient-to-r from-green-600 to-emerald-400 p-8 text-left text-white"
      >
        <div class="relative z-10 max-w-xl">
          <p class="mb-2 text-sm font-bold uppercase">
            Головна акція
          </p>

          <h1 class="mb-3 text-3xl font-bold md:text-5xl">
            Знижки на обрані товари
          </h1>

          <p class="mb-6 text-green-50">
            Техніка, аксесуари та товари для дому за вигідними цінами.
          </p>

          <span class="inline-block rounded bg-white px-5 py-3 font-bold text-green-700">
            Дивитися акції
          </span>
        </div>

        <div class="absolute -right-10 bottom-0 hidden h-48 w-48 rounded-full bg-white/20 md:block"></div>
        <div class="absolute right-16 top-8 hidden h-24 w-24 rounded-full bg-white/10 md:block"></div>
      </button>

      <div class="grid gap-4">
        <button
          @click="openDiscounts"
          class="rounded bg-yellow-100 p-5 text-left transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Акція тижня</p>
          <h2 class="mt-1 text-xl font-bold">Знижки до 35%</h2>
          <p class="mt-2 text-sm text-gray-600">
            Найкращі пропозиції тижня для вигідних покупок.
          </p>
        </button>

        <button
          @click="openInstallmentProducts"
          class="rounded bg-blue-100 p-5 text-left transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Оплата частинами</p>
          <h2 class="mt-1 text-xl font-bold">До 20 платежів</h2>
          <p class="mt-2 text-sm text-gray-600">
            Ноутбуки та смартфони до 20 платежів.
          </p>
        </button>

        <button
          @click="openTopProducts"
          class="rounded bg-red-100 p-5 text-left transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Гарячі пропозиції</p>
          <h2 class="mt-1 text-xl font-bold">Популярні товари</h2>
          <p class="mt-2 text-sm text-gray-600">
            Те, що найчастіше обирають покупці.
          </p>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const productStore = useProductStore()

function openDiscounts() {
  productStore.showDiscounts()
  router.push('/catalog')
}

function openInstallmentProducts() {
  productStore.showCategories(['Ноутбуки', 'Смартфони'])
  router.push('/catalog')
}

function openTopProducts() {
  productStore.showTopProducts()
  router.push('/catalog')
}
</script>