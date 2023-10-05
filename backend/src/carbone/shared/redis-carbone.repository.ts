import Redis from "ioredis";

import { CarboneRepository } from "./carbone.repository";
import { CarboneItem, Csv, ICarboneItem } from "./types";

export class RedisCarboneRepository implements CarboneRepository {
  constructor(private readonly redis: Redis) {}

  private readonly _key = "carbone";
  private readonly NO_RESULT = "[]";

  async addFromCsv(csv: Csv): Promise<void> {
    this.redis.set(this._key, JSON.stringify(csv));
  }

  async findAll(): Promise<CarboneItem[]> {
    const carboneItems = (await this.redis.get(this._key)) ?? this.NO_RESULT;
    return JSON.parse(carboneItems).map((json: ICarboneItem) =>
      CarboneItem.fromJson(json),
    );
  }
}
