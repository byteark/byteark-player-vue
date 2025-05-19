import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
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
    'plugin:import/recommended',
    'plugin:import/typescript',
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
      'vue/v-on-event-hyphenation': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }],
      // 'prettier/prettier': 'error',
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
        },
      ],
      'newline-before-return': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
      'import/extensions': [
        'error',
        'never',
        {
          json: 'always',
        },
      ],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
      // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
      'import/newline-after-import': ['error'],
      'import/no-unresolved': [2, { commonjs: true }],
    },
    settings: {
      'import/resolver': {
        node: {
          typescript: true,
          // extensions: ['.ts', '.vue', '.js', '.jsx', '.json'],
        },
      },
    },
  },
];
