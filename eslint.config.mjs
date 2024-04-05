//  @ts-check

import eslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import jestPlugin from 'eslint-plugin-jest'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jest: jestPlugin
    }
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked
  },
  {
    files: ['**/test/**'],
    ...jestPlugin.configs['flat/recommended']
  },
  {
    files: ['**/apps/client/**'],
    ...nextPlugin['core-web-vitals']
  },
  {
    files: ['**/*.{json,jsonc,json5}'],
    ...eslintPluginJsonc.configs['flat/recommended-with-jsonc']
  }
)
