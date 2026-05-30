<template>
  <header class="sticky top-0 z-50 bg-green-600 text-white shadow">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <button
        class="rounded bg-green-700 px-3 py-2 md:hidden"
        @click="isMenuOpen = !isMenuOpen"
      >
        ☰
      </button>

      <RouterLink to="/" class="text-2xl font-bold">
        ShopZone
      </RouterLink>

      <RouterLink
        to="/catalog"
        class="hidden rounded bg-green-700 px-4 py-2 hover:bg-green-800 md:block"
      >
        Каталог
      </RouterLink>

      <input
        v-model="search"
        @keyup.enter="goToCatalog"
        type="text"
        placeholder="Я шукаю..."
        class="min-w-0 flex-1 rounded px-4 py-2 text-black outline-none"
      />

      <nav class="hidden items-center gap-4 md:flex">
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

        <RouterLink v-else to="/profile" class="hover:underline">
          Профіль
        </RouterLink>
      </nav>
    </div>

    <div
      v-if="isMenuOpen"
      class="space-y-2 bg-green-700 px-4 py-3 md:hidden"
    >
      <RouterLink to="/catalog" class="block" @click="closeMenu">
        Каталог
      </RouterLink>

      <RouterLink to="/cart" class="block" @click="closeMenu">
        Кошик ({{ cartStore.totalItems }})
      </RouterLink>

      <RouterLink
        v-if="authStore.isLoggedIn"
        to="/my-orders"
        class="block"
        @click="closeMenu"
      >
        Мої замовлення
      </RouterLink>

      <RouterLink
        v-if="authStore.isAdmin"
        to="/admin"
        class="block"
        @click="closeMenu"
      >
        Адмін
      </RouterLink>

      <RouterLink
        v-if="!authStore.isLoggedIn"
        to="/login"
        class="block"
        @click="closeMenu"
      >
        Увійти
      </RouterLink>

      <RouterLink
        v-else
        to="/profile"
        class="block"
        @click="closeMenu"
      >
        Профіль
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useProductStore } from '../stores/productStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()

const isMenuOpen = ref(false)
const search = ref(productStore.searchQuery)

onMounted(() => {
  if (authStore.user) {
    cartStore.fetchCart(authStore.user.uid)
  }
})

watch(search, (value) => {
  productStore.setSearchQuery(value)
})

function goToCatalog() {
  router.push('/catalog')
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>