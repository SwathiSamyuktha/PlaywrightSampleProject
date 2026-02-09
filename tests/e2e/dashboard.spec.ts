import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../page-objects/DashboardPage';

test.describe('Dashboard', () => {
  test('dashboard loads', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto('/');
    // Add assertions when dashboard flow is defined
    await expect(page).toHaveURL(/\//);
  });
});
