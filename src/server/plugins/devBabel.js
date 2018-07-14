
/**
 * Transpile on-the-fly in development mode
 */
function plugin(server, options, next) {
    if (process.env.DEV_TOOLS === 'true' || process.env.npm_lifecycle_event === 'start:server') {
        require('@babel/register')();
    }
    next();
}

module.exports.register = plugin;

module.exports.register.attributes = {
    name: 'dev-babel',
    version: '0.1.0'
};