<template>
  <div class="flex gap-4 rounded bg-white p-4 shadow">
    <img
      :src="item.imageUrl"
      :alt="item.title"
      class="h-24 w-24 rounded object-cover"
    />

    <div class="flex-1">
      <h2 class="font-bold">
        {{ item.title }}
      </h2>

      <p class="mt-2 font-bold text-green-600">
        {{ item.price }} грн
      </p>

      <p class="mt-1 text-sm text-gray-500">
        Кількість: {{ item.quantity }}
      </p>
    </div>

    <p class="font-bold">
      {{ item.price * item.quantity }} грн
    </p>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>