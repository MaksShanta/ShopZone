<template>
  <div class="rounded bg-white p-6 shadow">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-bold">Адмін-панель ShopZone</h1>

      <div class="flex gap-3">
        <RouterLink to="/admin" class="text-green-600 hover:underline">
          Dashboard
        </RouterLink>

        <RouterLink to="/admin/products" class="text-green-600 hover:underline">
          Товари
        </RouterLink>

        <RouterLink to="/" class="text-gray-600 hover:underline">
          На сайт
        </RouterLink>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>