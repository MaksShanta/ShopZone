import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CatalogPage from '../pages/CatalogPage.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router