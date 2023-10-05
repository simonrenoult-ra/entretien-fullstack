import { NestExpressApplication } from "@nestjs/platform-express";

export function configureLogger(app: NestExpressApplication) {
  app.useLogger(app.get("TortueLogger"));
}
