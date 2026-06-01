<template>
  <div class="fixed right-4 top-20 z-50 space-y-3">
    <div
      v-for="item in notificationStore.notifications"
      :key="item.id"
      class="rounded px-4 py-3 text-white shadow-lg"
      :class="{
        'bg-green-600': item.type === 'success',
        'bg-red-600': item.type === 'error',
        'bg-blue-600': item.type === 'info',
      }"
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()
</script>