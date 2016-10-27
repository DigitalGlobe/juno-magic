const path = require( 'path' );

const babelSettings = {
  plugins: [
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ]
};

module.exports = [{
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: '../juno_magic/static',
    libraryTarget: 'amd'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],
    loaders : [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [`babel?${JSON.stringify( babelSettings )}`]
    }, { 
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }, {
      test: /\.less$/, 
      loader: "style!css!less?sourceMap"
    }]
  },
  resolve: { 
    fallback: path.join( __dirname, "node_modules" )
  },
  devtool: 'cheap-module-source-map'
}];
