<template>
  <header class="bg-green-600 text-white">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
      <RouterLink to="/" class="text-2xl font-bold">
        ShopZone
      </RouterLink>

      <button class="rounded bg-green-700 px-4 py-2 hover:bg-green-800">
        Каталог
      </button>

      <input
        type="text"
        placeholder="Я шукаю..."
        class="flex-1 rounded px-4 py-2 text-black outline-none"
      />

      <RouterLink to="/catalog" class="hover:underline">
        Товари
      </RouterLink>

      <RouterLink to="/cart" class="hover:underline">
        Кошик
      </RouterLink>

      <RouterLink to="/login" class="hover:underline">
        Увійти
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>