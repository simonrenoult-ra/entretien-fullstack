import { OnModuleInit } from "@nestjs/common";

import { TortueLogger } from "../../shared/logger/logger";
import { CarboneRepositoryLoader } from "./carbone-repository.loader";
import { CsvFileExtractor, PathIsNotAbsoluteError } from "./csv-file.extractor";
import { StringToCarboneItemTransformator } from "./string-to-carbone-item.transformator";

export class FeedCarboneRepositoryCommand implements OnModuleInit {
  constructor(
    private readonly logger: TortueLogger,
    private readonly pathToCarboneCsv: string,
    private readonly csvFileExtractor: CsvFileExtractor,
    private readonly stringToCarboneItemTransformator: StringToCarboneItemTransformator,
    private readonly carboneRepositoryLoader: CarboneRepositoryLoader,
  ) {}

  onModuleInit() {
    const extractorResult = this.csvFileExtractor.execute(
      this.pathToCarboneCsv,
    );
    if (extractorResult instanceof PathIsNotAbsoluteError) {
      throw new Error("Error while loading carbone database");
    }

    const csv = this.stringToCarboneItemTransformator.execute(extractorResult);

    this.carboneRepositoryLoader
      .execute(csv)
      .then(() => {
        this.logger.debug("Carbone database loaded");
      })
      .catch((e) => {
        this.logger.error("Fail to load carbone database", { error: e });
      });
  }
}
