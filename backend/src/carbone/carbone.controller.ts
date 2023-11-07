import { Controller, Get } from "@nestjs/common";

@Controller()
export class CarboneController {
  @Get("/carbon-footprints")
  async listCarbonFootprints() {
    return [];
  }
}
