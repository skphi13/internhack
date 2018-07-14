/**
 * Server-side support for LESS and CSS imports. Also supports
 * CSS modules: https://github.com/css-modules/css-modules
 */
function plugin(server, options, next) {
    const hook = require('css-modules-require-hook');
    const lessParser = require('postcss-less').parse;
    const generateScopedName = '[name]__[local]___[hash:base64:5]';

    hook({
        extensions: '.css',
        generateScopedName
    });

    hook({
        extensions: '.less',
        generateScopedName,
        processorOpts: {parser: lessParser}
    });

    next();
}

module.exports.register = plugin;

module.exports.register.attributes = {
    name: 'ssr-styles-support',
    version: '0.1.0'
};
