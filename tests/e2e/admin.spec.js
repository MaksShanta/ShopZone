import { test, expect } from '@playwright/test'

test('неавторизований користувач не бачить адмінку', async ({ page }) => {
  await page.goto('/admin')

  await expect(page).toHaveURL(/login/)
})

test('неавторизований користувач не бачить сторінку товарів адмінки', async ({ page }) => {
  await page.goto('/admin/products')

  await expect(page).toHaveURL(/login/)
})