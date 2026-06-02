<template>
  <div
    v-if="uiStore.isAuthModalOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
  >
    <div class="w-full max-w-md rounded bg-white shadow-xl">
      <div class="flex items-center justify-between border-b p-5">
        <h2 class="text-2xl font-bold">
          {{ authStore.isLoggedIn ? 'Профіль' : isRegister ? 'Реєстрація' : 'Вхід' }}
        </h2>

        <button
          @click="uiStore.closeAuthModal()"
          class="text-3xl text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>

      <div class="p-5">
        <div v-if="authStore.isLoggedIn">
          <p class="mb-2">
            <strong>Ім’я:</strong>
            {{ authStore.profile?.name || 'Не вказано' }}
          </p>

          <p class="mb-2">
            <strong>Email:</strong>
            {{ authStore.user?.email }}
          </p>

          <p class="mb-5">
            <strong>Роль:</strong>
            {{ authStore.profile?.role }}
          </p>

          <button
            @click="handleLogout"
            class="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700"
          >
            Вийти
          </button>
        </div>

        <form
          v-else
          @submit.prevent="isRegister ? handleRegister() : handleLogin()"
          class="space-y-4"
        >
          <input
            v-if="isRegister"
            v-model="name"
            type="text"
            placeholder="Ім’я"
            class="w-full rounded border px-3 py-2"
          />

          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full rounded border px-3 py-2"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="w-full rounded border px-3 py-2"
          />

          <p v-if="authStore.error" class="text-red-600">
            {{ authStore.error }}
          </p>

          <button
            type="submit"
            class="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
          >
            {{ authStore.loading ? 'Завантаження...' : isRegister ? 'Зареєструватися' : 'Увійти' }}
          </button>

          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full rounded border py-2 hover:bg-gray-100"
          >
            Увійти через Google
          </button>

          <button
            type="button"
            @click="isRegister = !isRegister"
            class="w-full text-green-600 hover:underline"
          >
            {{ isRegister ? 'Уже є акаунт? Увійти' : 'Немає акаунта? Зареєструватися' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useUiStore } from '../stores/uiStore'
import { useAuthStore } from '../stores/authStore'

const uiStore = useUiStore()
const authStore = useAuthStore()

const isRegister = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')

async function handleLogin() {
  await authStore.login(email.value, password.value)

  if (authStore.isLoggedIn) {
    uiStore.closeAuthModal()
  }
}

async function handleRegister() {
  await authStore.register(email.value, password.value, name.value)

  if (authStore.isLoggedIn) {
    uiStore.closeAuthModal()
  }
}

async function handleGoogleLogin() {
  await authStore.googleLogin()

  if (authStore.isLoggedIn) {
    uiStore.closeAuthModal()
  }
}

async function handleLogout() {
  await authStore.logout()
  uiStore.closeAuthModal()
}
</script>