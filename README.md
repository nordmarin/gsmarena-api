# GSMArena API (gsmarena.com)

GSMArena phone specification and finder. This project is still in early development.

The API basically reads from GSMArena website and results JSON data.

## Table of Contents

* [Implemented Features](#implemented-features)
* [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)
* [License](#license)

## Implemented Features

- [x] Get all brands
- [x] Get devices by brand
- [x] Get device specification
- [x] Find devices by keyword
- [x] Top of devices
- [x] Hot deals
- [x] Glossary
- [x] Glossary detail
- [ ] Find devices by advanced filters
- [ ] News
- [ ] Reviews

## Installation

```bash
npm i gsmarena-api
```

## Usage

### Import

```js
const gsmarena = require('gsmarena-api');
```

### Brand list

```js
const brands = await gsmarena.catalog.getBrands();
console.log(brands);
```

```json
[
  {
    "id": "apple-phones-48",
    "name": "Apple",
    "devices": 98
  }
]
```

### Device list by brand

```js
const devices = await gsmarena.catalog.getBrand('apple-phones-48');
console.log(devices);
```

```json
[
  {
    "id": "apple_iphone_13_pro_max-11089",
    "name": "iPhone 13 Pro Max",
    "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
    "description": "Apple iPhone 13 Pro Max smartphone. Announced Sep 2021..."
  }
]
```

### Device detail

```js
const device = await gsmarena.catalog.getDevice('apple_iphone_13_pro_max-11089');
console.log(device);
```

```json
{
  "name": "Apple iPhone 13 Pro Max",
  "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
  "quickSpec": [
    {
      "name": "Display size",
      "value": "6.7\""
    }
  ],
  "detailSpec": [
    {
      "category": "Network",
      "specifications": [
        {
          "name": "Technology",
          "value": "GSM / CDMA / HSPA / EVDO / LTE / 5G"
        }
      ]
    }
  ]
}
```

### Searching for device

```js
const devices = await gsmarena.search.search('casio');
console.log(devices);
```

```json
[
  {
    "id": "casio_g_zone_ca_201l-5384",
    "name": "Casio G'zOne CA-201L",
    "img": "https://fdn2.gsmarena.com/vv/bigpic/casio-gzone-ca-201l.jpg",
    "description": "Casio G'zOne CA-201L Android smartphone. Announced Mar 2013..."
  }
]
```

### Top

```js
const top = await gsmarena.top.get();
console.log(top);
```

```json
[
  {
    "category": "Top 10 by daily interest",
    "list": [
      {
        "position": 1,
        "id": "xiaomi_12-11285",
        "name": "Xiaomi 12",
        "dailyHits": 50330
      }
    ]
  }
]
```

### Deals

```js
const deals = await gsmarena.deals.getDeals();
console.log(deals);
```

```json
[
  {
    "id": "oneplus_9-10747",
    "img": "https://m.media-amazon.com/images/I/31ICm7rK-hS._SL500_.jpg",
    "url": "https://www.amazon.co.uk/dp/B08V1NKHZF?tag=gsmcom-21&linkCode=osi&th=1&psc=1",
    "name": "OnePlus 9",
    "description": "OnePlus 9 5G (UK) SIM-Free Smartphone with Hasselblad Camera for Mobile - Arctic Sky...",
    "deal": {
      "memory": "128GB 8GB RAM",
      "storeImg": "https://fdn.gsmarena.com/imgroot/static/stores/amazon-uk1.png",
      "price": 449.00,
      "currency": "£",
      "discount": 24.6
    },
    "history": [
      {
        "time": "Previous",
        "price": 479.00,
        "currency": "£"
      }
    ]
  }
]
```

### Glossary

```js
const glossary = await gsmarena.glossary.get();
console.log(glossary);
```

```json
[
  {
    "letter": "X",
    "list": [
      {
        "id": "xenon-flash",
        "name": "Xenon flash"
      }
    ]
  }
]
```

### Glossary detail

```js
const term = await gsmarena.glossary.getTerm('xenon-flash');
console.log(term);
```

```json
{
  "title": "Xenon flash - definition",
  "html": "<p>A xenon flash produces an extremely intense full-spectrum white...</p>"
}
```

## Contact

Created by [@nordmarin](https://t.me/nordmarin) - feel free to contact me!

## License

GSMArena API is MIT licensed.