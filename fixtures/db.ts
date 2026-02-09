import { test as base } from '@playwright/test';

/** Placeholder for DB helpers (e.g. seed data, cleanup). Extend when you add a real DB client. */
type DbFixtures = Record<string, unknown>;

export const test = base.extend<DbFixtures>({
  // db: async ({}, use) => { ... },
});

export { expect } from '@playwright/test';
