<template>
  <section>
    <h1 class="mb-4 text-2xl font-bold">Мої замовлення</h1>

    <div v-if="!authStore.isLoggedIn" class="rounded bg-white p-6 shadow">
      <p class="mb-3">Щоб переглядати замовлення, потрібно увійти.</p>

      <RouterLink
        to="/login"
        class="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Увійти
      </RouterLink>
    </div>

    <div v-else-if="orderStore.loading" class="rounded bg-white p-6 shadow">
      Завантаження замовлень...
    </div>

    <div v-else-if="orderStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ orderStore.error }}
    </div>

    <div v-else-if="orderStore.orders.length === 0" class="rounded bg-white p-6 shadow">
      У вас ще немає замовлень.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orderStore.orders"
        :key="order.id"
        class="rounded bg-white p-4 shadow"
      >
        <div class="flex flex-wrap justify-between gap-3">
          <div>
            <h2 class="font-bold">
              Замовлення №{{ order.id }}
            </h2>

            <p class="text-sm text-gray-500">
              Статус: {{ order.status }}
            </p>
          </div>

          <p class="text-xl font-bold text-green-600">
            {{ order.totalPrice }} грн
          </p>
        </div>

        <button
          @click="loadOrderItems(order.id)"
          class="mt-3 rounded border px-4 py-2 hover:bg-gray-100"
        >
          Показати товари
        </button>

        <div
          v-if="orderStore.orderItems[order.id]"
          class="mt-4 space-y-2"
        >
          <div
            v-for="item in orderStore.orderItems[order.id]"
            :key="item.id"
            class="flex items-center gap-3 border-t pt-3"
          >
            <img
              :src="item.imageUrl"
              :alt="item.title"
              class="h-16 w-16 rounded object-cover"
            />

            <div class="flex-1">
              <h3 class="font-medium">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">
                {{ item.quantity }} × {{ item.price }} грн
              </p>
            </div>

            <p class="font-bold">
              {{ item.total }} грн
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useOrderStore } from '../stores/orderStore'

const authStore = useAuthStore()
const orderStore = useOrderStore()

onMounted(() => {
  if (authStore.user) {
    orderStore.fetchUserOrders(authStore.user.uid)
  }
})

function loadOrderItems(orderId) {
  orderStore.fetchOrderItems(orderId)
}
</script>