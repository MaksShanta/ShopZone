# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shop.spec.js >> відкривається головна сторінка
- Location: tests\e2e\shop.spec.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('ShopZone')
Expected: visible
Error: strict mode violation: getByText('ShopZone') resolved to 3 elements:
    1) <a href="/" aria-current="page" class="router-link-active router-link-exact-active text-2xl font-bold"> ShopZone </a> aka getByRole('link', { name: 'ShopZone' })
    2) <h1 class="mb-3 text-3xl font-bold"> Ласкаво просимо до ShopZone </h1> aka getByRole('heading', { name: 'Ласкаво просимо до ShopZone' })
    3) <p>© 2026 ShopZone — навчальний інтернет-магазин</p> aka getByText('© 2026 ShopZone')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('ShopZone')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "ShopZone" [ref=e6] [cursor=pointer]:
        - /url: /
      - link "Каталог" [ref=e7] [cursor=pointer]:
        - /url: /catalog
      - textbox "Я шукаю..." [ref=e8]
      - navigation [ref=e9]:
        - link "Кошик (0)" [ref=e10] [cursor=pointer]:
          - /url: /cart
        - link "Увійти" [ref=e11] [cursor=pointer]:
          - /url: /login
  - generic [ref=e12]:
    - complementary [ref=e13]:
      - heading "Категорії" [level=2] [ref=e14]
      - list [ref=e15]:
        - listitem [ref=e16] [cursor=pointer]: Усі
    - main [ref=e17]:
      - generic [ref=e19]:
        - heading "Ласкаво просимо до ShopZone" [level=1] [ref=e20]
        - paragraph [ref=e21]: Навчальний інтернет-магазин у стилі великого українського маркетплейсу.
        - link "Перейти до каталогу" [ref=e22] [cursor=pointer]:
          - /url: /catalog
  - contentinfo [ref=e23]:
    - paragraph [ref=e24]: © 2026 ShopZone — навчальний інтернет-магазин
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test('відкривається головна сторінка', async ({ page }) => {
  4  |   await page.goto('/')
  5  | 
  6  |   await expect(
  7  |     page.getByText('ShopZone')
> 8  |   ).toBeVisible()
     |     ^ Error: expect(locator).toBeVisible() failed
  9  | })
  10 | 
  11 | test('відкривається каталог', async ({ page }) => {
  12 |   await page.goto('/catalog')
  13 | 
  14 |   await expect(
  15 |     page.getByRole('heading', {
  16 |       name: 'Каталог товарів',
  17 |     })
  18 |   ).toBeVisible()
  19 | })
  20 | 
  21 | test('пошук товару працює', async ({ page }) => {
  22 |   await page.goto('/catalog')
  23 | 
  24 |   const searchInput =
  25 |     page.getByPlaceholder('Я шукаю...')
  26 | 
  27 |   await searchInput.fill('Samsung')
  28 |   await searchInput.press('Enter')
  29 | 
  30 |   await expect(
  31 |     page.getByText('Samsung')
  32 |   ).toBeVisible()
  33 | })
  34 | 
  35 | test('відкривається сторінка товару', async ({ page }) => {
  36 |   await page.goto('/catalog')
  37 | 
  38 |   const product =
  39 |     page.locator('a[href^="/product/"]').first()
  40 | 
  41 |   await product.click()
  42 | 
  43 |   await expect(
  44 |     page.getByRole('button', {
  45 |       name: /Додати в кошик/i,
  46 |     })
  47 |   ).toBeVisible()
  48 | })
```