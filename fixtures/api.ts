import { test as base } from '@playwright/test';

/** API fixture — base test already has request from Playwright. Re-export with optional extras. */
export const test = base.extend<Record<string, never>>({});
export { expect } from '@playwright/test';
