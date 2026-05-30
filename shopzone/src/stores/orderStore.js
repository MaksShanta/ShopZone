import { defineStore } from 'pinia'
import {
  createOrder,
  getUserOrders,
  getOrderItems,
} from '../services/orderService'

import { useCartStore } from './cartStore'
import { useNotificationStore } from './notificationStore'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    orderItems: {},
    loading: false,
    error: null,
  }),

  actions: {
    async makeOrder(userId, userInfo, cartItems, totalPrice) {
      const notificationStore = useNotificationStore()

      this.loading = true
      this.error = null

      try {
        const orderId = await createOrder(
          userId,
          userInfo,
          cartItems,
          totalPrice
        )

        const cartStore = useCartStore()
        await cartStore.clearUserCart(userId)

        notificationStore.show('Замовлення успішно створено')

        return orderId
      } catch (error) {
        this.error = error.message
        notificationStore.show('Не вдалося створити замовлення', 'error')

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