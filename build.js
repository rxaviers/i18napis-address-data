'use strict';

const generateData = require('./lib/generatei18napiData');

generateData('dist')
    .then(() => console.log('Done'))
    .catch(error => console.error('Oops', error));
