import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "../shared/configuration/configuration";
import { LoggerModule } from "../shared/logger";
import { CarboneController } from "./carbone.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    LoggerModule,
  ],
  controllers: [CarboneController],
  providers: [],
})
export class CarboneModule {}
