# i18napis Address Data

***Unofficial*** version controlled JSON distribution [i18napis Address Data](http://i18napis.appspot.com/address).

It should be noted that the "official" data is distributed via a web service. The JSON data contained in this package is provided as a convenience for the development community, and is programatically generated from the corresponding service using the JSON conversion utility provided here.

## Goals

- The data in this package is intended to serve as a common reference point for most JavaScript packages.
- Allow i18n libraries to define i18napis Address Data as versioned dependency.

### What's not included

No code other than the conversion utility is included.

### What's included

The JSON files for each `data/<country>` found in the official service. The structure looks like the below.

```
{
  "lang": "en",
  "upper": "ACNOSZ",
  "zipex": "H3Z 2Y7,V8X 3X4,T0L 1K0,T0H 1A0,K1A 0B1",
  "sub_zips": "T~V~R~E~A~X0E|X0G|X1A~B~X0A|X0B|X0C~K|L|M|N|P~C~G|H|J|K1A~S|R8A~Y",
  "zip": "[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z] ?\\d[ABCEGHJ-NPRSTV-Z]\\d",
  "require": "ACSZ",
  "id": "data/CA",
  "languages": "en~fr",
  "sub_keys": "AB~BC~MB~NB~NL~NT~NS~NU~ON~PE~QC~SK~YT",
  "key": "CA",
  "posturl": "https://www.canadapost.ca/cpo/mc/personal/postalcode/fpc.jsf",
  "fmt": "%N%n%O%n%A%n%C %S %Z",
  "sub_names": "Alberta~British Columbia~Manitoba~New Brunswick~Newfoundland and Labrador~Northwest Territories~Nova Scotia~Nunavut~Ontario~Prince Edward Island~Quebec~Saskatchewan~Yukon",
  "name": "CANADA"
}
```

## Status

Latest official release is version 2017.8.0, published on 2017-08-21. Last checked for updates on 2017-12-06.

## Usage

Installation using [NPM](https://www.npmjs.com):

```
npm install --save i18napis-address-data
```

We follow a `<major>.<minor>.<patch>` version based on the following. The major and minor versions corresponds to the year and month where any data difference was found and made available here. The patch version is independent and used for any necessary package fixes.

On your application, you can access i18napis Address data by importing the `"i18napis-address-data"` module.

```javascript
import i18napisAddressData from "i18napis-address-data";
```

## License

MIT © PayPal 2017
