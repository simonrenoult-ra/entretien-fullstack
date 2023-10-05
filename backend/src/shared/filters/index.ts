import { Module } from "@nestjs/common";
import { APP_FILTER, HttpAdapterHost } from "@nestjs/core";

import { LoggerModule } from "../logger";
import { TortueLogger } from "../logger/logger";
import { AllExceptionsFilter } from "./all-exceptions.filter";

@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      inject: ["TortueLogger", HttpAdapterHost],
      useFactory: (logger: TortueLogger, httpAdapterHost: HttpAdapterHost) =>
        new AllExceptionsFilter(logger, httpAdapterHost.httpAdapter),
    },
  ],
})
export class FiltersModule {}
