import * as fs from "node:fs";
import * as path from "node:path";

export class PathIsNotAbsoluteError extends Error {
  constructor(actualPath: string) {
    super(`Path ${actualPath} is not absolute`);
  }
}

export class CsvFileExtractor {
  execute(pathToFile: string): string | PathIsNotAbsoluteError {
    if (!path.isAbsolute(pathToFile)) {
      return new PathIsNotAbsoluteError(pathToFile);
    }
    return fs.readFileSync(pathToFile, { encoding: "latin1" });
  }
}
