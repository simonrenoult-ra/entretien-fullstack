import { Configuration } from "@nestjs/cli/lib/configuration";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as Sentry from "@sentry/node";

export function configureSentry(app: NestExpressApplication) {
  const { dsn } = app.get(ConfigService<Configuration>).get("sentry");
  const { release } = app.get(ConfigService<Configuration>).get("sentry");
  Sentry.init({ dsn, release, tracesSampleRate: 1.0 });
}
