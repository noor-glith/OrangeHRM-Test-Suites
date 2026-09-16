import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import { test, expect } from '@playwright/test'

const csvPath = path.resolve(__dirname, '..', 'test-data', 'LoginData.csv')
const csvContent = fs.readFileSync(csvPath, 'utf8')
const records = parse(csvContent, { columns: true, skip_empty_lines: true })

test.describe('Login - data driven from CSV', () => {
  for (const row of records) {
    const username = row.Username?.trim()
    const password = row.Password?.trim()
    const expected = row.Expected?.trim()

    test(`${username} -> ${expected}`, async ({ page }) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
        waitUntil: 'networkidle',
        timeout: 60000,
      })

      await page.getByRole('textbox', { name: 'Username' }).fill(username)
      await page.getByRole('textbox', { name: 'Password' }).fill(password)
      await page.getByRole('button', { name: 'Login' }).click()

      try {
        if ((expected || '').toLowerCase() === 'dashboard') {
          await page.waitForURL(/.*dashboard.*/)
          await expect(
            page.getByRole('heading', { name: 'Dashboard' }),
          ).toBeVisible()
        } else {
          // check for invalid credentials message
          const err = page.getByText('Invalid credentials', { exact: false })
          await expect(err).toBeVisible()
        }
        console.log(`PASS: ${username} -> ${expected}`)
      } catch (err) {
        console.error(`FAIL: ${username} -> ${expected}`)
        throw err
      }
    })
  }
})
