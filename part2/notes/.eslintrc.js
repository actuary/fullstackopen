module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true,
    "cypress/globals": true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'react/prop-types': 'off',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': 0,
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
