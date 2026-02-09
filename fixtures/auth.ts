import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

type AuthFixtures = {
  loginPage: LoginPage;
};

/** Fixture that provides LoginPage. Use in E2E tests that need auth flows. */
export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
