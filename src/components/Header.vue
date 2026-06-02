<template>
  <header class="sticky top-0 z-50 bg-[#221f1f] text-white shadow">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <button
        class="rounded px-3 py-2 text-2xl hover:bg-white/10"
        @click="isMenuOpen = true"
      >
        ☰
      </button>

      <RouterLink to="/" class="flex items-center">
        <img
          src="../assets/images/shopzone-logo.png"
          alt="ShopZone"
          class="h-16 w-auto object-contain"
        />
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
        <button @click="openCart" class="hover:text-green-400">
          🛒 Кошик ({{ cartStore.totalItems }})
        </button>

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

    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-[120] bg-black/60"
      @click.self="isMenuOpen = false"
    >
      <aside class="h-full w-[360px] max-w-[90vw] overflow-y-auto bg-white text-black shadow-xl">
        <div class="flex items-center justify-between bg-[#221f1f] p-4 text-white">
          <RouterLink to="/" @click="closeMenu" class="flex items-center">
            <img
              src="../assets/images/shopzone-logo.png"
              alt="ShopZone"
              class="h-12 w-auto object-contain"
            />
          </RouterLink>

          <button
            class="text-3xl"
            @click="closeMenu"
          >
            ×
          </button>
        </div>

        <div class="p-4">
          <RouterLink
            to="/catalog"
            @click="closeMenu"
            class="flex items-center justify-center gap-2 rounded bg-green-600 px-4 py-3 font-bold text-white hover:bg-green-700"
          >
            ⬚ Каталог товарів
          </RouterLink>
        </div>

        <div class="border-t">
          <button
            @click="openCartFromMenu"
            class="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-100"
          >
            🛒 <span>Кошик</span>
          </button>

          <RouterLink
            v-if="authStore.isLoggedIn"
            to="/my-orders"
            @click="closeMenu"
            class="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
          >
            📦 <span>Мої замовлення</span>
          </RouterLink>

          <button
            @click="openAuthFromMenu"
            class="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-gray-100"
          >
            👤
            <span>{{ authStore.isLoggedIn ? 'Профіль' : 'Увійти в особистий кабінет' }}</span>
          </button>

          <RouterLink
            v-if="authStore.isAdmin"
            to="/admin"
            @click="closeMenu"
            class="flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
          >
            ⚙ <span>Адмін-панель</span>
          </RouterLink>
        </div>

        <div class="border-t p-5">
          <h3 class="mb-3 font-bold text-gray-500">
            Категорії
          </h3>

          <RouterLink
            v-for="category in productStore.categories"
            :key="category"
            to="/catalog"
            @click="selectCategory(category)"
            class="block rounded px-3 py-2 hover:bg-green-50 hover:text-green-600"
          >
            {{ category }}
          </RouterLink>
        </div>
      </aside>
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

  if (productStore.products.length === 0) {
    productStore.fetchProducts()
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

async function openCart() {
  if (authStore.user) {
    await cartStore.fetchCart(authStore.user.uid)
  }

  uiStore.openCartModal()
}

async function openCartFromMenu() {
  closeMenu()
  await openCart()
}

function openAuthFromMenu() {
  closeMenu()
  uiStore.openAuthModal()
}

function selectCategory(category) {
  productStore.setCategory(category)
  closeMenu()
}
</script>