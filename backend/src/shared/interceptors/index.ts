import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { ContextModule, ContextService } from "../context";
import { LoggerModule } from "../logger";
import { TortueLogger } from "../logger/logger";
import { AddTracingIdentifiersToContextInterceptor } from "./add-tracing-identifiers-to-context.interceptor";
import { LogIncomingRequestInterceptor } from "./log-incoming-request.interceptor";

@Module({
  imports: [ContextModule, LoggerModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      inject: ["ContextService"],
      useFactory: (contextService: ContextService) =>
        new AddTracingIdentifiersToContextInterceptor(contextService),
    },
    {
      provide: APP_INTERCEPTOR,
      inject: ["TortueLogger"],
      useFactory: (logger: TortueLogger) =>
        new LogIncomingRequestInterceptor(logger),
    },
  ],
})
export class InterceptorsModule {}
