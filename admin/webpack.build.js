// var loaders = require("./loaders");
// var preloaders = require("./preloaders");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/app.ts'],
    output: {
        filename: 'build.js',
        path: 'dist'
    },
    devtool: 'source-map',
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        ),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     inject: 'body',
        //     hash: true
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module:{
        // preLoaders:preloaders,
        // loaders: loaders
        loaders: [
            {test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$'},
            { test: /\.ts$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")
            }
        ]
    },
    tslint: {
        emitErrors: true,
        failOnHint: true
  }
};