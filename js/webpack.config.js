var version = require('./package.json').version;

var loaders = [
    { test: /\.json$/, loader: 'json-loader' },
];


module.exports = [
    {// Notebook extension
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: '../juno_magic/static',
            libraryTarget: 'amd'
        }
    },
];
