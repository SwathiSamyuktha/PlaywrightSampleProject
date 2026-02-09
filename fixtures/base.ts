/**
 * Base fixture — test with logger; use for specs that need logging.
 */
import { test as base, expect } from '@playwright/test';
import { Logger } from '../utils/logger';

export const test = base.extend<{ logger: Logger }>({
  logger: async ({}, use) => {
    const logger = new Logger('Test');
    await use(logger);
  },
});

export { expect };
