import { Page } from '@playwright/test'

export class PIMPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.getByRole('link', { name: 'PIM' }).click()
  }

  async openAddEmployee() {
    const addEmployeeLink = this.page.getByRole('link', {
      name: 'Add Employee',
    })
    const addBtn = this.page.getByRole('button', { name: 'Add' })

    if ((await addEmployeeLink.count()) > 0) {
      await addEmployeeLink.click()
    } else if ((await addBtn.count()) > 0) {
      await addBtn.click()
    } else {
      throw new Error('Add Employee control not found on the PIM page')
    }

    await this.page.waitForURL(/\/pim\/addEmployee/i, { timeout: 15000 })
    await this.page
      .getByRole('heading', { name: 'Add Employee' })
      .waitFor({ state: 'visible', timeout: 15000 })
  }
}
