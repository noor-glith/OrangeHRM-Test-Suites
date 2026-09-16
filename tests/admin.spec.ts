import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AdminPage } from '../pages/AdminPage'

test.describe('Admin section', () => {
  test('shows System Users and Add button', async ({ page }) => {
    const login = new LoginPage(page)
    const admin = new AdminPage(page)

    await login.goto()
    await login.login('Admin', 'admin123')

    await admin.openAdmin()

    await expect(admin.getSystemUsersHeading()).toBeVisible()
    await expect(admin.getAddButton()).toBeVisible()
  })
})
