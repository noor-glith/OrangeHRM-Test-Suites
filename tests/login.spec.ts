import { test, expect } from '@playwright/test'

test.describe('OrangeHRM login', () => {
  test('logs in and shows dashboard', async ({ page }) => {
    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      {
        waitUntil: 'networkidle',
        timeout: 60000,
      },
    )

    const username = page.getByRole('textbox', { name: 'Username' })
    const password = page.getByRole('textbox', { name: 'Password' })
    const loginBtn = page.getByRole('button', { name: 'Login' })

    await expect(username).toBeVisible()
    await username.fill('Admin')

    await expect(password).toBeVisible()
    await password.fill('admin123')

    await expect(loginBtn).toBeEnabled()
    await loginBtn.click()

    await expect(page).toHaveURL(/.*dashboard.*/)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })
})
