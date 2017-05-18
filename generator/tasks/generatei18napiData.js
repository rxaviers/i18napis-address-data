'use strict';

const http = require('http'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    srcFolder = path.join(require.resolve('../../').replace('index.js', ''), 'src', 'main', 'source', 'google'),
    options = {
        port: 80,
        hostname: 'i18napis.appspot.com',
        method: 'GET',
        path: '/address/data'
    };

function generatei18napiData(doneCallback) {
    let req = http.request(options, res => {
        res.on('data', (d) => {
            let addressCountriesData = JSON.parse(d);
            // Extracting countries from string like AD~AE~AF~AG~AI~AL~AM~AO~AQ
            // to iterate and call i18napis.appspot.com to get data
            let countries = addressCountriesData.countries.split('~');
            //default fallback countrycode
            countries.push('ZZ');
            // get data for each country
            async.each(countries, (country, asyncDoneCallBack) => {
                let countryOptions = Object.assign(options, { path: `/address/data/${country}` });
                var jsonFile = path.join(srcFolder, country + '.json');
                let countryReq = http.request(countryOptions, countryRes => {
                    console.log(`Call for...${country} statusCode...${countryRes.statusCode}`);
                    let rawData = '';
                    countryRes.setEncoding('utf8');
                    countryRes.on('data', (d) => rawData += d);
                    countryRes.on('end', () => {
                        fs.writeFile(jsonFile, JSON.stringify(JSON.parse(rawData), null, 2), function(err) {
                            if (err) {
                                console.log(err);
                            }
                            asyncDoneCallBack(); // tell async this country is done
                        });
                    });
                });
                countryReq.on('error', err => {
                    console.log(err.stack);
                    asyncDoneCallBack(); // skip this country if the request encountered an error
                });
                countryReq.end();
            },
                err => {
                    if (err) {
                        console.log(err.stack);
                    }
                    doneCallback();
                });
        });
    });
    req.on('error', err => {
        if (err) {
            console.log(err.stack);
        }
        doneCallback();
    });
    req.end();
}

exports.generatei18napiData = generatei18napiData;
