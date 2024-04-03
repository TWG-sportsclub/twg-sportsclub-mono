//  @ts-check

import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettierConfig from "eslint-config-prettier"
import jestPlugin from "eslint-plugin-jest"
import eslintPluginJsonc from "eslint-plugin-jsonc"
import jsoncParser from "jsonc-eslint-parser"
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
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/test/**"],
    ...jestPlugin.configs["flat/recommended"],
  },
  {
    files: ["**/*.json"],
    ...eslintPluginJsonc.configs["flat/recommended-with-json"],
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        jsonSyntax: "JSON",
      },
    },
  },
  {
    files: ["**/*.jsonc"],
    ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        jsonSyntax: "JSONC",
      },
    },
  },
  {
    files: ["**/*.json5"],
    ...eslintPluginJsonc.configs["flat/recommended-with-json5"],
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        jsonSyntax: "JSON5",
      },
    },
  },
  {
    files: ["**/apps/client/**"],
    ...nextPlugin["core-web-vitals"],
  },
)
