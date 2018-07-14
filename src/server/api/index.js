const readHeader = require('./header').read;
const readFooter = require('./footer').read;
const readTranslations = require('./translations').read;
const mutatePageData = require('./mutatePageData').mutate;

/**
 * Aggregates multiple API calls into a single read call.
 * Returns a promise.
 */

function merge(results) {
    // TODO Review ramifications of shallow assign, rather than deep assign here.
    const raw = results.reduce((a, b) => {
        return Object.assign(a, b);
    }, {});
    return raw;
}

/**
 * Read the data
 * @param {Object} request - request object
 * @return {Promise<Object>} - Property view data
 */
function read(request) {
    const startTime = Date.now();
    return Promise.all([
        readHeader(request),
        readFooter(request),
        readTranslations(request)
    ])
        .then(merge)
        .then((results) => mutatePageData(results, request))
        .then((results) => {
            request.log(['perf'], `name='pageApiRead' elapsed=${Date.now() - startTime}`);
            return results;
        });
}

module.exports = {
    read
};
