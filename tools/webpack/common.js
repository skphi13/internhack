const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const browsers = require('@homeaway/autoprefixer-spec');

const SRC_DIR = path.join(__dirname, 'src', 'universal');

// -- Common configuration -------------------------------------------
//
// The configuration below is shared by both development and production
// scenarios.
//
module.exports = {
    entry: {
        vendor: [
            'classnames',
            'react',
            'react-dom',
            'react-redux',
            'react-hot-loader',
            'redux',
            'superagent'
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.less', '.json', '.jpg', '.png', '.svg'],
        modules: ['node_modules', SRC_DIR]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                query: {
                    emitWarning: true,
                    quiet: true
                },
                include: /src|tests|docs/,
                exclude: /node_modules/ // eslint likes to crawl linked packages
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for Webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                },
                include: /src|tests|docs/
            },
            {
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV === 'production' ?
                        MiniCssExtractPlugin.loader :
                        {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader', options: {plugins: [autoprefixer({browsers})]}},
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production' ?
                        MiniCssExtractPlugin.loader :
                        {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'postcss-loader', options: {plugins: [autoprefixer({browsers})]}}
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: '@homeaway/cdn-images-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            files: ['src/universal/**/*.less'],
            syntax: 'less',
            emitErrors: false
        })
    ],
    stats: {
        children: false
    }
};
