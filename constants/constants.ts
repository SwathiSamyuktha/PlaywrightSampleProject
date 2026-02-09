/** Shared test constants */
export const TestConstants = {
  testTimeout: 60_000,
  expectTimeout: 10_000,
  maxAcceptableResponseTimeMs: 20_000,
  contentType: {
    json: 'application/json',
    html: 'text/html',
    text: 'text/plain',
  } as const,
};
