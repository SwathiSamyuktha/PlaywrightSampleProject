import { test, expect } from '@playwright/test';

test.describe('Visual — Homepage', () => {
  test('homepage snapshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\//);
    // Uncomment for visual regression when you have a baseline:
    // await expect(page).toHaveScreenshot('homepage.png');
  });
});
