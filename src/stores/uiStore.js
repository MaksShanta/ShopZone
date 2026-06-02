import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isCartModalOpen: false,
    isAuthModalOpen: false,
  }),

  actions: {
    openCartModal() {
      this.isCartModalOpen = true
    },

    closeCartModal() {
      this.isCartModalOpen = false
    },

    openAuthModal() {
      this.isAuthModalOpen = true
    },

    closeAuthModal() {
      this.isAuthModalOpen = false
    },
  },
})