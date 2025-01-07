// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintconfigPrettier from "eslint-config-prettier";

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
  files: ["**/*.ts"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended, eslintconfigPrettier],
  rules: {
    "no-console": [2, { allow: ["warn", "log", "error"] }],
    "no-debugger": "warn",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
  },
});
