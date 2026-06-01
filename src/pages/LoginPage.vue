<template>
  <section class="mx-auto max-w-md rounded bg-white p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">Вхід</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="mb-1 block font-medium">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full rounded border px-3 py-2"
          placeholder="example@gmail.com"
        />
      </div>

      <div>
        <label class="mb-1 block font-medium">Пароль</label>
        <input
          v-model="password"
          type="password"
          class="w-full rounded border px-3 py-2"
          placeholder="Ваш пароль"
        />
      </div>

      <p v-if="authStore.error" class="text-red-600">
        {{ authStore.error }}
      </p>

      <button
        type="submit"
        class="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
      >
        {{ authStore.loading ? 'Завантаження...' : 'Увійти' }}
      </button>
    </form>

    <button
      @click="handleGoogleLogin"
      class="mt-3 w-full rounded border py-2 hover:bg-gray-100"
    >
      Увійти через Google
    </button>

    <RouterLink to="/register" class="mt-4 block text-center text-green-600">
      Немає акаунта? Зареєструватися
    </RouterLink>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  await authStore.login(email.value, password.value)

  if (authStore.isLoggedIn) {
    router.push('/profile')
  }
}

async function handleGoogleLogin() {
  await authStore.googleLogin()

  if (authStore.isLoggedIn) {
    router.push('/profile')
  }
}
</script>