// Playwright config file — root level
import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report' }]],
  use: {
    baseURL: env.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: env.actionTimeout,
    navigationTimeout: env.navigationTimeout,
  },
  outputDir: 'reports/screenshots',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  // Optional: run full suite on Chromium only, smaller "browser compat" set on Firefox (see BlazeMeter #5):
  // projects: [
  //   { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  //   { name: 'firefox', testMatch: [/e2e\/login\.spec\.ts/, /api\/auth\.spec\.ts/, /visual\/homepage\.spec\.ts/], use: { ...devices['Desktop Firefox'] } },
  // ],
});
