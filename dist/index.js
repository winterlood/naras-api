"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const countries_json_1 = __importDefault(require("./resource/countries.json"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
function convertCountryItem(countries) {
    return countries.map((country) => {
        const { code, commonName, flagEmoji, flagImg, capital, region, population, } = country;
        return {
            code,
            commonName,
            flagEmoji,
            flagImg,
            capital,
            region,
            population,
        };
    });
}
app.get("/", (_req, res) => {
    return res.send("THIS IS NARAS API");
});
app.get("/all", (_req, res) => {
    return res.json(convertCountryItem(countries_json_1.default));
});
app.get("/search", (_req, res) => {
    let queryString = _req.query.q;
    if (Array.isArray(queryString)) {
        queryString = queryString.join(" ").toLowerCase();
    }
    if (queryString) {
        const result = countries_json_1.default.filter((country) => {
            if (country.commonName
                .toLowerCase()
                .includes(queryString))
                return true;
            if (country.officialName
                .toLowerCase()
                .includes(queryString))
                return true;
            return false;
        });
        return res.json(convertCountryItem(result));
    }
    else {
        return res.json([]);
    }
});
app.get("/code/:code", (_req, res) => {
    const { params: { code }, } = _req;
    if (!code)
        res
            .status(400)
            .send("Bad Request : 코드가 존재하지 않습니다.");
    const result = countries_json_1.default.find((country) => country.code.toLowerCase() === code.toLowerCase());
    if (result) {
        return res.json(result);
    }
    else {
        return res.status(404).send("존재하지 않는 국가");
    }
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map