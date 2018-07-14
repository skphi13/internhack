const fs = require('fs');
const environment = require('@homeaway/environment-resolver');
const pkg = require('../../../package.json');
const appName = pkg.name.replace('@homeaway/', '');

let appversion;
try {
    // version.txt during a Jenkins build
    appversion = fs.readFileSync('./version.txt', 'utf8');
} catch (e) {
    appversion = '-1';
}

/**
 * Create the analytics data layer object
 **/

function analyticsDataLayer({site, pagename}) {
    let environmentName = environment.getName();

    // ADL is expecting "dev" for development
    if (environmentName === 'development') {
        environmentName = 'dev';
    }

    return JSON.stringify({
        appversion,
        publicuuid: '-1',
        monikerbrand: site.name,
        analyticsbrand: site.name,
        appname: appName,
        appenvironment: environmentName,
        pagetype: 'TODO',
        pageflow: '-1',
        pagename,
        visitortype: 'traveler',
        sensitive: 'false'
    });
}

module.exports = analyticsDataLayer;
