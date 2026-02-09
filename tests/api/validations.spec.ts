/**
 * Comprehensive API validation tests — status, headers, body, timing, errors.
 *
 * Uses the-internet.herokuapp.com for status/redirect and JSONPlaceholder for CRUD/JSON.
 */
import { test, expect } from '../../fixtures/base';
import { env } from '../../config/env';
import { TestConstants } from '../../constants';

test.describe('API validations — status and headers', () => {
  test('@smoke @regression GET returns 200 and HTML content-type', async ({ request, logger }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType.toLowerCase()).toContain('text/html');
    logger.info('GET /', { status: response.status(), contentType });
  });

  test('@regression GET /login returns 200 and body contains Login', async ({ request }) => {
    const res = await request.get('/login');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Login');
  });

  test('@regression status_codes 404 returns 404', async ({ request }) => {
    const res = await request.get('/status_codes/404');
    expect(res.status()).toBe(404);
  });

  test('@regression status_codes 500 returns 500', async ({ request }) => {
    const res = await request.get('/status_codes/500');
    expect(res.status()).toBe(500);
  });

  test('@regression response has reasonable timing', async ({ request }) => {
    const start = Date.now();
    await request.get('/');
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(TestConstants.maxAcceptableResponseTimeMs);
  });
});

test.describe('API validations — redirects', () => {
  test('@regression redirect returns 302 and Location header', async ({ request }) => {
    const res = await request.get('/redirect', { maxRedirects: 0 });
    expect(res.status()).toBe(302);
    const location = res.headers()['location'];
    expect(location).toBeDefined();
    expect(location).toContain('/');
  });
});

test.describe('API validations — JSON (JSONPlaceholder)', () => {
  test('@regression GET posts returns 200 and JSON array', async ({ request, logger }) => {
    const res = await request.get(`${env.apiBaseURL}/posts`);
    expect(res.status()).toBe(200);
    const contentType = res.headers()['content-type'] ?? '';
    expect(contentType).toContain(TestConstants.contentType.json);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('userId');
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('body');
    }
    logger.info('GET /posts', { count: (data as unknown[]).length });
  });

  test('@regression GET single post returns 200 and expected shape', async ({ request }) => {
    const res = await request.get(`${env.apiBaseURL}/posts/1`);
    expect(res.status()).toBe(200);
    const post = (await res.json()) as { userId: number; id: number; title: string; body: string };
    expect(post.id).toBe(1);
    expect(typeof post.userId).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });

  test('@regression GET non-existent post returns 404', async ({ request }) => {
    const res = await request.get(`${env.apiBaseURL}/posts/99999`);
    expect(res.status()).toBe(404);
  });

  test('@regression POST create returns 201 and body has id', async ({ request }) => {
    const res = await request.post(`${env.apiBaseURL}/posts`, {
      data: { title: 'Test', body: 'Body', userId: 1 },
    });
    expect(res.status()).toBe(201);
    const created = (await res.json()) as { id?: number };
    expect(created).toHaveProperty('id');
  });

  test('@regression PUT update returns 200 and returns updated data', async ({ request }) => {
    const res = await request.put(`${env.apiBaseURL}/posts/1`, {
      data: { id: 1, title: 'Updated', body: 'Updated body', userId: 1 },
    });
    expect(res.status()).toBe(200);
    const updated = (await res.json()) as { title: string };
    expect(updated.title).toBe('Updated');
  });

  test('@regression PATCH partial update returns 200', async ({ request }) => {
    const res = await request.patch(`${env.apiBaseURL}/posts/1`, {
      data: { title: 'Patched title' },
    });
    expect(res.status()).toBe(200);
    const patched = (await res.json()) as { title: string };
    expect(patched.title).toBe('Patched title');
  });

  test('@regression DELETE returns 200', async ({ request }) => {
    const res = await request.delete(`${env.apiBaseURL}/posts/1`);
    expect(res.status()).toBe(200);
  });
});

test.describe('API validations — headers and body size', () => {
  test('@regression response has content-length or transfer-encoding', async ({ request }) => {
    const res = await request.get('/');
    const headers = res.headers();
    const hasLength = 'content-length' in headers || 'transfer-encoding' in headers;
    expect(hasLength).toBe(true);
  });

  test('@regression GET returns non-empty body', async ({ request }) => {
    const res = await request.get('/');
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  });
});
