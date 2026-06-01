import { test, expect } from '@playwright/test'

test('відкривається сторінка входу', async ({ page }) => {
  await page.goto('/login')

  await expect(
    page.getByRole('heading', { name: 'Вхід' })
  ).toBeVisible()
})

test('відкривається сторінка реєстрації', async ({ page }) => {
  await page.goto('/register')

  await expect(
    page.getByRole('heading', { name: 'Реєстрація' })
  ).toBeVisible()
})

test('є кнопка Google Login', async ({ page }) => {
  await page.goto('/login')

  await expect(
    page.getByRole('button', { name: 'Увійти через Google' })
  ).toBeVisible()
})