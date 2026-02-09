/**
 * Single source of config. Override via env vars: BASE_URL, API_BASE_URL,
 * PW_NAVIGATION_TIMEOUT, PW_ACTION_TIMEOUT.
 */
export const env = {
  baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  apiBaseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  navigationTimeout: parseInt(process.env.PW_NAVIGATION_TIMEOUT || '60000', 10),
  actionTimeout: parseInt(process.env.PW_ACTION_TIMEOUT || '30000', 10),
  isCI: !!process.env.CI,
};
