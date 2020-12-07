const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
	mode: 'none',
    entry: {
        index: "./src/assets/scripts/index-app.js",
        form: "./src/assets/scripts/form.js"
    },
    output: {
        filename: "[name].bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    // plugins: [
    //     new UglifyJSPlugin({
    //         sourceMap: true
    //     })
    // ]
};

module.exports = config;