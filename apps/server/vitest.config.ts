import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

// SWC est nécessaire pour émettre les métadonnées des décorateurs (injection NestJS).
export default defineConfig({
  plugins: [swc.vite({ module: { type: "es6" } })],
  test: {
    globals: false,
    environment: "node",
    include: ["src/**/*.spec.ts", "test/**/*.spec.ts"],
  },
});
