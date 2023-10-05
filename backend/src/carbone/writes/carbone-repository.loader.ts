import { CarboneRepository } from "../shared/carbone.repository";
import { Csv } from "../shared/types";

export class CarboneRepositoryLoader {
  constructor(private readonly carboneRepository: CarboneRepository) {}

  async execute(csv: Csv): Promise<void> {
    await this.carboneRepository.addFromCsv(csv);
  }
}
