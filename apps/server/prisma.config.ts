import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Lu depuis apps/server/.env (voir .env.example).
    url: process.env.DATABASE_URL ?? "",
  },
});
