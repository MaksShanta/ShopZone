import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import ProductPage from '../pages/ProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },

  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router