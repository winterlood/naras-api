import countries from "./resource/countries-origin.json";
import fs from "fs";
import { CountryFullInfo } from "./types";

const result: CountryFullInfo[] = countries.map(
  (country) => {
    const {
      capital,
      region,
      flag: flagEmoji,
      flags: { png: flagImg },
      name: { common: commonName, official: officialName },
      population,
      maps: { googleMaps: googleMapURL },
      cca3: code,
    } = country;
    return {
      code,
      commonName,
      officialName,
      flagEmoji,
      flagImg,
      capital,
      region,
      population,
      googleMapURL,
    };
  }
);

fs.writeFile(
  "countries.json",
  JSON.stringify(result),
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
