# NARAS API

UDEMY 프리미엄 컨텐츠로 출시 예정인 React & Next 강의의 중간 프로젝트 **NARAS**에서 사용하는 OPEN API 입니다.

본 API에서 제공하는 모든 데이터는 [https://restcountries.com/](https://restcountries.com/) 에서 제공하는 데이터를 기반으로 제작되었습니다.

## API Endpoints

### All

등록되어 있는 모든 국가 데이터를 반환합니다.

```
(GET)
https://naras-api.vercel.app/all
```

<details>
<summary>호출 결과 미리보기</summary>

```
[
  {
    "code": "ABW",
    "commonName": "Aruba",
    "flagEmoji": "🇦🇼",
    "flagImg": "https://flagcdn.com/w320/aw.png",
    "capital": [
      "Oranjestad"
    ],
    "region": "Americas",
    "population": 106766
  },
  ...
]
```

</details>

### Search
국가 이름을 기준으로 검색 결과를 반환합니다.

```
(GET)
https://naras-api.vercel.app/search?q={query}
```

<details>
<summary>호출 결과 미리보기</summary>

```
[
  {
    "code": "ABW",
    "commonName": "Aruba",
    "flagEmoji": "🇦🇼",
    "flagImg": "https://flagcdn.com/w320/aw.png",
    "capital": [
      "Oranjestad"
    ],
    "region": "Americas",
    "population": 106766
  },
  ...
]
```

</details>

### Code
일치하는 코드를 갖는 국가의 자세한 정보를 반환합니다.

```
(GET)
https://naras-api.vercel.app/code/{code}
```

<details>
<summary>호출 결과 미리보기</summary>

```
{
  "code": "KOR",
  "commonName": "South Korea",
  "officialName": "Republic of Korea",
  "flagEmoji": "🇰🇷",
  "flagImg": "https://flagcdn.com/w320/kr.png",
  "capital": [
    "Seoul"
  ],
  "region": "Asia",
  "population": 51780579,
  "googleMapURL": "https://goo.gl/maps/7ecjaJXefjAQhxjGA"
}
```

</details>
