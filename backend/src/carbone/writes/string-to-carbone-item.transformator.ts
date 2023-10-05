import { CarboneItem, Csv } from "../shared/types";

export class StringToCarboneItemTransformator {
  execute(rawCsv: string): Csv {
    const headerAndContent = rawCsv
      .split("\n")
      .filter((line) => line.length !== 0)
      .map((line) =>
        line.split(";").map((cell) => cell.replaceAll(`"`, "").trim()),
      );

    const [headers, ...lines]: string[][] = headerAndContent;
    const keysInList: string[] = [];
    return lines
      .map(this.toListOfObjects(headers))
      .filter(this.cleanUpDataset(keysInList))
      .sort((itemA: CarboneItem, itemB: CarboneItem) =>
        itemA.getKey() < itemB.getKey() ? -1 : 1,
      );
  }

  private cleanUpDataset(keysInList: string[]) {
    return (item: CarboneItem) => {
      if (
        !item.isValid() ||
        !item.isElement() ||
        !item.isInMetropole() ||
        !item.estUnFacteurDEmission()
      ) {
        return false;
      } else {
        const keyAlreadyExists = keysInList.includes(item.getKey());
        if (keyAlreadyExists) {
          return false;
        } else {
          keysInList.push(item.getKey());
          return true;
        }
      }
    };
  }

  private toListOfObjects(headers: string[]) {
    return (line, i) => this.toObject(headers, i, line);
  }

  private toObject(
    headers: string[],
    index: number,
    line: string[],
  ): CarboneItem {
    const item = line.reduce((obj: object, cell: string, i: number) => {
      const header: string = headers[i];
      obj[header] = cell;
      return obj;
    }, {});

    return new CarboneItem(
      String(index),
      item["Type Ligne"],
      [
        item["Nom base français"],
        item["Nom attribut français"],
        item["Nom frontière français"],
        item["Type poste"],
      ]
        .filter((value) => value && value.length !== 0)
        .join(" "),
      item["Total poste non décomposé"],
      item["Unité français"],
      item["Statut de l'élément"],
      item["Localisation géographique"],
      item["Sous-localisation géographique français"],
      item[`Type de l'élément`],
      item["Tags français"].toLowerCase().split(","),
    );
  }
}
