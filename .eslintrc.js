module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'app/javascript', 'app/assets'],
      },
    },
  },
};
