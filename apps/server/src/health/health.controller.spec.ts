import { Test } from "@nestjs/testing";
import { describe, expect, it } from "vitest";
import { HealthController } from "./health.controller.js";

describe("HealthController", () => {
  it("renvoie le statut ok", async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    const controller = moduleRef.get(HealthController);
    const result = controller.check();

    expect(result.status).toBe("ok");
    expect(result.uptime).toBeGreaterThanOrEqual(0);
  });
});
