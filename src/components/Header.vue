<template>
  <header class="sticky top-0 z-50 bg-[#221f1f] text-white shadow">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <button
        class="rounded px-3 py-2 text-2xl hover:bg-white/10 md:hidden"
        @click="isMenuOpen = !isMenuOpen"
      >
        ☰
      </button>

      <RouterLink to="/" class="text-2xl font-bold text-white">
        ShopZone
      </RouterLink>

      <RouterLink
        to="/catalog"
        class="hidden rounded bg-green-600 px-4 py-2 font-medium hover:bg-green-700 md:block"
      >
        ☰ Каталог
      </RouterLink>

      <div class="flex min-w-0 flex-1 overflow-hidden rounded bg-white">
        <input
          v-model="search"
          @keyup.enter="goToCatalog"
          type="text"
          placeholder="Я шукаю..."
          class="min-w-0 flex-1 bg-white px-4 py-2 text-black outline-none placeholder:text-gray-500"
        />

        <button
          @click="goToCatalog"
          class="bg-green-600 px-5 font-medium text-white hover:bg-green-700"
        >
          Знайти
        </button>
      </div>

      <nav class="hidden items-center gap-4 text-sm md:flex">
        <button
          @click="openCart"
          class="hover:text-green-400"
        >
          🛒 Кошик ({{ cartStore.totalItems }})
        </button>

        <RouterLink
          v-if="authStore.isLoggedIn"
          to="/my-orders"
          class="hover:text-green-400"
        >
          📦 Замовлення
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin"
          class="hover:text-green-400"
        >
          ⚙ Адмін
        </RouterLink>

        <button
          @click="uiStore.openAuthModal()"
          class="hover:text-green-400"
        >
          👤 {{ authStore.isLoggedIn ? 'Профіль' : 'Увійти' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useProductStore } from '../stores/productStore'
import { useUiStore } from '../stores/uiStore'

const router = useRouter()

const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const uiStore = useUiStore()

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

async function openCart() {
  if (authStore.user) {
    await cartStore.fetchCart(authStore.user.uid)
  }

  uiStore.openCartModal()
}
</script>