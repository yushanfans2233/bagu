/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:oxlint/recommended',
  ],
  overrides: [
    {
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:playwright/recommended'
      ]
    },
    {
      'files': ['*.json', '*.json5'],
      'parser': 'jsonc-eslint-parser',
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['simple-import-sort'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': ['error']
  }
}
