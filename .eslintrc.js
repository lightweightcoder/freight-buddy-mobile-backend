module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // Don't enforce control flow closing curly brace needs to be
    // on same line as next control flow opening statement
    'brace-style': 'off',
    // Require import extensions for all imports except packages because
    // SWE1 doesn't use a bundler for executing Node, thus Node will fail
    // when importing local modules without the .js extension.
    // https://github.com/airbnb/javascript/issues/2134
    'import/extensions': ['error', 'ignorePackages'],
    // Disable linebreak style to prevent ESLint errors on Windows line endings
    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': 'off',
    // Allow console for students to debug
    'no-console': 'off',
    // Allow function param reassign for array or object elements or properties
    'no-param-reassign': ['error', { props: false }],
  },
};
