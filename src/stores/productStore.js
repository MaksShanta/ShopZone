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
    selectedCategories: [],
    sortBy: 'default',
    onlyDiscounts: false,
    onlyTopProducts: false,
  }),

  getters: {
    categories: (state) => {
      const uniqueCategories = state.products.map((product) => product.category)
      return ['Усі', ...new Set(uniqueCategories)]
    },

    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.selectedCategories.length > 0) {
        result = result.filter((product) =>
          state.selectedCategories.includes(product.category)
        )
      } else if (state.selectedCategory !== 'Усі') {
        result = result.filter(
          (product) => product.category === state.selectedCategory
        )
      }

      if (state.onlyDiscounts) {
        result = result.filter(
          (product) => product.oldPrice && product.oldPrice > product.price
        )
      }

      if (state.onlyTopProducts) {
        result = result.filter((product) => Number(product.reviews || 0) >= 30)
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
        result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
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
      this.selectedCategories = []
      this.onlyDiscounts = false
      this.onlyTopProducts = false
    },

    setSortBy(value) {
      this.sortBy = value
    },

    showDiscounts() {
      this.onlyDiscounts = true
      this.onlyTopProducts = false
      this.selectedCategory = 'Усі'
      this.selectedCategories = []
      this.searchQuery = ''
      this.sortBy = 'default'
    },

    showCategory(category) {
      this.onlyDiscounts = false
      this.onlyTopProducts = false
      this.selectedCategory = category
      this.selectedCategories = []
      this.searchQuery = ''
      this.sortBy = 'default'
    },

    showCategories(categories) {
      this.onlyDiscounts = false
      this.onlyTopProducts = false
      this.selectedCategory = 'Усі'
      this.selectedCategories = categories
      this.searchQuery = ''
      this.sortBy = 'default'
    },

    showTopProducts() {
      this.onlyTopProducts = true
      this.onlyDiscounts = false
      this.selectedCategory = 'Усі'
      this.selectedCategories = []
      this.searchQuery = ''
      this.sortBy = 'rating'
    },

    resetFilters() {
      this.onlyDiscounts = false
      this.onlyTopProducts = false
      this.selectedCategory = 'Усі'
      this.selectedCategories = []
      this.searchQuery = ''
      this.sortBy = 'default'
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