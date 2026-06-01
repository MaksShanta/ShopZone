<template>
  <section>
    <h1 class="mb-4 text-2xl font-bold">Оформлення замовлення</h1>

    <div v-if="!authStore.isLoggedIn" class="rounded bg-white p-6 shadow">
      <p class="mb-3">Щоб оформити замовлення, потрібно увійти.</p>

      <RouterLink
        to="/login"
        class="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Увійти
      </RouterLink>
    </div>

    <div v-else-if="cartStore.items.length === 0" class="rounded bg-white p-6 shadow">
      <p class="mb-3">Ваш кошик порожній.</p>

      <RouterLink to="/catalog" class="text-green-600 hover:underline">
        Перейти до каталогу
      </RouterLink>
    </div>

    <div v-else class="grid gap-4 lg:grid-cols-[1fr_320px]">
      <form
        @submit.prevent="handleSubmit"
        class="space-y-4 rounded bg-white p-6 shadow"
      >
        <div>
          <label class="mb-1 block font-medium">Ім’я та прізвище</label>
          <input
            v-model="userInfo.name"
            type="text"
            class="w-full rounded border px-3 py-2"
            placeholder="Максим Шанта"
            required
          />
        </div>

        <div>
          <label class="mb-1 block font-medium">Телефон</label>
          <input
            v-model="userInfo.phone"
            type="tel"
            class="w-full rounded border px-3 py-2"
            placeholder="+380..."
            required
          />
        </div>

        <div>
          <label class="mb-1 block font-medium">Місто</label>
          <input
            v-model="userInfo.city"
            type="text"
            class="w-full rounded border px-3 py-2"
            placeholder="Ужгород"
            required
          />
        </div>

        <div>
          <label class="mb-1 block font-medium">Адреса доставки</label>
          <input
            v-model="userInfo.address"
            type="text"
            class="w-full rounded border px-3 py-2"
            placeholder="Відділення Нової пошти / адреса"
            required
          />
        </div>

        <p v-if="orderStore.error" class="text-red-600">
          {{ orderStore.error }}
        </p>

        <button
          type="submit"
          class="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
          :disabled="orderStore.loading"
        >
          {{ orderStore.loading ? 'Створення замовлення...' : 'Підтвердити замовлення' }}
        </button>
      </form>

      <aside class="h-fit rounded bg-white p-4 shadow">
        <h2 class="mb-3 text-xl font-bold">Ваше замовлення</h2>

        <div class="mb-3 space-y-2">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex justify-between gap-2 text-sm"
          >
            <span>{{ item.title }} × {{ item.quantity }}</span>
            <span>{{ item.price * item.quantity }} грн</span>
          </div>
        </div>

        <hr class="my-3" />

        <p class="text-2xl font-bold text-green-600">
          {{ cartStore.totalPrice }} грн
        </p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const userInfo = reactive({
  name: '',
  phone: '',
  city: '',
  address: '',
})

onMounted(async () => {
  if (authStore.user) {
    await cartStore.fetchCart(authStore.user.uid)

    userInfo.name = authStore.profile?.name || ''
  }
})

async function handleSubmit() {
  const orderId = await orderStore.makeOrder(
    authStore.user.uid,
    userInfo,
    cartStore.items,
    cartStore.totalPrice
  )

  if (orderId) {
    router.push('/my-orders')
  }
}
</script>