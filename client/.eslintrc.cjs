module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/extensions': ['error', { ts: 'never' }],
    'max-len': ['error', 500],
    'object-curly-newline': 'off',
    'no-return-assign': 'off',
    'no-restricted-syntax': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
  },
};
