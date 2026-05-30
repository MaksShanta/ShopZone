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

    searchQuery: '',
    selectedCategory: 'Усі',
    sortBy: 'default',
  }),

  getters: {
    categories: (state) => {
      const uniqueCategories = state.products.map((product) => product.category)
      return ['Усі', ...new Set(uniqueCategories)]
    },

    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.selectedCategory !== 'Усі') {
        result = result.filter(
          (product) => product.category === state.selectedCategory
        )
      }

      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase()

        result = result.filter((product) =>
          product.title.toLowerCase().includes(query)
        )
      }

      if (state.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price)
      }

      if (state.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price)
      }

      if (state.sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating)
      }

      return result
    },
  },

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

    setSearchQuery(value) {
      this.searchQuery = value
    },

    setCategory(category) {
      this.selectedCategory = category
    },

    setSortBy(value) {
      this.sortBy = value
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