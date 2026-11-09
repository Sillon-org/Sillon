import { Controller, Get } from "@nestjs/common";
import type { HealthResponse } from "@sillon/shared-types";

@Controller("health")
export class HealthController {
  @Get()
  check(): HealthResponse {
    return { status: "ok", uptime: Math.round(process.uptime()) };
  }
}
