import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"], // analiza ts y tsx
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;
export const config = {
  root: true,
  reportUnusedDisableDirectives: true,
  ignorePatterns: ["**/dist", "**/node_modules"],
  overrides: eslintConfig,
};