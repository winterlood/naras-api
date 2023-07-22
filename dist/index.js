"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const countries_json_1 = __importDefault(require("./resource/countries.json"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 8080;
// Validator
// app.use(function (req, res, next) {
//   const authorization = req.headers.authorization;
//   if (authorization === process.env.SECRET_KEY) {
//     next();
//   } else {
//     return res
//       .status(403)
//       .send("Authorization 키를 확인하세요");
//   }
// });
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