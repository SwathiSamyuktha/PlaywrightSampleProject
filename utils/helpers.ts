/** Generic test helpers */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Normalize path for baseURL-relative navigation */
export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}
