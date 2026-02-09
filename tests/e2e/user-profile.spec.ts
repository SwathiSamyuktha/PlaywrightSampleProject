import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../page-objects/ProfilePage';

test.describe('User profile', () => {
  test('profile page loads', async ({ page }) => {
    const profile = new ProfilePage(page);
    await profile.goto('/');
    // Add assertions when profile flow is defined
    await expect(page).toHaveURL(/\//);
  });
});
