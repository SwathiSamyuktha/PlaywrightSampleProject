/** Simple data generators for tests */
export function randomEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export function randomString(length: number = 8): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}
