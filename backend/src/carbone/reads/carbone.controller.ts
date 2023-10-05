import {Controller, Get, Inject, Res,} from "@nestjs/common";
import {Response} from "express";

import {CarboneRepository} from "../shared/carbone.repository";

@Controller()
export class CarboneController {
  constructor(
    @Inject("CarboneRepository") private readonly repository: CarboneRepository,
  ) {}

  @Get("/carbone-footprints")
  async getCarboneFootprints(@Res() res: Response) {
    const items = await this.repository.findAll();
    return res.json(items);
  }
}
