var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var __dirbuild = path.resolve(__dirname, 'dist');
var __dirclient = path.resolve(__dirname, 'client');
var __dirscripts = path.resolve(__dirclient, 'js');
var __dirstyles = path.resolve(__dirclient, 'styles');
var __dirimage = path.resolve(__dirclient, 'img');

module.exports = {
	noInfo: true,
	entry: {
		'js/master': './client/js/master.jsx',
		'js/controller': './client/js/controller.jsx',
		'js/vendor': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080', 'jquery', 'react', 'react-dom', 'socket.io-client']
	},
	output: {
		path: '/',
		publicPath: 'http://localhost:8080/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [{
			include: __dirscripts,
			test: /\.jsx?$/,
			loader: 'babel'
		}, {
			include: __dirstyles,
			test: /\.(css|scss)$/,
			loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
		}, {
			include: __dirimage,
			test: /\.(jpe?g|png|gif|svg)$/,
			loaders: [
				'url-loader?name=img/[hash].[ext]&limit=8192',
				'image-webpack-loader?bypassOnDebug=true&optimizationLevel=7'
			]
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
	}
};

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);