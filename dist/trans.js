"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countries_origin_json_1 = __importDefault(require("./resource/countries-origin.json"));
const fs_1 = __importDefault(require("fs"));
const result = countries_origin_json_1.default.map((country) => {
    const { capital, region, flag: flagEmoji, flags: { png: flagImg }, name: { common: commonName, official: officialName }, population, maps: { googleMaps: googleMapURL }, cca3: code, } = country;
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
});
fs_1.default.writeFile("countries.json", JSON.stringify(result), (err) => {
    if (err) {
        console.error(err);
    }
});
//# sourceMappingURL=trans.js.map