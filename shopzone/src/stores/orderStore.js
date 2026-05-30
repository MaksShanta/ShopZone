import { defineStore } from 'pinia'
import {
  createOrder,
  getUserOrders,
  getOrderItems,
} from '../services/orderService'

import { useCartStore } from './cartStore'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    orderItems: {},
    loading: false,
    error: null,
    successMessage: null,
  }),

  actions: {
    async makeOrder(userId, userInfo, cartItems, totalPrice) {
      this.loading = true
      this.error = null
      this.successMessage = null

      try {
        const orderId = await createOrder(
          userId,
          userInfo,
          cartItems,
          totalPrice
        )

        const cartStore = useCartStore()
        await cartStore.clearUserCart(userId)

        this.successMessage = `Замовлення №${orderId} успішно створено`
        return orderId
      } catch (error) {
        this.error = error.message
        return null
      } finally {
        this.loading = false
      }
    },

    async fetchUserOrders(userId) {
      this.loading = true
      this.error = null

      try {
        this.orders = await getUserOrders(userId)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchOrderItems(orderId) {
      this.error = null

      try {
        const items = await getOrderItems(orderId)

        this.orderItems[orderId] = items
      } catch (error) {
        this.error = error.message
      }
    },
  },
})