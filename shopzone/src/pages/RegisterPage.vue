<template>
  <section class="mx-auto max-w-md rounded bg-white p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">Реєстрація</h1>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="mb-1 block font-medium">Ім’я</label>
        <input
          v-model="name"
          type="text"
          class="w-full rounded border px-3 py-2"
          placeholder="Максим"
        />
      </div>

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
          placeholder="Мінімум 6 символів"
        />
      </div>

      <p v-if="authStore.error" class="text-red-600">
        {{ authStore.error }}
      </p>

      <button
        type="submit"
        class="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
      >
        {{ authStore.loading ? 'Створення...' : 'Зареєструватися' }}
      </button>
    </form>

    <RouterLink to="/login" class="mt-4 block text-center text-green-600">
      Уже є акаунт? Увійти
    </RouterLink>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  await authStore.register(email.value, password.value, name.value)

  if (authStore.isLoggedIn) {
    router.push('/profile')
  }
}
</script>