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
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disables the rule
      "react-hooks/rules-of-hooks": "off", // Validates rules of hooks
      "react-hooks/exhaustive-deps": "off", // Validates dependency arrays
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignores ESLint errors during build
    },
  },
];

export default eslintConfig;
