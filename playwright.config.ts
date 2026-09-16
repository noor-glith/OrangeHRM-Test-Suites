import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 1,

  use: {
    executablePath: `${process.env.TEMP}\\chrome-win64\\chrome-win64\\chrome.exe`,
    headless: false,
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
