import { Configuration } from "@nestjs/cli/lib/configuration";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { TortueModule } from "../index";
import { configureLogger } from "./logger";
import { configureSentry } from "./sentry";
import { configureViews } from "./views";

export async function startServer() {
  const app = await NestFactory.create<NestExpressApplication>(TortueModule, {
    bufferLogs: true,
    cors: true,
  });

  app.enableCors();
  configureLogger(app);
  configureViews(app);
  configureSentry(app);

  const configService = app.get(ConfigService<Configuration>);
  const { port } = configService.get("server");
  await app.listen(port);
}
