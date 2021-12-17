module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
  globals: {
    before: true,
  },
};
