<template>
  <MainLayout />
</template>

<script setup>
import { onMounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>