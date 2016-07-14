var version = require('./package.json').version;

var loaders = [
    { 
      test: /\.json$/, loader: 'json-loader' 
    }
];

const babelSettings = {
  plugins: [
    'transform-flow-strip-types',
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ]
};


module.exports = [
    {
      // Notebook extension
      entry: './src/extension.js',
      output: {
          filename: 'extension.js',
          path: '../juno_magic/static',
          libraryTarget: 'amd'
      }
    }, {
      entry: './src/components/index.js',
      output: {
        path: '../juno_magic/static/',
        filename: 'components.js',
        libraryTarget: 'amd'
      },
      externals: {'react': 'react'},
      module : {
        loaders : [
          {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: [`babel?${JSON.stringify( babelSettings )}`]
          }
        ]
      }
    }
];
