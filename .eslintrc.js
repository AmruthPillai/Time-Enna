module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'airbnb', 'prettier'],
  plugins: ['react', 'prettier', 'simple-import-sort'],
  rules: {
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};
