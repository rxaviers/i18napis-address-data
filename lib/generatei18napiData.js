'use strict';

const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const request = require('request-promise-native');

const writeFile = promisify(fs.writeFile);
const BASE_URL = 'https://chromium-i18n.appspot.com/ssl-address';

const generatei18napiData = async function(distDir) {
    const data = await request(`${BASE_URL}/data`);

    const addressCountriesData = JSON.parse(data);

    // Extracting countries from string like AD~AE~AF~AG~AI~AL~AM~AO~AQ
    // to iterate and call i18napis.appspot.com to get data
    const countries = addressCountriesData.countries.split('~');

    // Add default fallback countrycode.
    countries.push('ZZ');

    // Get data for each country.
    // TODO: Enqueue this.
    return Promise.all(countries.map(async (country) => {
        const jsonFile = path.join(distDir, `${country}.json`);
        try {
            const countryData = await request(`${BASE_URL}/data/${country}`);
            await writeFile(jsonFile, JSON.stringify(JSON.parse(countryData), null, 2));
            console.log('✅', jsonFile);
        } catch(error) {
            console.error('⚠️', jsonFile, error.message);
        }
    }));
}

module.exports = generatei18napiData;
