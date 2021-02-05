const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;

module.exports = {
    entry: ['./test/entry.js'],
    output: {
        path: __dirname,
        filename: 'build/main.js',
        chunkFilename: 'build/bundle.[name].[chunkhash].js'
    },
    optimization: {
        concatenateModules: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
