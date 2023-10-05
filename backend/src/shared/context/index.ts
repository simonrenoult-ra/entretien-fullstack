import { Module } from "@nestjs/common";
import { ClsModule, ClsService } from "nestjs-cls";

import { Context } from "./context";

export type ContextService = ClsService<Context>;

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: { mount: true },
    }),
  ],
  providers: [
    {
      provide: "ContextService",
      useExisting: ClsService,
    },
  ],
  exports: ["ContextService"],
})
export class ContextModule {}
