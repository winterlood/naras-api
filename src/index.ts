import express, { Request, Response } from "express";
import cors from "cors";
import countries from "./resource/countries.json";
import { CountryFullInfo, CountryItem } from "./types";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

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

function convertCountryItem(countries: CountryFullInfo[]) {
  return countries.map((country) => {
    const {
      code,
      commonName,
      flagEmoji,
      flagImg,
      capital,
      region,
      population,
    } = country;
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

app.get("/", (_req: Request, res: Response) => {
  return res.send("THIS IS NARAS API");
});

app.get(
  "/all",
  (_req: Request, res: Response<CountryItem[]>) => {
    return res.json(convertCountryItem(countries));
  }
);

app.get(
  "/search",
  (_req: Request, res: Response<CountryItem[]>) => {
    let queryString = _req.query.q;
    if (Array.isArray(queryString)) {
      queryString = queryString.join(" ").toLowerCase();
    }
    if (queryString) {
      const result = countries.filter((country) => {
        if (
          country.commonName
            .toLowerCase()
            .includes(queryString as string)
        )
          return true;
        if (
          country.officialName
            .toLowerCase()
            .includes(queryString as string)
        )
          return true;
        return false;
      });
      return res.json(convertCountryItem(result));
    } else {
      return res.json([]);
    }
  }
);

app.get(
  "/code/:code",
  (
    _req: Request,
    res: Response<CountryFullInfo | string>
  ) => {
    const {
      params: { code },
    } = _req;
    if (!code)
      res
        .status(400)
        .send("Bad Request : 코드가 존재하지 않습니다.");
    const result = countries.find(
      (country) =>
        country.code.toLowerCase() === code.toLowerCase()
    );
    if (result) {
      return res.json(result);
    } else {
      return res.status(404).send("존재하지 않는 국가");
    }
  }
);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
