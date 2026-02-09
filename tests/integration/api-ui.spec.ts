/**
 * API–UI integration: ensure API and UI stay in sync.
 *
 * Mechanism: fetch via API, assert expected status/content, then open same resource in UI
 * and assert the UI shows the same logical state.
 */
import { test, expect } from '../../fixtures/base';
import { fetchViaApi, assertApiAndUiConsistent } from '../../utils/api-ui';
import { PlaywrightWebDriver } from '../../page-objects/WebDriver';
import { LoginPageWithDriver } from '../../page-objects/LoginPageWithDriver';

test.describe('API–UI integration', () => {
  test('GET / via API returns 200 and body contains key content; UI shows same', async ({
    request,
    page,
    context,
    logger,
  }) => {
    const apiContext = await fetchViaApi(request, '/');
    assertApiAndUiConsistent(apiContext, {
      expectedStatus: 200,
      bodyShouldContain: 'Welcome to the-internet',
    });
    logger.info('API / OK', { status: apiContext.status });

    const driver = new PlaywrightWebDriver(page, context);
    await driver.goto('/');
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('Welcome to the-internet');
    logger.info('UI / matches API content');
  });

  test('GET /login via API returns 200 with Login; UI login form is visible', async ({
    request,
    page,
    context,
    logger,
  }) => {
    const apiContext = await fetchViaApi(request, '/login');
    assertApiAndUiConsistent(apiContext, {
      expectedStatus: 200,
      bodyShouldContain: 'Login',
    });
    logger.info('API /login OK', { status: apiContext.status });

    const driver = new PlaywrightWebDriver(page, context);
    const loginPage = new LoginPageWithDriver(driver);
    await loginPage.goto('/login');
    const formVisible = await loginPage.isLoginFormVisible();
    expect(formVisible).toBe(true);
    logger.info('UI login form visible after API check');
  });
});
