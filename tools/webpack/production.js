const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./common');

// -- Production options----------------------------------------------
//
// The deployed client-side code is packaged with these options. We are
// packaging and minifying the files from the src/universal directory.
//
module.exports = merge(commonConfig, {

    mode: 'production',

    entry: {
        bundle: './src/universal/index.js'
    },

    output: {
        path: path.join(process.cwd(), 'build/static'),
        filename: '[name].[chunkhash].js'
    },

    optimization: {
        concatenateModules: true,

        // Keep the runtime chunk seperated to enable long term caching
        // https://twitter.com/wSokra/status/969679223278505985
        runtimeChunk: 'single',

        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    parse: {
                        // we want uglify-js to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false
                    },
                    mangle: {
                        // This gets around a Safari 10 bug:
                        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/92#issuecomment-324818437
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true
                    }
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true
            }),

            // Minify entire final CSS file rather than each individually
            new OptimizeCSSAssetsPlugin({cssProcessorOptions: {safe: true}})
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),

        // Hashing plugins for CDN
        //    https://webpack.js.org/guides/caching/

        // Export the mapping of unhashed file to hashed file
        new ManifestPlugin(),

        // Make sure module IDs are deterministic within the chunk manifest
        new webpack.HashedModuleIdsPlugin()
    ],

    devtool: 'source-map'
});
