import { Page, Locator } from '@playwright/test'

export class AdminPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async openAdmin() {
    const adminLink = this.page.getByRole('link', { name: 'Admin' })
    await adminLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  getSystemUsersHeading(): Locator {
    return this.page.getByRole('heading', { name: 'System Users' })
  }

  getAddButton(): Locator {
    return this.page.getByRole('button', { name: 'Add' })
  }
}
