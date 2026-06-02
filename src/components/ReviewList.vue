<template>
  <div class="mt-6">
    <h2 class="mb-4 text-xl font-bold">
      Відгуки покупців
    </h2>

    <div v-if="reviews.length === 0" class="rounded bg-gray-50 p-4 text-gray-600">
      Відгуків ще немає. Будьте першим!
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="rounded border p-4"
      >
        <div class="mb-2 flex items-center justify-between">
          <h3 class="font-bold">
            {{ review.userName }}
          </h3>

          <span class="text-yellow-500">
            ★ {{ review.rating }}
          </span>
        </div>

        <p class="text-gray-700">
          {{ review.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true,
  },
})
</script>