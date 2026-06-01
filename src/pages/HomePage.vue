<template>
  <section>
    <div class="rounded bg-white p-6 shadow">
      <h1 class="mb-3 text-3xl font-bold">
        Ласкаво просимо до ShopZone
      </h1>

      <p class="mb-4 text-gray-600">
        Навчальний інтернет-магазин у стилі великого українського маркетплейсу.
      </p>

      <RouterLink
        to="/catalog"
        class="inline-block rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
      >
        Перейти до каталогу
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>