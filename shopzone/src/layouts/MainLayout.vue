<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <div class="mx-auto flex max-w-7xl gap-4 px-4 py-4">
      <Sidebar />

      <main class="min-w-0 flex-1">
        <RouterView />
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
</script>