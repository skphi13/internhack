const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./common');

// -- Development options----------------------------------------------
//
// During development, webpack is used in "hot module replacement" mode.
// The code in the src/universal directory is packaged and served to
// the browser. When the code in that directory is changed, it will be
// repackaged and the browser will auto-rerender the changed module.
//
module.exports = merge(commonConfig, {

    mode: 'development',

    entry: {
        bundle: [
            './src/universal/index.js',
            '@homeaway/catalyst-scripts-webpack/hot-logger' // HMR logging to the browser
        ]
    },

    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'static/[name].js'
    },

    optimization: {
        // Split chunks. Replaces CommonsChunkPlugin().There are some cool things we can do here:
        // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
        splitChunks: {
            name: 'vendor',
            minChunks: Infinity
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin()
    ],

    // Options for webpack-serve, the development server:
    // https://github.com/webpack-contrib/webpack-serve#serveoptions
    // Catalyst-scripts defaults:
    // https://github.homeawaycorp.com/Catalyst/catalyst-scripts/blob/master/packages/catalyst-scripts-starter-webpack/bin/catalyst-webpack-dev-server
    serve: {
        port: 8080
    },

    // Any dev proxying can be done here.
    // For proxy options, see:
    // https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    proxy: {
        '*': {
            target: 'http://localhost:8082', // needs to match hapi port
            onError: (err, req, res) => {
                if (err.code === 'ECONNREFUSED') {
                    // Try again after 3 secs
                    res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8', 'Refresh': '3'});
                    res.end('<p style="font-family:sans-serif;">Connecting to hapi server. One moment...<br/><progress style="width:300px;"></progress></p>');
                } else {
                    throw err;
                }
            }
        }
    },

    // See: https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'cheap-module-inline-source-map'
});
