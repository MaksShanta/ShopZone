<template>
  <section>
    <h1 class="mb-4 text-2xl font-bold">Кошик</h1>

    <div v-if="!authStore.isLoggedIn" class="rounded bg-white p-6 shadow">
      <p class="mb-3">Щоб користуватися кошиком, потрібно увійти.</p>

      <RouterLink
        to="/login"
        class="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Увійти
      </RouterLink>
    </div>

    <div v-else-if="cartStore.loading" class="rounded bg-white p-6 shadow">
      Завантаження кошика...
    </div>

    <div v-else-if="cartStore.error" class="rounded bg-red-100 p-4 text-red-700">
      {{ cartStore.error }}
    </div>

    <div v-else-if="cartStore.items.length === 0" class="rounded bg-white p-6 shadow">
      <p class="mb-3">Ваш кошик порожній.</p>

      <RouterLink to="/catalog" class="text-green-600 hover:underline">
        Перейти до каталогу
      </RouterLink>
    </div>

    <div v-else class="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div class="space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex gap-4 rounded bg-white p-4 shadow"
        >
          <img
            :src="item.imageUrl"
            :alt="item.title"
            class="h-24 w-24 rounded object-cover"
          />

          <div class="flex-1">
            <h2 class="font-bold">
              {{ item.title }}
            </h2>

            <p class="mt-2 text-green-600 font-bold">
              {{ item.price }} грн
            </p>

            <div class="mt-3 flex items-center gap-2">
              <button
                @click="decreaseQuantity(item)"
                class="rounded border px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>

              <span>{{ item.quantity }}</span>

              <button
                @click="increaseQuantity(item)"
                class="rounded border px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            @click="removeItem(item.id)"
            class="h-fit rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
          >
            Видалити
          </button>
        </div>
      </div>

      <aside class="h-fit rounded bg-white p-4 shadow">
        <h2 class="mb-3 text-xl font-bold">Разом</h2>

        <p class="mb-2">
          Товарів: {{ cartStore.totalItems }}
        </p>

        <p class="mb-4 text-2xl font-bold text-green-600">
          {{ cartStore.totalPrice }} грн
        </p>

        <RouterLink
          to="/checkout"
          class="block rounded bg-green-600 py-2 text-center text-white hover:bg-green-700"
        >
          Оформити замовлення
        </RouterLink>
      </aside>
    </div>
  </section>
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