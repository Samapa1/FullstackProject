import globals from "globals";
import js from "@eslint/js";
// import stylisticJs from "@stylistic/eslint-plugin-js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      // "@stylistic/js": stylisticJs,
    },
    rules: {
      ...js.configs.recommended.rules,
      // "@stylistic/js/indent": ["error", 2],
      // "@stylistic/js/linebreak-style": ["error", "unix"],
      // "@stylistic/js/quotes": ["error", "single"],
      // "@stylistic/js/semi": ["error", "never"],
    },
  },
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
];
