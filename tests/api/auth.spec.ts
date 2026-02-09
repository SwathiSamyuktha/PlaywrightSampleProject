import { test, expect } from '../../fixtures/api';

test.describe('API — Auth', () => {
  test('GET / returns 200', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);
  });

  test('GET /login returns 200', async ({ request }) => {
    const res = await request.get('/login');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Login');
  });
});
