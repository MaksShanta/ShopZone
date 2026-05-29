<template>
  <section>
    <h1 class="mb-4 text-2xl font-bold">Каталог товарів</h1>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="rounded bg-white p-4 shadow hover:shadow-lg"
      >
        <div class="mb-3 flex h-40 items-center justify-center rounded bg-gray-200">
          Фото товару
        </div>

        <h2 class="font-bold">{{ product.title }}</h2>

        <p class="mt-2 text-gray-600">{{ product.description }}</p>

        <p class="mt-3 text-xl font-bold text-green-600">
          {{ product.price }} грн
        </p>

        <button class="mt-4 w-full rounded bg-green-600 py-2 text-white hover:bg-green-700">
          Додати в кошик
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    id: 1,
    title: 'Смартфон Samsung Galaxy A55',
    description: '128 GB, чорний',
    price: 15999,
  },
  {
    id: 2,
    title: 'Ноутбук Lenovo IdeaPad',
    description: '15.6", Ryzen 5, 16 GB RAM',
    price: 24999,
  },
  {
    id: 3,
    title: 'Навушники JBL Tune',
    description: 'Bluetooth, чорні',
    price: 1999,
  },
]
</script>