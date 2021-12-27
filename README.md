# GSMArena API (gsmarena.com)

GSMArena phone specification and finder. This project is still in early development.

The API basically reads from GSMArena website and results JSON data.

## Table of Contents

* [Implemented Features](#implemented-features)
* [Quick Start](#quick-start)
* [Brand list](#brand-list)
* [Device list by brand](#device-list-by-brand)
* [Device detail](#device-detail)
* [Searching for device](#searching-for-device)
* [Top](#top)
* [Deals](#deals)
* [Glossary](#glossary)
* [Glossary detail](#glossary-detail)
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

## Quick Start

```bash
npm install
npm run server
```

## Brand list

Endpoint `/api/brands`

```json
[
  {
    "name": "Apple",
    "devices": "98",
    "url": "apple-phones-48"
  }
]
```

## Device list by brand

Endpoint `/api/brand/:brand`, example `/api/brand/apple-phones-48`

```json
{
  "data": [
    {
      "name": "iPhone 13 Pro Max",
      "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
      "url": "apple_iphone_13_pro_max-11089",
      "description": "Apple iPhone 13 Pro Max smartphone. Announced Sep 2021..."
    }
  ],
  "pages": [
    {
      "number": "1"
    },
    {
      "number": "2",
      "url": "apple-phones-f-48-0-p2"
    }
  ],
  "next": "apple-phones-f-48-0-p2",
  "prev": "#1"
}
```

## Device detail

Endpoint `/api/device/:device`, example `/api/device/apple_iphone_13_pro_max-11089`

```json
{
  "title": "Apple iPhone 13 Pro Max",
  "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
  "img_url": "apple_iphone_13_pro_max-pictures-11089.php",
  "quick_spec": [
    {
      "name": "Display size",
      "value": "6.7\""
    }
  ],
  "spec_detail": [
    {
      "category": "Network",
      "specs": [
        {
          "name": "Technology",
          "value": "GSM / CDMA / HSPA / EVDO / LTE / 5G"
        }
      ]
    }
  ]
}
```

## Searching for device

Endpoint `/api/search/:device`, example `/api/search/casio`

```json
[
  {
    "name": "Casio G'zOne CA-201L",
    "img": "https://fdn2.gsmarena.com/vv/bigpic/casio-gzone-ca-201l.jpg",
    "url": "casio_g_zone_ca_201l-5384",
    "description": "Casio G'zOne CA-201L Android smartphone. Announced Mar 2013..."
  }
]
```

## Top

Endpoint `/api/top`

```json
[
  {
    "category": "Top 10 by daily interest",
    "list": [
      {
        "position": "1",
        "name": "Xiaomi 12",
        "url": "xiaomi_12-11285",
        "daily_hits": "50,330"
      }
    ]
  }
]
```

## Deals

Endpoint `/api/deals`

```json
[
  {
    "image": "https://m.media-amazon.com/images/I/31ICm7rK-hS._SL500_.jpg",
    "url": "https://www.amazon.co.uk/dp/B08V1NKHZF?tag=gsmcom-21&linkCode=osi&th=1&psc=1",
    "title": "OnePlus 9",
    "link": "oneplus_9-10747",
    "description": "OnePlus 9 5G (UK) SIM-Free Smartphone with Hasselblad Camera for Mobile - Arctic Sky...",
    "deal": {
      "memory": "128GB 8GB RAM",
      "store_img": "https://fdn.gsmarena.com/imgroot/static/stores/amazon-uk1.png",
      "price": "£ 449.00",
      "discount": "24.6"
    },
    "history": [
      {
        "time": "Previous",
        "price": "£ 479.00"
      }
    ]
  }
]
```

## Glossary

Endpoint `/api/glossary`

```json
[
  {
    "letter": "X",
    "list": [
      {
        "link": "xenon-flash",
        "name": "Xenon flash"
      }
    ]
  }
]
```

## Glossary detail

Endpoint `/api/glossary/:term`, example `/api/glossary/xenon-flash`

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