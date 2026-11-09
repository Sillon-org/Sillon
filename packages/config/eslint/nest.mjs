// Config ESLint pour apps/server (NestJS, Node).
import globals from "globals";
import tseslint from "typescript-eslint";
import { base } from "./base.mjs";

export const nest = tseslint.config(...base, {
  languageOptions: {
    globals: { ...globals.node },
  },
  rules: {
    // NestJS s'appuie sur les classes injectées : imports de types utilisés à l'exécution (DI).
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-extraneous-class": "off",
  },
});

export default nest;
