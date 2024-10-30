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
  <§cypress§>{
    ignores: ["cypress/support/commands.ts"],
  }, </§cypress§>...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",<§linting§>
    "prettier",</§linting§>
  ), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "error",
    },
  }
]

export default config
