import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginVue from 'eslint-plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist',
      '**/.eslintrc.cjs',
      '**/build/',
      '**/dist/',
      '**/node_modules/',
      '**/.snapshots/',
      '**/*.min.js',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  ...pluginVue.configs['flat/recommended'],
  {
    files: [
      'src/**/*.{ts,vue}',
      'example/**/*.{ts,vue}',
      'test/**/*.{ts,vue}'
    ],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tsParser
      }
    },
    rules: {
      // 'prettier/prettier': 'error',
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': ['error', { code: 100, ignoreUrls: true, ignoreComments: true }],
      'vue/v-on-event-hyphenation': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
];
