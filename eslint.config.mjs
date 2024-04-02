//  @ts-check

import globals from "globals"
import eslint from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import jestPlugin from "eslint-plugin-jest"
import eslintPluginJsonc from "eslint-plugin-jsonc"
import prettierPlugin from "eslint-plugin-prettier"
import tseslint from "typescript-eslint"

export default tseslint.config({
        ignores: ["**/dist/**"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    prettierConfig, {
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            jest: jestPlugin,
        },
    }, {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
    }, {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.,
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        ...tseslint.configs.disableTypeChecked,
        ...prettierConfig,
    }, {
        files: ["**/test/**"],
        ...jestPlugin.configs["flat/recommended"],
    }, {
        files: ["**/*.{json,jsonc,json5}"],
        ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    },
)