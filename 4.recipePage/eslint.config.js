import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], ignores: ["dist/**"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], ignores: ["dist/**"], languageOptions: { globals: {...globals.browser, ...globals.node } } },
]);