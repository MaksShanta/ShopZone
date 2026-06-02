import { defineStore } from 'pinia'
import {
  addReview,
  getReviewsByProduct,
} from '../services/reviewService'

import { useNotificationStore } from './notificationStore'

export const useReviewStore = defineStore('reviews', {
  state: () => ({
    reviews: [],
    loading: false,
    error: null,
  }),

  getters: {
    reviewsCount: (state) => {
      return state.reviews.length
    },

    averageRating: (state) => {
      if (state.reviews.length === 0) {
        return 0
      }

      const sum = state.reviews.reduce((total, review) => {
        return total + Number(review.rating)
      }, 0)

      return (sum / state.reviews.length).toFixed(1)
    },
  },

  actions: {
    async fetchReviews(productId) {
      this.loading = true
      this.error = null

      try {
        this.reviews = await getReviewsByProduct(productId)
      } catch (error) {
        this.error = error.message
        console.error('Помилка завантаження відгуків:', error)
      } finally {
        this.loading = false
      }
    },

    async createReview(productId, user, profile, reviewData) {
      const notificationStore = useNotificationStore()

      this.loading = true
      this.error = null

      try {
        await addReview(productId, user, profile, reviewData)

        await this.fetchReviews(productId)

        notificationStore.show('Відгук додано')
      } catch (error) {
        this.error = error.message
        console.error('Помилка додавання відгуку:', error)
        notificationStore.show(error.message || 'Не вдалося додати відгук', 'error')
      } finally {
        this.loading = false
      }
    },
  },
})