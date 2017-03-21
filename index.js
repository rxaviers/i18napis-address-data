'use strict';

let generatedata = require('./generator/tasks/generatei18napiData');

generatedata.generatei18napiData(function() {
    console.log('done deal');
});