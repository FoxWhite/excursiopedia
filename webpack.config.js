var path = require('path');
var webpack = require("webpack");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    
    entry: [
        './index',
        'webpack-hot-middleware/client'
    ],
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    ],    
    module: {
        loaders: [             
            // SASS
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              loader: 'style!css!sass',
            },

            // jsx (React), js
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['babel'],
                include: __dirname
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};