import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from 'eslint-config-next'
import prettier from 'eslint-config-prettier'

const config =  [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next,<§linting§>
  // Disable formatting rules (Prettier handles them)
  prettier,</§linting§>
  {
    rules: {
      'no-unused-vars': 'off', // must disable base rule for TS
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'out/',
      'coverage/',<§cypress§>
      'cypress/support/commands.ts'</§cypress§>
    ],
  },
]

export default config
