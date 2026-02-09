import { test, expect } from '../../fixtures/auth';
import users from '../../data/users.json';

test.describe('Login', () => {
  test('@smoke @regression should show login form', async ({ loginPage }) => {
    await loginPage.goto('/login');
    const visible = await loginPage.isLoginFormVisible();
    expect(visible).toBe(true);
  });

  test('@regression invalid login shows error', async ({ loginPage }) => {
    await loginPage.goto('/login');
    await loginPage.login('invalid', 'invalid');
    const flash = await loginPage.getFlashText();
    expect(flash.toLowerCase()).toContain('invalid');
  });

  // Data-driven: one test per credential set from data/users.json (BlazeMeter #13)
  const credentials: Array<{ label: string; username: string; password: string }> = [
    { label: 'invalid', ...users.invalid },
    { label: 'valid', ...users.valid },
  ];
  for (const { label, username, password } of credentials) {
    test(`@regression login with ${label} credentials shows expected result`, async ({ loginPage }) => {
      await loginPage.goto('/login');
      await loginPage.login(username, password);
      const flash = await loginPage.getFlashText();
      if (label === 'invalid') {
        expect(flash.toLowerCase()).toContain('invalid');
      } else {
        expect(flash.toLowerCase().includes('invalid')).toBe(false);
      }
    });
  }
});
