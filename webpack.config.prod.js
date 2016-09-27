var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

var __dirbuild = path.resolve(__dirname, 'dist');
var __dirclient = path.resolve(__dirname, 'client');
var __dirscripts = path.resolve(__dirclient, 'js');
var __dirstyles = path.resolve(__dirclient, 'styles');
var __dirimage = path.resolve(__dirclient, 'img');
var __dirnodemodules = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: {
		'js/master': './client/js/master.js',
		'js/controller': './client/js/controller.js',
		'js/vendor': ['jquery', 'react', 'react-dom', 'socket.io-client', 'lodash', 'react-router', 'reveal.js', 'classnames', 'whatwg-fetch']
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
			loaders: ['babel-loader', 'strip-loader?strip[]=console.log']
		}, {
			test: /\.(css|scss)$/,
			loaders: ['style', 'css?sourceMap&minimize', 'postcss', 'sass?sourceMap']
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
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.CommonsChunkPlugin('js/vendor', 'js/vendor.bundle.js'),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),
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
    }, {
        from: path.resolve(__dirclient, 'temp.json')
    }])
	],
	postcss: function() {
		return [autoprefixer]
	},
	noInfo: true,
	devtool: 'source-map'
};

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);