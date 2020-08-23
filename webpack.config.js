const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/public/scripts/index.js',
    output: {
        filename: 'public/scripts/index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/public/images', to: 'public/images' },
                { from: 'src/public/styles', to: 'public/styles' },
                { from: 'src/public/sitemap.xml', to: 'public/sitemap.xml' },
            ],
        }),
    ],
};