/** @type { import("eslint").Linter.Config } */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: false },
  },
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier',
  ],
  ignorePatterns: ['node_modules/', 'dist/', 'reports/', 'test-results/', 'playwright-report/'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'playwright/no-conditional-in-test': 'warn',
        'playwright/no-conditional-expect': 'warn',
      },
    },
  ],
};
