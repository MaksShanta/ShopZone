import { test, expect } from '@playwright/test'

test('відкривається головна сторінка', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByText('ShopZone')
  ).toBeVisible()
})

test('відкривається каталог', async ({ page }) => {
  await page.goto('/catalog')

  await expect(
    page.getByRole('heading', {
      name: 'Каталог товарів',
    })
  ).toBeVisible()
})

test('пошук товару працює', async ({ page }) => {
  await page.goto('/catalog')

  const searchInput =
    page.getByPlaceholder('Я шукаю...')

  await searchInput.fill('Samsung')
  await searchInput.press('Enter')

  await expect(
    page.getByText('Samsung')
  ).toBeVisible()
})

test('відкривається сторінка товару', async ({ page }) => {
  await page.goto('/catalog')

  const product =
    page.locator('a[href^="/product/"]').first()

  await product.click()

  await expect(
    page.getByRole('button', {
      name: /Додати в кошик/i,
    })
  ).toBeVisible()
})