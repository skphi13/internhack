const applicationRouteHandler = require('./application');
const page1ApiRouteHandler = require('./page1ApiRouteHandler');

function routes(config) {
    const appPrefix = config.get('urlPrefix');

    return [
        { // Redirect for development
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                return reply.redirect(`/${appPrefix}`);
            },
            config: {id: 'root'}
        },
        { // Route for react app
            method: 'GET',
            path: `/${appPrefix}`,
            handler: applicationRouteHandler,
            config: {id: 'application'}
        },
        { // Route for API
            method: 'GET',
            path: `/${appPrefix}/api/page1`,
            handler: page1ApiRouteHandler
        },
        { // Route for example POST
            method: 'POST',
            path: `/${appPrefix}/api/name`,
            handler: (request, reply) => {
                return reply(`Hi ${request.payload.name}`);
            },
            config: {id: 'examplePost'}
        }
    ];
}

module.exports = routes;
