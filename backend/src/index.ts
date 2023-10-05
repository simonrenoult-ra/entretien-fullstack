import { Module } from "@nestjs/common";

import { CarboneModule } from "./carbone";
import { SharedModule } from "./shared";

@Module({
  imports: [SharedModule, CarboneModule],
})
export class TortueModule {}
