var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

var __dirbuild = path.resolve(__dirname, 'dist');
var __dirclient = path.resolve(__dirname, 'client');
var __dirscripts = path.resolve(__dirclient, 'js');
var __dirstyles = path.resolve(__dirclient, 'styles');
var __dirimage = path.resolve(__dirclient, 'img');

module.exports = {
	entry: {
		'js/master': './client/js/master.jsx',
		'js/controller': './client/js/controller.jsx',
		'js/vendor': ['jquery', 'react', 'react-dom', 'socket.io-client', 'lodash']
	},
	output: {
		path: __dirbuild,
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [{
			include: __dirscripts,
			test: /\.jsx?$/,
			loader: 'babel-loader'
		}, {
			include: __dirstyles,
			test: /\.(css|scss)$/,
			loaders: ['style', 'css?sourceMap&minimize', 'postcss', 'sass?sourceMap']
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
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin('js/vendor', 'js/vendor.bundle.js'),
		new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        compress: {
        	warnings: false
        }
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirclient, 'views'),
        to: path.resolve(__dirbuild, 'views'),
    }])
	],
	postcss: function() {
		return [autoprefixer]
	},
	noInfo: true
};

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);