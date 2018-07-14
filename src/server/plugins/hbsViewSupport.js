const hoek = require('hoek');
const path = require('path');

/**
 * Configure the hapi view to resolve handlebars templates
 */
function plugin(server, options, next) {
    server.register(require('vision'), (err) => {
        hoek.assert(!err, err);

        const config = server.app.config;

        // Setup handlebars for our base page template
        server.views({
            engines: {
                hbs: require('handlebars')
            },
            relativeTo: path.join(__dirname, '..'),
            context: {
                versions: config.get('versions'),
                errorUrl: `${config.get('urlPrefix')}/errors`
            }
        });

        // Declare routes
        server.route(require('../routes')(config));

        next();
    });
}

module.exports.register = plugin;

module.exports.register.attributes = {
    name: 'hbs-render',
    version: '0.1.0'
};
