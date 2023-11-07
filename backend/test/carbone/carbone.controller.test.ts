import * as assert from "node:assert";
import { before, describe, it } from "node:test";

import { Test, TestingModule } from "@nestjs/testing";

import { CarboneController } from "../../src/carbone/carbone.controller";

describe("CarboneController", () => {
  let carboneController: CarboneController;

  before(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CarboneController],
    }).compile();
    carboneController = app.get<CarboneController>(CarboneController);
  });

  it("should do its job", async () => {
    const carbonFootprints = await carboneController.listCarbonFootprints();
    assert.equal(carbonFootprints.length, 3);
  });
});
