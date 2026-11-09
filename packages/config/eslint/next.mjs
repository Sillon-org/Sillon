// Config ESLint pour apps/web (Next.js App Router + React).
import nextPlugin from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import { base } from "./base.mjs";

export const next = tseslint.config(...base, {
  files: ["**/*.{ts,tsx,js,jsx,mjs}"],
  plugins: {
    "@next/next": nextPlugin,
    react,
    "react-hooks": reactHooks,
  },
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
  },
  settings: { react: { version: "detect" } },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
    ...reactHooks.configs.recommended.rules,
    "react/prop-types": "off",
  },
});

export default next;
