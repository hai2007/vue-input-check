const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: './',
        compress: false,
        host: '127.0.0.1',
        port: '20000',
        hot: true,
        inline: true,
        historyApiFallback: true,
        proxy: {
        },
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    mode: 'development'
});
