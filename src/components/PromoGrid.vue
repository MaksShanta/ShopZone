<template>
  <section class="mt-5 rounded bg-white p-4 shadow">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        Акції
      </h2>

      <RouterLink to="/catalog" class="text-green-600 hover:underline">
        Всі акції →
      </RouterLink>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <RouterLink
        v-for="promo in promos"
        :key="promo.title"
        to="/catalog"
        class="overflow-hidden rounded border transition hover:-translate-y-1 hover:shadow-lg"
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
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const promos = [
  {
    label: '-35%',
    title: 'Знижки на техніку',
    description: 'Телевізори, монітори та аксесуари.',
    bg: 'bg-green-100 text-green-700',
  },
  {
    label: '0%',
    title: 'Оплата частинами',
    description: 'Ноутбуки та смартфони до 20 платежів.',
    bg: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'TOP',
    title: 'Популярні товари',
    description: 'Те, що найчастіше купують користувачі.',
    bg: 'bg-yellow-100 text-yellow-700',
  },
  {
    label: 'NEW',
    title: 'Новинки',
    description: 'Свіжі товари в каталозі ShopZone.',
    bg: 'bg-purple-100 text-purple-700',
  },
]
</script>