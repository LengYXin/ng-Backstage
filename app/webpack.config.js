var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// http://www.jbrantly.com/typescript-and-webpack/  配置项
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
        path: './www/dist/',
        publicPath: '/www/dist/', //启动服务 内存地址 不生成 文件
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        //压缩文件
        // new webpack.optimize.UglifyJsPlugin()
        new ExtractTextPlugin("styles.css"), //生成对应的css文件
    ],
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")
            },
        ]
    }

}