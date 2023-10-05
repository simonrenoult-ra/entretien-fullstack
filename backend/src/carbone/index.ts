import { resolve } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Redis from "ioredis";

import configuration, {
  Configuration,
} from "../shared/configuration/configuration";
import { LoggerModule } from "../shared/logger";
import { TortueLogger } from "../shared/logger/logger";
import { CarboneController } from "./reads/carbone.controller";
import { CarboneRepository } from "./shared/carbone.repository";
import { InMemoryCarboneRepository } from "./shared/in-memory-carbone.repository";
import { RedisCarboneRepository } from "./shared/redis-carbone.repository";
import { CarboneRepositoryLoader } from "./writes/carbone-repository.loader";
import { CsvFileExtractor } from "./writes/csv-file.extractor";
import { FeedCarboneRepositoryCommand } from "./writes/feed-carbone-repository.command";
import { FindDuplicatesCommand } from "./writes/find-duplicates.command";
import { StringToCarboneItemTransformator } from "./writes/string-to-carbone-item.transformator";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    LoggerModule,
  ],
  controllers: [CarboneController],
  providers: [
    {
      provide: "PATH_TO_CARBONE_CSV",
      useValue: resolve(__dirname, "resources", "carbone.csv"),
    },
    {
      provide: Redis,
      inject: [ConfigService, "TortueLogger"],
      useFactory: (
        configService: ConfigService<Configuration>,
        logger: TortueLogger,
      ) => {
        const { url } = configService.get("redis");
        if (url) {
          return new Redis(url);
        } else {
          logger.warn("No REDIS_URL, falling back on in memory implementation");
          return null;
        }
      },
    },
    {
      provide: "CarboneRepository",
      inject: [Redis],
      useFactory: (redis: Redis | null) => {
        return redis
          ? new RedisCarboneRepository(redis)
          : new InMemoryCarboneRepository();
      },
    },
    {
      provide: "Extractor",
      useClass: CsvFileExtractor,
    },
    {
      provide: "Transformator",
      useClass: StringToCarboneItemTransformator,
    },
    {
      provide: "Loader",
      inject: ["CarboneRepository"],
      useFactory: (carboneRepository: CarboneRepository) =>
        new CarboneRepositoryLoader(carboneRepository),
    },
    {
      provide: "FeedCarboneRepositoryCommand",
      inject: [
        "PATH_TO_CARBONE_CSV",
        "TortueLogger",
        "Extractor",
        "Transformator",
        "Loader",
      ],
      useFactory: (
        pathToCarboneCsv: string,
        logger: TortueLogger,
        extractor: CsvFileExtractor,
        transformator: StringToCarboneItemTransformator,
        loader: CarboneRepositoryLoader,
      ) =>
        new FeedCarboneRepositoryCommand(
          logger,
          pathToCarboneCsv,
          extractor,
          transformator,
          loader,
        ),
    },
    {
      provide: "FindDuplicatesCommand",
      inject: ["TortueLogger", "CarboneRepository"],
      useFactory: (
        logger: TortueLogger,
        carboneRepository: CarboneRepository,
      ) => new FindDuplicatesCommand(carboneRepository, logger),
    },
  ],
})
export class CarboneModule {}
