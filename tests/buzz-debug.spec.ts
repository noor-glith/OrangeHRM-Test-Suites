import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { BuzzPage } from '../pages/BuzzPage'

test('debug buzz page', async ({ page }) => {
  const login = new LoginPage(page)
  const buzz = new BuzzPage(page)

  await login.goto()
  await login.login('Admin', 'admin123')
  await buzz.openBuzz()

  // Log heading elements
  const headings = await page.locator('h1, h2, h3').allTextContents()
  console.log('Headings:', headings)

  // Log some body snippet
  const body = await page.locator('body').innerText()
  console.log('Body snippet:', body.slice(0, 600))

  // Check if 'Latest Posts' exists
  const hasLatest = await page
    .getByText('Latest Posts', { exact: false })
    .count()
  console.log('Latest Posts count:', hasLatest)
})
