const HttpClient = require('@homeaway/http-client');

let headerClient;

function createClient(config) {
    // Get the config values from the manifest
    const {baseUrl, connectionTimeout, timeout} = config.get('headerFooterService');

    headerClient = new HttpClient('HeaderClient', {
        baseUrl,
        timeout,
        connectionTimeout
    });
}

function mutate(response) {
    const results = response.payload;
    return results;
}

function read(request) {
    const site = request.plugins.SiteResolution.site.name;

    /* istanbul ignore else */
    if (!headerClient) {
        createClient(request.server.app.config);
    }
    const url = '/header';
    const options = {
        parentContext: request,
        params: {
            site
        },
        headers: {
            'X-HomeAway-Restfully': true
        }
    };
    return headerClient.get(url, options)
        .then(mutate)
        .catch((err) => {
            err.message = `HeaderClient: ${err.message} - ${url}. Site: ${site}`;
            throw err;
        });
}

module.exports = {
    read
};
