import { defineStore } from 'pinia'
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  watchAuth,
  getUserProfile,
} from '../services/authService'
import { useNotificationStore } from './notificationStore'

function getFriendlyErrorMessage(error) {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Неправильний email або пароль'

    case 'auth/user-not-found':
      return 'Користувача не знайдено'

    case 'auth/wrong-password':
      return 'Неправильний пароль'

    case 'auth/email-already-in-use':
      return 'Користувач з таким email вже існує'

    case 'auth/weak-password':
      return 'Пароль має містити мінімум 6 символів'

    case 'auth/invalid-email':
      return 'Некоректний email'

    case 'auth/popup-closed-by-user':
      return 'Вікно входу через Google було закрито'

    default:
      return error.message
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.profile?.role === 'admin',
  },

  actions: {
    async register(email, password, name) {
      this.loading = true
      this.error = null

      try {
        this.user = await registerWithEmail(email, password, name)
        this.profile = await getUserProfile(this.user.uid)
      } catch (error) {
        this.error = getFriendlyErrorMessage(error)
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      const notificationStore = useNotificationStore()

      this.loading = true
      this.error = null

      try {
        this.user = await loginWithEmail(email, password)
        this.profile = await getUserProfile(this.user.uid)

        notificationStore.show('Вхід виконано успішно')
      } catch (error) {
        this.error = error.message
        notificationStore.show('Помилка входу', 'error')
      } finally {
        this.loading = false
      }
    },

    async googleLogin() {
      this.loading = true
      this.error = null

      try {
        this.user = await loginWithGoogle()
        this.profile = await getUserProfile(this.user.uid)
      } catch (error) {
        this.error = getFriendlyErrorMessage(error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await logoutUser()
      this.user = null
      this.profile = null
    },

    initAuth() {
      watchAuth(async (user) => {
        this.user = user

        if (user) {
          this.profile = await getUserProfile(user.uid)
        } else {
          this.profile = null
        }
      })
    },
  },
})