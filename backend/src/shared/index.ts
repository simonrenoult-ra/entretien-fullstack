import { Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";

import { FiltersModule } from "./filters";
import { InterceptorsModule } from "./interceptors";

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    FiltersModule,
    InterceptorsModule,
  ],
})
export class SharedModule {}
