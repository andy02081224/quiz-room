var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var __dirbuild = path.resolve(__dirname, 'dist');
var __dirclient = path.resolve(__dirname, 'client');
var __dirscripts = path.resolve(__dirclient, 'js');
var __dirstyles = path.resolve(__dirclient, 'styles');
var __dirimage = path.resolve(__dirclient, 'img');
var __dirserver = path.resolve(__dirname, 'server');
var __dirnodemodules = path.resolve(__dirname, 'node_modules');

module.exports = {
	noInfo: true,
	entry: {
		'js/master': './client/js/master.jsx',
		'js/controller': './client/js/controller.jsx',
		'js/vendor': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080', 'jquery', 'react', 'react-dom', 'socket.io-client', 'lodash', 'react-router', 'reveal.js', 'classnames']
	},
	output: {
		path: '/',
		publicPath: 'http://localhost:8080/',
		filename: '[name].bundle.js'
	},
	module: {
		preLoaders: [{
			include: __dirclient,
			test: /\.(js|jsx)$/,
			loaders: ['eslint']
		}],
		loaders: [{
			include: __dirscripts,
			test: /\.jsx?$/,
			loader: 'babel'
		}, {
			test: /\.(css|scss)$/,
			loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
		}, {
			include: __dirimage,
			test: /\.(jpe?g|png|gif|svg)$/,
			loaders: [
				'url-loader?name=img/[hash].[ext]&limit=8192',
				'image-webpack-loader?bypassOnDebug=true&optimizationLevel=7'
			]
		}, {
			include: [__dirstyles, __dirnodemodules],
			test: /\.(svg|woff|woff2|[ot]tf|eot)$/,
			loader: 'url?limit=65000&mimetype=application/octet-stream&name=font/[name].[ext]'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin('js/vendor', 'js/vendor.bundle.js'),
		new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
	],
	postcss: function() {
		return [autoprefixer]
	},
	eslint: {
		configFile: './.eslintrc'
	}
};

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);