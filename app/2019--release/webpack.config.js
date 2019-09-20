// import ExtractTextPlugin from 'extract-text-webpack-plugin';
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
// loaders
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract CSS into separates files - for webpack v.4
// helpers
const webpack = require('webpack');

// check if we are in production or development mode
const isProd = process.env.NODE_ENV === 'production';

// ////////////////////// FILEPATHS ///////////////////////
// ////////////////////////////////////////////////////////
// const imagesFolder = 'client/assets/img/';
const buildFolder = 'dist';
const sourceFolder = 'app';
const PATHS = {
  build: path.resolve(__dirname, buildFolder),
  src: path.resolve(__dirname, sourceFolder),
  node_modules: path.resolve(__dirname, 'node_modules'),
  appJS: path.resolve(__dirname, `${sourceFolder}/client/js/app.js`),
  indexHTML: path.resolve(__dirname, `${sourceFolder}/client/index.html`),
};

// ////////////////////// PLUGINS ////////////////////////
// ///////////////////////////////////////////////////////
const HtmlPluginOptions = {
  template: PATHS.indexHTML,
  minify: {
    collapseWhitespace: true,
  },
  hash: true,
};

const MiniCssExtractPluginOptions = {
  filename: isProd ? '[name].[hash].css' : 'app.css',
  chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
};

const devServerOptions = {
  contentBase: PATHS.build,
  compress: true,
  port: 4000,
  stats: 'errors-only',
  open: true,
  hot: true,
  openPage: '',
  // host: '192.168.1.9'
  host: '127.0.0.1',
};

const pluginsDev = [
  autoprefixer,
  new HtmlPlugin(HtmlPluginOptions),
  new MiniCssExtractPlugin(MiniCssExtractPluginOptions),
  new webpack.HotModuleReplacementPlugin(),
];

// const pluginsProd = [ require('autoprefixer')];

// const pluginsList = isProd ? pluginsProd : pluginsDev;

const pluginsList = pluginsDev;

// ////////////////////// LOADERS ////////////////////////
// ///////////////////////////////////////////////////////
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: 'inline',
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions' })];
    },
  },
};

const scss = {
  loader: 'sass-loader',
  options: {
    includePaths: ['app/client/scss', PATHS.node_modules],
  },
};

const styles = {
  test: /\.(sa|sc|c)ss$/, // any file with this extension should be compiled with the following chain of loaders [called in the reverse order: end to start]:
  use: [
    isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    postcss,
    scss,
  ],
};

const javascript = {
  test: /\.(js|jsx)$/,
  use: 'babel-loader',
  exclude: /node_modules/,
};

const images = {
  test: /\.(jpe?g|svg|png|gif)$/i,
  exclude: /node_modules/,
  loader: 'url-loader',
  options: {
    limit: 3000,
    // name: '[path][name].[ext]?[hash]', //creates subfolders as the mother path
    name: '[path][name].[ext]', // creates subfolders as the mother path
    publicPath: isProd ? 'https://d267jrn1ysxlb3.cloudfront.net' : '',
  },
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf)$/,
  exclude: /node_modules/,
  loader: 'url-loader?limit=1024&name=assets/fonts/[name].[ext]',
};

const html = {
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'link:href'],
    },
  },
};

const videos = {
  test: /\.mp4$/,
  use: 'file-loader?name=videos/[name].[ext]',
};

const { resolve } = require('path');

// ////////////////////// WEBPACK ////////////////////////
// ///////////////////////////////////////////////////////
module.exports = {
  entry: {
    app: [PATHS.appJS],
  },
  output: {
    // path: PATHS.build,
    path: resolve('dist'),
    filename: 'app.bundle.js',
    publicPath: '',
    hotUpdateChunkFilename: 'hot/hot-update.js', // creates a folder for the hot updates json files
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  module: {
    rules: [javascript, styles, images, html, fonts, videos],
  },
  resolve: {
    modules: [PATHS.src, 'node_modules'],
  },
  devServer: devServerOptions,
  optimization: {
    minimizer: [],
  },
  plugins: pluginsList,
};
