import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { ulid } from "ulid";

import { ContextService } from "../context";

export class AddTracingIdentifiersToContextInterceptor
  implements NestInterceptor
{
  constructor(private readonly context: ContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();

    type HeaderType = string | undefined;
    const incomingCorrelationId = req.headers["x-correlation-id"] as HeaderType;
    const incomingRequestId = req.headers["x-request-id"] as HeaderType;

    const correlationId = incomingCorrelationId ?? ulid();
    const requestId = incomingRequestId ?? ulid();

    this.context.set("correlationId", correlationId);
    this.context.set("requestId", requestId);

    return next.handle();
  }
}
