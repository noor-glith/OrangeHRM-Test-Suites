import { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    const url =
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const root = 'https://opensource-demo.orangehrmlive.com'
    const maxAttempts = 3

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
        await this.page.waitForLoadState('networkidle')
        return
      } catch (err) {
        if (attempt === maxAttempts) {
          throw new Error(
            `Navigation to ${url} failed after ${maxAttempts} attempts: ${err}`,
          )
        }
        // Try a lightweight fallback to the root then immediately retry
        try {
          await this.page.goto(root, {
            waitUntil: 'domcontentloaded',
            timeout: 20000,
          })
        } catch (_) {
          // ignore fallback errors, we'll retry the main URL immediately
        }
        // continue to next attempt without sleeping to avoid closed-page waits
      }
    }
  }

  async login(username: string, password: string) {
    const user = this.page.getByRole('textbox', { name: 'Username' })
    const pass = this.page.getByRole('textbox', { name: 'Password' })
    const loginBtn = this.page.getByRole('button', { name: 'Login' })

    await user.fill(username)
    await pass.fill(password)
    await loginBtn.click()
  }
}
