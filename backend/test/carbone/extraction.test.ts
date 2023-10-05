import { equal } from "node:assert";
import * as path from "node:path";
import { describe, it } from "node:test";

import { InMemoryCarboneRepository } from "../../src/carbone/shared/in-memory-carbone.repository";
import { CarboneRepositoryLoader } from "../../src/carbone/writes/carbone-repository.loader";
import { CsvFileExtractor } from "../../src/carbone/writes/csv-file.extractor";
import { FeedCarboneRepositoryCommand } from "../../src/carbone/writes/feed-carbone-repository.command";
import { StringToCarboneItemTransformator } from "../../src/carbone/writes/string-to-carbone-item.transformator";
import { TortueLogger } from "../../src/shared/logger/logger";

describe("FeedCarboneRepositoryCommand", () => {
  it("extracts, transforms and loads the appropriate number of elements", async () => {
    const ctx = new TestContext();
    ctx.givenAProperlyConfiguredCarboneRepositoryFeeder();
    ctx.whenExecutingTheCarboneRepositoryFeeder();
    await ctx.thenTheRepositoryContainsTheAppropriateNumberOfElements();
  });
});

class VoidLogger implements TortueLogger {
  log(): void {}

  error(): void {}

  warn(): void {}

  debug(): void {}

  fatal(): void {}

  info(): void {}

  trace(): void {}
}

class TestContext {
  private command: FeedCarboneRepositoryCommand;
  private carboneRepository: InMemoryCarboneRepository;

  givenAProperlyConfiguredCarboneRepositoryFeeder() {
    this.carboneRepository = new InMemoryCarboneRepository();
    this.command = new FeedCarboneRepositoryCommand(
      new VoidLogger(),
      path.resolve(__dirname, "./carbone_short.csv"),
      new CsvFileExtractor(),
      new StringToCarboneItemTransformator(),
      new CarboneRepositoryLoader(this.carboneRepository),
    );
  }

  whenExecutingTheCarboneRepositoryFeeder() {
    this.command.onModuleInit();
  }

  async thenTheRepositoryContainsTheAppropriateNumberOfElements() {
    const carboneItems = await this.carboneRepository.findAll();
    equal(carboneItems.length, 4);
  }
}
