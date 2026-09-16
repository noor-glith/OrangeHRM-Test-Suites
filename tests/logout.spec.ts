import { test, expect } from '@playwright/test'

test.describe('OrangeHRM logout', () => {
  test('logs in, logs out, and shows login page', async ({ page }) => {
    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
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

    await page.waitForURL(/.*dashboard.*/)

    // Open user menu (profile picture) and click Logout
    const profileImg = page.getByRole('img', { name: 'profile picture' })
    await expect(profileImg).toBeVisible()
    await profileImg.click()

    const logout = page.getByRole('menuitem', { name: 'Logout' })
    await expect(logout).toBeVisible()
    await logout.click()

    // Wait for navigation back to the login page and verify Username field
    await page.waitForURL(/.*auth\/login.*/)
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
  })
})
