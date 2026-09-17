import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 1,

  use: {
    // Only use the custom local Chrome install when running locally (not in CI).
    // GitHub Actions runners are headless Linux machines and do not provide an X server.
    ...(!process.env.CI && {
      executablePath: `${process.env.TEMP}\\chrome-win64\\chrome-win64\\chrome.exe`,
    }),
    headless: true,
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
