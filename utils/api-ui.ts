/**
 * API–UI integration: run API calls and use the same data to assert in the UI.
 */
import { APIRequestContext } from '@playwright/test';

export interface ApiUiContext {
  status: number;
  body: string;
  json?: unknown;
}

export async function fetchViaApi(
  request: APIRequestContext,
  path: string,
  options?: { method?: 'GET' | 'POST'; body?: unknown }
): Promise<ApiUiContext> {
  const method = options?.method ?? 'GET';
  const response =
    method === 'GET'
      ? await request.get(path)
      : await request.post(path, options?.body ? { data: options.body } : undefined);
  const body = await response.text();
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    json = undefined;
  }
  return { status: response.status(), body, json };
}

export function assertApiAndUiConsistent(
  apiContext: ApiUiContext,
  expectations: { expectedStatus?: number; bodyShouldContain?: string }
): void {
  if (expectations.expectedStatus !== undefined) {
    if (apiContext.status !== expectations.expectedStatus) {
      throw new Error(
        `API status ${apiContext.status} !== expected ${expectations.expectedStatus}`
      );
    }
  }
  if (expectations.bodyShouldContain !== undefined) {
    if (!apiContext.body.includes(expectations.bodyShouldContain)) {
      throw new Error(`API body does not contain "${expectations.bodyShouldContain}"`);
    }
  }
}
