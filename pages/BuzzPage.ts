import { Page, Locator } from '@playwright/test'

export class BuzzPage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async openBuzz() {
    const buzzLink = this.page.getByRole('link', { name: 'Buzz' })
    await buzzLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  getLatestPostsHeading(): Locator {
    return this.page.getByText('Latest Posts', { exact: false })
  }

  getPostButton(): Locator {
    // Target the submit-style Post button to avoid matching multiple filter buttons
    return this.page.locator('button[type="submit"]:has-text("Post")')
  }

  // Probe for a composer element and return a locator that can be typed/filled.
  getComposerCandidates(): Locator[] {
    return [
      // placeholder-style inputs
      this.page.getByPlaceholder("What's on your mind?"),
      // generic textbox role
      this.page.getByRole('textbox'),
      // textarea
      this.page.locator('textarea'),
      // contenteditable area
      this.page.locator('[contenteditable="true"]'),
    ]
  }

  // Attempts to enter text into the first usable composer found.
  async enterMessage(message: string) {
    const candidates = this.getComposerCandidates()
    for (const c of candidates) {
      try {
        if ((await c.count()) === 0) continue
        if (!(await c.isVisible())) continue
        // Try to fill; if not supported, try type; fallback to JS set
        try {
          await c.fill(message)
          return
        } catch (e) {
          try {
            await c.type(message)
            return
          } catch (e2) {
            await c.evaluate((el, value) => {
              if (el instanceof HTMLElement) el.innerText = value
            }, message)
            return
          }
        }
      } catch (_) {
        // ignore and try next
      }
    }
    throw new Error('No composer element found to enter message')
  }

  async postMessage(message: string) {
    await this.enterMessage(message)
    const postBtn = this.getPostButton()
    await postBtn.waitFor({ state: 'visible', timeout: 15000 })
    await postBtn.click()
    // Wait briefly for feed update
    await this.page.waitForTimeout(1000)
  }
}
