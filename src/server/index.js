// Babel creates sourcemaps, but the following fixes line numbers on stack traces
require('source-map-support').install();

const path = require('path');
const Hapi = require('hapi');
const hoek = require('hoek');

const server = new Hapi.Server();

// Compose server with Catalyst
server.register({
    register: require('@homeaway/catalyst'),
    options: {
        userConfigPath: path.resolve(__dirname, 'manifest.json')
    }
}, function serverRegistered(regErr) {
    hoek.assert(!regErr, regErr);

    // Start server
    /* istanbul ignore next */
    server.start(function serverStarted(startErr) {
        hoek.assert(!startErr, startErr);

        server.connections.forEach(function connectionOpened(connection) {
            server.log(['info'], `server running: ${connection.settings.labels} ${connection.info.uri}`);
        });
    });
});

// Export for testing purposes
module.exports = server;
