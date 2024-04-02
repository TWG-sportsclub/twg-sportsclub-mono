//  @ts-check

import eslint from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import jestPlugin from "eslint-plugin-jest"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["**/dist/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
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
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/test/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
)
