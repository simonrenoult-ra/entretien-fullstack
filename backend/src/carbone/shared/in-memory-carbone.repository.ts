import { CarboneRepository } from "./carbone.repository";
import { CarboneItem, Csv } from "./types";

export class InMemoryCarboneRepository implements CarboneRepository {
  constructor(private readonly carboneStore: Array<CarboneItem> = []) {}

  async addFromCsv(csv: Csv): Promise<void> {
    this.carboneStore.push(...csv);
  }

  async findAll(): Promise<CarboneItem[]> {
    return this.carboneStore;
  }
}
