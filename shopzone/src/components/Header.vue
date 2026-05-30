<template>
  <header class="bg-green-600 text-white">
    <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
      <RouterLink to="/" class="text-2xl font-bold">
        ShopZone
      </RouterLink>

      <RouterLink
        to="/catalog"
        class="rounded bg-green-700 px-4 py-2 hover:bg-green-800"
      >
        Каталог
      </RouterLink>

      <input
        type="text"
        placeholder="Я шукаю..."
        class="flex-1 rounded px-4 py-2 text-black outline-none"
      />

      <RouterLink to="/cart" class="hover:underline">
        Кошик ({{ cartStore.totalItems }})
      </RouterLink>

      <RouterLink
        v-if="authStore.isLoggedIn"
        to="/my-orders"
        class="hover:underline"
      >
        Мої замовлення
      </RouterLink>

      
      <RouterLink
        v-if="authStore.isAdmin"
        to="/admin"
        class="hover:underline"
      >
        Адмін
      </RouterLink>
   
      <RouterLink
        v-if="!authStore.isLoggedIn"
        to="/login"
        class="hover:underline"
      >
        Увійти
      </RouterLink>

      <RouterLink
        v-else
        to="/profile"
        class="hover:underline"
      >
        Профіль
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  if (authStore.user) {
    cartStore.fetchCart(authStore.user.uid)
  }
})
</script>