import { defineStore } from 'pinia'
import {
  getCartItems,
  addProductToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from '../services/cartService'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },

  actions: {
    async fetchCart(userId) {
      this.loading = true
      this.error = null

      try {
        this.items = await getCartItems(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addToCart(userId, product) {
      this.loading = true
      this.error = null

      try {
        await addProductToCart(userId, product)
        await this.fetchCart(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async changeQuantity(userId, cartItemId, quantity) {
      if (quantity < 1) return

      this.loading = true
      this.error = null

      try {
        await updateCartItemQuantity(cartItemId, quantity)
        await this.fetchCart(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async removeItem(userId, cartItemId) {
      this.loading = true
      this.error = null

      try {
        await removeCartItem(cartItemId)
        await this.fetchCart(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async clearUserCart(userId) {
      this.loading = true
      this.error = null

      try {
        await clearCart(userId)
        this.items = []
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})