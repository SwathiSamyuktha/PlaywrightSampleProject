/**
 * ApiTest — Basic API tests using request fixture.
 */
import { test, expect } from '../../fixtures/base';

test.describe('API (ApiTest)', () => {
  test('@regression GET returns 200', async ({ request, logger }) => {
    logger.info('ApiTest: GET /');
    const response = await request.get('/');
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);
    logger.info('Response status', { status: response.status() });
  });

  test('@regression GET /login returns 200', async ({ request, logger }) => {
    logger.info('ApiTest: GET /login');
    const res = await request.get('/login');
    expect(res.status()).toBe(200);
    const body = await res.text();
    logger.debug('Body length', body.length);
  });
});
