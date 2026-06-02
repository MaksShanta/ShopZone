<template>
  <section class="rounded bg-white p-4 shadow">
    <div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <div class="relative overflow-hidden rounded bg-gradient-to-r from-green-600 to-emerald-400 p-8 text-white">
        <div class="relative z-10 max-w-xl">
          <p class="mb-2 text-sm font-bold uppercase">
            Головна акція
          </p>

          <h1 class="mb-3 text-3xl font-bold md:text-5xl">
            Безкоштовна доставка на обрані товари
          </h1>

          <p class="mb-6 text-green-50">
            Купуйте смартфони, ноутбуки, техніку для дому та аксесуари зі знижками.
          </p>

          <RouterLink
            to="/catalog"
            class="inline-block rounded bg-white px-5 py-3 font-bold text-green-700 hover:bg-gray-100"
          >
            Дивитися товари
          </RouterLink>
        </div>

        <div class="absolute -right-10 bottom-0 hidden h-48 w-48 rounded-full bg-white/20 md:block"></div>
        <div class="absolute right-16 top-8 hidden h-24 w-24 rounded-full bg-white/10 md:block"></div>
      </div>

      <div class="grid gap-4">
        <RouterLink
          to="/catalog"
          class="rounded bg-yellow-100 p-5 transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Акція тижня</p>
          <h2 class="mt-1 text-xl font-bold">Знижки до 35%</h2>
          <p class="mt-2 text-sm text-gray-600">
            На телевізори, монітори та аксесуари.
          </p>
        </RouterLink>

        <RouterLink
          to="/catalog"
          class="rounded bg-blue-100 p-5 transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Оплата частинами</p>
          <h2 class="mt-1 text-xl font-bold">До 20 платежів</h2>
          <p class="mt-2 text-sm text-gray-600">
            Ноутбуки, смартфони та побутова техніка.
          </p>
        </RouterLink>

        <RouterLink
          to="/catalog"
          class="rounded bg-red-100 p-5 transition hover:-translate-y-1 hover:shadow"
        >
          <p class="text-sm text-gray-600">Гарячі пропозиції</p>
          <h2 class="mt-1 text-xl font-bold">Товари дня</h2>
          <p class="mt-2 text-sm text-gray-600">
            Обмежена кількість за спеціальною ціною.
          </p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>