import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 1,

  use: {
    // Only use the custom local Chrome install when running locally (not in CI).
    // process.env.CI is automatically set to 'true' by GitHub Actions.
    ...(!process.env.CI && {
      executablePath: `${process.env.TEMP}\\chrome-win64\\chrome-win64\\chrome.exe`,
    }),
    headless: !!process.env.CI,
    navigationTimeout: 60000,
    actionTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
