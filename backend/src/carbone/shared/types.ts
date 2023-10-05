export type Csv = CarboneItem[];

export interface ICarboneItem {
  id: string;
  typeLigne: string;
  impact: string;
  unit: string;
  status: string;
  localisation: string;
  sousLocalisation: string;
  typeElement: string;
  tags: string[];
  name: string;
}

export class CarboneItem {
  public name: string;

  constructor(
    public readonly id: string,
    public readonly typeLigne: string,
    name: string,
    public readonly impact: string,
    public readonly unit: string,
    public readonly status: string,
    public readonly localisation: string,
    public readonly sousLocalisation: string,
    public readonly typeElement: string,
    public readonly tags: string[],
  ) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  public isValid() {
    return this.status.startsWith("Valide");
  }

  public isElement() {
    return this.typeLigne === "Elément";
  }

  public isInMetropole() {
    return this.localisation === "France continentale";
  }

  public estUnFacteurDEmission() {
    return this.typeElement === "Facteur d'émission";
  }

  public getKey() {
    return [
      this.typeLigne,
      this.name,
      this.unit,
      this.status,
      this.localisation,
      this.sousLocalisation,
    ].join("_");
  }

  static fromJson(json: ICarboneItem) {
    return new CarboneItem(
      json.id,
      json.typeLigne,
      json.name,
      json.impact,
      json.unit,
      json.status,
      json.localisation,
      json.sousLocalisation,
      json.typeElement,
      json.tags,
    );
  }
}
