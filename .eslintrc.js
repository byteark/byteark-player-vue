module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 300 }],
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    'operator-linebreak': [2, 'before', { overrides: { '?': 'after' } }],
    'arrow-body-style': ['off'],
    'linebreak-style': 0,
  },
};
