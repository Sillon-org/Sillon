import { describe, expect, it } from "vitest";
import { validateEnv } from "./env.js";

describe("validateEnv", () => {
  it("applique les valeurs par défaut", () => {
    const env = validateEnv({ DATABASE_URL: "postgresql://localhost/sillon" });
    expect(env.PORT).toBe(3001);
    expect(env.NODE_ENV).toBe("development");
  });

  it("refuse une configuration sans DATABASE_URL", () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });
});
