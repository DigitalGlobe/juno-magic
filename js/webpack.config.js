const path = require( 'path' );
const webpack = require( 'webpack' );

const envVars = [ 'NODE_ENV' ];

const babelSettings = {
  cacheDirectory: true,
  plugins: [
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ]
};

module.exports = [{
  cache: true,
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: '../juno_magic/static',
    libraryTarget: 'amd'
  },
  module: {
    loaders : [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [`babel?${JSON.stringify( babelSettings )}`]
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=1!postcss-loader?sourceMap'
    }]
  },
  resolve: { 
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  plugins: [
    new webpack.EnvironmentPlugin( envVars ),
    new webpack.IgnorePlugin(/^mock-firmata$/),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/)
  ]
}];
