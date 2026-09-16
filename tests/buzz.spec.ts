import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { BuzzPage } from '../pages/BuzzPage'

test.describe('Buzz posting', () => {
  test('can post a message and see it in the feed', async ({ page }) => {
    const login = new LoginPage(page)
    const buzz = new BuzzPage(page)

    await login.goto()
    await login.login('Admin', 'admin123')

    await buzz.openBuzz()

    // The site shows "Most Recent Posts" / "Latest Posts" depending on locale;
    // accept either string by using a regex.
    await expect(
      page.getByText(/Latest Posts|Most Recent Posts/i),
    ).toBeVisible()

    const message = 'Excited for testing!'
    await buzz.postMessage(message)

    // Verify the message appears in the feed — use the first match to avoid
    // strict-mode collisions when multiple identical messages exist.
    const posted = page.getByText(message, { exact: false }).first()
    await expect(posted).toBeVisible()
  })
})
