const {defineConfig} = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  rules: {
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-extra-semi': 'off',
    'no-process-exit': 'off',
    'no-useless-escape': 'off',
    'n/no-process-exit': 'off',
    'n/no-missing-import': 'off',
    'n/no-deprecated-api': 'off',
    'n/no-unpublished-import': 'off',
    'n/no-unpublished-require': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
    '@typescript-eslint/no-explicit-any': 'off', // maybe we should turn this on in a new PR
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/consistent-generic-constructors': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ],
  },
  overrides: [
    {
      files: ['packages/create-ekko/template-*/**'],
      rules: {
        'no-undef': 'off',
        'n/no-missing-import': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      }
    },
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off'
      }
    }
  ],
  ignorePatterns: ['packages/create-ekko/template-**']
})
