import { CarboneItem, Csv } from "./types";

export interface CarboneRepository {
  findAll(): Promise<CarboneItem[]>;

  addFromCsv(csv: Csv): Promise<void>;
}
