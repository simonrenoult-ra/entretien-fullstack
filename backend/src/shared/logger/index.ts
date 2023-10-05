import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClsService } from "nestjs-cls";

import configuration, { Configuration } from "../configuration/configuration";
import { ContextModule, ContextService } from "../context";
import { ImplTortueLogger } from "./logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ContextModule,
  ],
  providers: [
    {
      provide: "TortueLogger",
      inject: [ConfigService<Configuration>, ClsService],
      useFactory: (
        configService: ConfigService,
        contextService: ContextService,
      ) => new ImplTortueLogger(configService, contextService),
    },
  ],
  exports: ["TortueLogger"],
})
export class LoggerModule {}
