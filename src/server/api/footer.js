const HttpClient = require('@homeaway/http-client');

/**
 * This example shows how to setup caching using catbox:
 * https://github.com/hapijs/catbox
 *
 * Not many services can be cached and this example uses a memory
 * cache which means each individual instance of your app will be
 * caching independently of one another.
 */

let cache;
let footerClient;

function createClient(config) {
    // Get the config values from the manifest
    const {baseUrl, connectionTimeout, timeout} = config.get('headerFooterService');

    footerClient = new HttpClient('FooterClient', {
        baseUrl,
        timeout,
        connectionTimeout
    });
}

// Mutate data as needed
function mutate(response) {
    const results = response.payload;
    return results;
}

// Generate cache entry
function generateFunc(cacheToken, next) {
    return footerClient.get(cacheToken.url, cacheToken.options)
        .then(mutate)
        .then((results) => {
            return next(null, results);
        })
        .catch((err) => {
            err.message = `FooterClient: ${err.message} - ${cacheToken.url}. Site: ${cacheToken.id}`;
            return next(err);
        });
}

// Initialize Catbox policy cache
function initializePolicyCache(server) {
    return server.cache({
        expiresIn: 10 * 60 * 1000,
        staleIn: 9 * 60 * 1000,
        staleTimeout: 5 * 1000,
        segment: footerClient._service,
        generateTimeout: false,
        generateFunc
    });
}

// Read cache value
function getCacheValue(cacheKey, url, options, request) {
    // Caches are stored on the server
    /* istanbul ignore else */
    if (!cache) {
        cache = initializePolicyCache(request.server);
    }
    // Caches accept a token, the id property is used for it's key
    const cacheKeyToken = {
        id: cacheKey,
        url,
        options
    };
    // Convert callback to Promise
    return new Promise((resolve, reject) => {
        // Get the value for the token.id, call the generateFunc if it doesn't exist. See the #initializePolicyCache
        cache.get(cacheKeyToken, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function read(request) {
    const site = request.plugins.SiteResolution.site.name;

    /* istanbul ignore else */
    if (!footerClient) {
        createClient(request.server.app.config);
    }
    const url = '/footer';
    const options = {
        parentContext: request,
        params: {
            site
        },
        headers: {
            'X-HomeAway-Restfully': true
        }
    };
    return getCacheValue(site, url, options, request);
}

module.exports = {
    read
};
