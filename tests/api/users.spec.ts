import { test, expect } from '../../fixtures/api';
import { env } from '../../config/env';

test.describe('API — Users', () => {
  test('@regression GET posts returns 200 and JSON array', async ({ request }) => {
    const res = await request.get(`${env.apiBaseURL}/posts`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test('@regression GET single post returns 200', async ({ request }) => {
    const res = await request.get(`${env.apiBaseURL}/posts/1`);
    expect(res.status()).toBe(200);
    const post = (await res.json()) as { id: number };
    expect(post.id).toBe(1);
  });
});
