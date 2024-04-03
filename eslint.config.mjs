//  @ts-check

import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettierConfig from "eslint-config-prettier"
import jestPlugin from "eslint-plugin-jest"
import eslintPluginJsonc from "eslint-plugin-jsonc"
import prettierPlugin from "eslint-plugin-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
  prettierConfig,

  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jest: jestPlugin,
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    ...tseslint.configs.disableTypeChecked,
    ...prettierConfig,
  },
  {
    files: ["**/test/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
  {
    files: ["**/*.json"],
    ...eslintPluginJsonc.configs["flat/recommended-with-json"],
  },
  {
    files: ["**/*.jsonc"],
    ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
  },
  {
    files: ["**/*.json5"],
    ...eslintPluginJsonc.configs["flat/recommended-with-json5"],
  },
  {
    files: ["**/apps/client/**"],
    ...nextPlugin["core-web-vitals"],
  },
)
