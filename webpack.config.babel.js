const config = {
    entry: './src/index.js',
    output: {
      filename: 'pure-slider.js',
      path: __dirname + '/dist',
      publicPath: '/',
      library: 'PureSlider',
      libraryTarget: 'var',
      umdNamedDefine: false
    },
    devtool: 'source-map',
    module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ],
        resolve: {
          extensions: ['', '.js']
        }
    }
};

export default config;
