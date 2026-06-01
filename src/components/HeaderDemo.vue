<template>
  <header class="bg-green-600 text-white shadow">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
      <button class="rounded bg-green-700 px-3 py-2 md:hidden">
        ☰
      </button>

      <span class="text-2xl font-bold">ShopZone</span>

      <button class="hidden rounded bg-green-700 px-4 py-2 md:block">
        Каталог
      </button>

      <input
        type="text"
        placeholder="Я шукаю..."
        class="min-w-0 flex-1 rounded px-4 py-2 text-black outline-none"
      />

      <nav class="hidden items-center gap-4 md:flex">
        <span>Кошик (2)</span>
        <span>Мої замовлення</span>
        <span>Профіль</span>
      </nav>
    </div>
  </header>
</template>