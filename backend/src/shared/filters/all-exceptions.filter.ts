import { ArgumentsHost, Catch, HttpServer } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import * as Sentry from "@sentry/node";

import { TortueLogger } from "../logger/logger";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly logger: TortueLogger,
    httpServer: HttpServer,
  ) {
    super(httpServer);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof Error) {
      this.logger.error(exception.message, { error: exception });
      Sentry.captureException(exception);
    }
    super.catch(exception, host);
  }
}
