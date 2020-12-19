const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/public/scripts/index.js',
    output: {
        filename: 'scripts/index.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/public/images', to: 'images' },
                { from: 'src/public/sitemap.xml', to: 'sitemap.xml' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
    },
};