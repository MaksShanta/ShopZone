# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shop.spec.js >> пошук товару працює
- Location: tests\e2e\shop.spec.js:21:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Samsung')
Expected: visible
Error: strict mode violation: getByText('Samsung') resolved to 2 elements:
    1) <h2 class="line-clamp-2 font-bold hover:text-green-600">Смартфон Samsung Galaxy A55</h2> aka getByRole('link', { name: 'Смартфон Samsung Galaxy A55' }).first()
    2) <h2 class="line-clamp-2 font-bold hover:text-green-600">Смартфон Samsung Galaxy A55</h2> aka getByRole('link', { name: 'Смартфон Samsung Galaxy A55' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Samsung')

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
      - textbox "Я шукаю..." [active] [ref=e8]: Samsung
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
        - listitem [ref=e17] [cursor=pointer]: Прикраси та аксесуари
        - listitem [ref=e18] [cursor=pointer]: Туризм та EDC
        - listitem [ref=e19] [cursor=pointer]: Ігрова техніка
        - listitem [ref=e20] [cursor=pointer]: Аудіо
        - listitem [ref=e21] [cursor=pointer]: Ноутбуки
        - listitem [ref=e22] [cursor=pointer]: Смартфони
    - main [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - heading "Каталог товарів" [level=1] [ref=e28]
            - paragraph [ref=e29]: "Знайдено товарів: 2"
          - combobox [ref=e30]:
            - option "За замовчуванням" [selected]
            - option "Спочатку дешевші"
            - option "Спочатку дорожчі"
            - option "За рейтингом"
        - generic [ref=e31]:
          - generic [ref=e32]:
            - link "Смартфон Samsung Galaxy A55 Смартфон Samsung Galaxy A55" [ref=e33] [cursor=pointer]:
              - /url: /product/oxtSuLaWwqwb81ezg4TX
              - img "Смартфон Samsung Galaxy A55" [ref=e34]
              - heading "Смартфон Samsung Galaxy A55" [level=2] [ref=e35]
            - paragraph [ref=e36]: Смартфони
            - generic [ref=e37]:
              - generic [ref=e38]: ★
              - generic [ref=e39]: "4.8"
            - generic [ref=e40]:
              - paragraph [ref=e41]: 17999 грн
              - paragraph [ref=e42]: 15999 грн
            - paragraph [ref=e43]: Є в наявності
            - button "Додати в кошик" [ref=e44]
          - generic [ref=e45]:
            - link "Смартфон Samsung Galaxy A55 Смартфон Samsung Galaxy A55" [ref=e46] [cursor=pointer]:
              - /url: /product/LkgWr8PUWudpvqbAKZyH
              - img "Смартфон Samsung Galaxy A55" [ref=e47]
              - heading "Смартфон Samsung Galaxy A55" [level=2] [ref=e48]
            - paragraph [ref=e49]: Смартфони
            - generic [ref=e50]:
              - generic [ref=e51]: ★
              - generic [ref=e52]: "4.8"
            - generic [ref=e53]:
              - paragraph [ref=e54]: 17999 грн
              - paragraph [ref=e55]: 15999 грн
            - paragraph [ref=e56]: Є в наявності
            - button "Додати в кошик" [ref=e57]
  - contentinfo [ref=e58]:
    - paragraph [ref=e59]: © 2026 ShopZone — навчальний інтернет-магазин
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
  8  |   ).toBeVisible()
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
> 32 |   ).toBeVisible()
     |     ^ Error: expect(locator).toBeVisible() failed
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