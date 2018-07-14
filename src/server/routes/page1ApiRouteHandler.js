const pageApi = require('../api');

function page1ApiRouteHandler(request, reply) {
    // pageAPI is the api call for all server-loaded page data
    return pageApi.read(request).then(reply);
}

module.exports = page1ApiRouteHandler;