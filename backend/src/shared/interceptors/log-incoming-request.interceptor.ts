import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";

import { TortueLogger } from "../logger/logger";

export class LogIncomingRequestInterceptor implements NestInterceptor {
  constructor(private readonly logger: TortueLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    this.logger.info(`${res.statusCode} - ${req.method} ${req.url}`, {
      event: "incoming request",
      method: req.method,
      url: req.url,
      userAgent: req.header("user-agent"),
      statusCode: res.statusCode,
    });

    return next.handle();
  }
}
