import { defineStore } from 'pinia'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        this.products = await getProducts()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      this.loading = true
      this.error = null

      try {
        this.currentProduct = await getProductById(id)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addProduct(productData) {
      this.loading = true
      this.error = null

      try {
        await createProduct(productData)
        await this.fetchProducts()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async editProduct(id, productData) {
      this.loading = true
      this.error = null

      try {
        await updateProduct(id, productData)
        await this.fetchProducts()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async removeProduct(id) {
      this.loading = true
      this.error = null

      try {
        await deleteProduct(id)
        await this.fetchProducts()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})