'use strict';

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('../webpack.config.dev.js');

let webpackDevServer = new WebpackDevServer(webpack(config), {
	hot: true,
	publicPath: '/',
	historyApiFallback: true,
	noInfo: true,
	proxy: {
		'*': 'http://localhost:3000'
	}
});

module.exports = webpackDevServer;