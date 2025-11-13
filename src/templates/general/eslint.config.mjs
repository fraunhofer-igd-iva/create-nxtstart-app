import nextTypescript from 'eslint-config-next/typescript'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

const config = [
    ...nextTypescript,
    <§cypress§>{
      ignores: ["cypress/support/commands.ts"],
    },</§cypress§>
    ...nextCoreWebVitals, 
    ...compat.extends("plugin:@typescript-eslint/recommended"),<§linting§>
    ...compat.extends("prettier"),</§linting§>
    {
      plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
    },
  }
]

export default config
