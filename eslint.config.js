import js from '@eslint/js';
import html from 'eslint-plugin-html';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.html'],
    plugins: { html },
    settings: {
      'html/javascript-mime-types': ['text/babel', 'text/javascript'],
    },
  },
  {
    files: ['**/*.js', '**/*.html'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        React: 'readonly',
        ReactDOM: 'readonly',
        Babel: 'readonly',
        MOCK_DATA: 'readonly',
        ICON_SET: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },
];
