import { test, expect } from '@playwright/test'

test.describe('PIM search', () => {
  test('searches for an employee from the PIM module', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com', {
      waitUntil: 'networkidle',
      timeout: 60000,
    })

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/.*dashboard.*/)

    await page.getByRole('link', { name: 'PIM' }).click()

    await expect(
      page.getByRole('heading', { name: 'Employee Information' }),
    ).toBeVisible()

    const employeeNameInput = page
      .locator('input[placeholder="Type for hints..."]')
      .first()
    await employeeNameInput.fill('John')

    await page.getByRole('button', { name: 'Search' }).click()

    const resultRow = page.locator('.oxd-table-card').first()
    await expect(resultRow).toBeVisible()
    await expect(page.getByText('John', { exact: false }).first()).toBeVisible()
  })
})
