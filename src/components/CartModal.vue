<template>
  <div
    v-if="uiStore.isCartModalOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
  >
    <div class="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-5">
        <h2 class="text-2xl font-bold">Кошик</h2>

        <button
          @click="uiStore.closeCartModal()"
          class="text-3xl text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>

      <div class="p-5">
        <div v-if="!authStore.isLoggedIn" class="rounded bg-gray-50 p-5">
          <p class="mb-4">Щоб користуватися кошиком, потрібно увійти.</p>

          <button
            @click="openAuth"
            class="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Увійти
          </button>
        </div>

        <div v-else-if="cartStore.loading">
          Завантаження кошика...
        </div>

        <div v-else-if="cartStore.items.length === 0" class="rounded bg-gray-50 p-5">
          Ваш кошик порожній.
        </div>

        <div v-else>
          <div class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex flex-wrap items-center gap-4 rounded border p-4"
            >
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="h-24 w-24 rounded object-contain"
              />

              <div class="min-w-[220px] flex-1">
                <h3 class="font-bold">
                  {{ item.title }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Продавець: ShopZone
                </p>
              </div>

              <div class="flex items-center gap-3">
                <button
                  @click="decreaseQuantity(item)"
                  class="rounded border px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>

                <span class="w-8 text-center">
                  {{ item.quantity }}
                </span>

                <button
                  @click="increaseQuantity(item)"
                  class="rounded border px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <div class="w-32 text-right">
                <p class="text-xl font-bold text-red-600">
                  {{ item.price * item.quantity }} грн
                </p>
              </div>

              <button
                @click="removeItem(item.id)"
                class="text-2xl text-gray-500 hover:text-red-600"
              >
                ⋮
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button
              @click="uiStore.closeCartModal()"
              class="rounded border px-5 py-3 hover:bg-gray-100"
            >
              Продовжити покупки
            </button>

            <div class="rounded border border-green-500 bg-green-50 p-4">
              <div class="flex flex-wrap items-center gap-5">
                <p class="text-3xl font-bold">
                  {{ cartStore.totalPrice }} грн
                </p>

                <RouterLink
                  to="/checkout"
                  @click="uiStore.closeCartModal()"
                  class="rounded bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
                >
                  Оформити замовлення
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { useUiStore } from '../stores/uiStore'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const uiStore = useUiStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

function openAuth() {
  uiStore.closeCartModal()
  uiStore.openAuthModal()
}

function increaseQuantity(item) {
  cartStore.changeQuantity(
    authStore.user.uid,
    item.id,
    item.quantity + 1
  )
}

function decreaseQuantity(item) {
  if (item.quantity <= 1) return

  cartStore.changeQuantity(
    authStore.user.uid,
    item.id,
    item.quantity - 1
  )
}

function removeItem(itemId) {
  cartStore.removeItem(authStore.user.uid, itemId)
}
</script>