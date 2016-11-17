const path = require( 'path' );
const webpack = require( 'webpack' );

const envVars = [ 'NODE_ENV' ];

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
    //preLoaders: [{
      //test: /\.js$/,
      //loader: 'source-map-loader'
    //}],
    loaders : [{
      test: /\.gif$/,
      loader: 'url-loader'
    }, {
      test: /\.png$/,
      loader: 'url-loader'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [`babel?${JSON.stringify( babelSettings )}`]
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=1!postcss-loader?sourceMap'
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?name=fonts/[name].build-[hash].[ext]&limit=10000'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: { 
    fallback: path.join( __dirname, "node_modules" ),
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
  //devtool: 'inline-source-map',
  plugins: [
    new webpack.EnvironmentPlugin( envVars ),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^mock-firmata$/),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/)
  ],
  postcss: function() {
    return [
      require( 'postcss-import' )({ addDependencyTo: webpack }),
      require( 'postcss-modules-values' ),
      require( 'postcss-nested' ),
      require( 'autoprefixer' )
    ];
  }
}];
