<template>
  <section class="rounded bg-white p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">Профіль користувача</h1>

    <div v-if="authStore.isLoggedIn">
      <p>
        <strong>Ім’я:</strong>
        {{ authStore.profile?.name || 'Не вказано' }}
      </p>

      <p>
        <strong>Email:</strong>
        {{ authStore.user?.email }}
      </p>

      <p>
        <strong>Роль:</strong>
        {{ authStore.profile?.role }}
      </p>

      <button
        @click="handleLogout"
        class="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Вийти
      </button>
    </div>

    <div v-else>
      <p>Ви ще не увійшли в акаунт.</p>

      <RouterLink to="/login" class="text-green-600">
        Перейти до входу
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}
</script>