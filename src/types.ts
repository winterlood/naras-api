export interface CountryFullInfo {
  code: string;
  commonName: string;
  officialName: string;
  flagEmoji: string;
  flagImg: string;
  capital: string[];
  region: string;
  population: number;
  googleMapURL: string;
}

export interface CountryItem
  extends Omit<
    CountryFullInfo,
    "officialName" | "googleMapURL"
  > {}
