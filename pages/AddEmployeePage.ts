import { Page } from '@playwright/test'

export class AddEmployeePage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async addEmployee(firstName: string, lastName: string) {
    const first = this.page.locator(
      'input[name="firstName"], input[placeholder="First Name"]',
    )
    const last = this.page.locator(
      'input[name="lastName"], input[placeholder="Last Name"]',
    )
    const save = this.page.locator('button:has-text("Save")')

    await first.waitFor({ state: 'visible', timeout: 15000 })
    await first.click()
    await first.fill(firstName)

    await last.waitFor({ state: 'visible', timeout: 15000 })
    await last.click()
    await last.fill(lastName)

    await save.waitFor({ state: 'visible', timeout: 15000 })
    await save.click()
  }
}
