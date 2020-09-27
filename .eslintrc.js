module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'no-unused-vars': 'off',
  },
}
