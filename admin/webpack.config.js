var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

// http://www.jbrantly.com/typescript-and-webpack/  配置项
module.exports = {
    entry: './src/app.ts', //入口文件，webpack从这里开始分析
    output: {
        path: __dirname + '/www/dist', //输出目录
        filename: 'app.js', //输出文件名
        publicPath: '/dist', //启动webpack-dev-server服务时，实际上不生成文件，这里对应的是内存中的目录；
    },
    devServer: {
        contentBase: "www", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        progress: true, //显示进度
        colors: true, //终端中输出结果为彩色
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8000"
    },
    devtool: 'source-map', //source-map
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    plugins: [
        new ExtractTextPlugin("styles.css"), //生成对应的css文件
    ],
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },
            { test: /\.ts$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader?sourceMap", "css-loader?sourceMap")
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // }
            // {
            //     test: path.join(__dirname, 'es6'),
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2013']
            //     }
            // }
        ]
    },
    babel: {
        presets: ['es2015']
    },
    // externals: {
    //     jquery: true
    // }
}