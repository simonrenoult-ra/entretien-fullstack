import { OnModuleInit } from "@nestjs/common";

import { TortueLogger } from "../../shared/logger/logger";
import { CarboneRepository } from "../shared/carbone.repository";

export class FindDuplicatesCommand implements OnModuleInit {
  constructor(
    private readonly carboneRepository: CarboneRepository,
    private readonly logger: TortueLogger,
  ) {}

  onModuleInit(): void {
    this.carboneRepository.findAll().then((items) => {
      const result = items.reduce((occurrencesPerKey, item) => {
        if (!occurrencesPerKey[item.getKey()]) {
          occurrencesPerKey[item.getKey()] = 1;
        } else {
          occurrencesPerKey[item.getKey()] += 1;
        }
        return occurrencesPerKey;
      }, {});

      let numberOfDuplicates = 0;
      for (const resultKey in result) {
        const numberOfOccurrence = result[resultKey];
        if (numberOfOccurrence > 1) {
          numberOfDuplicates += 1;
          console.log(resultKey, numberOfOccurrence);
        }
      }

      this.logger.debug(`Found ${numberOfDuplicates} duplicates`);
    });
  }
}
