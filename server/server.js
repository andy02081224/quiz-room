'use strict';

console.log('------------------------------------');
console.log(`process.env.NODE_ENV in Node: ${process.env.NODE_ENV}`);
console.log('------------------------------------\n')

let dotenv = require('dotenv');
let mongoose = require('mongoose');


// Load env file
dotenv.load();

let dbHost = process.env.DB_HOST || 'localhost';
let dbPort = process.env.DB_PORT || '27017';
let dbName = process.env.DB_NAME || 'quiz';

// Connect DB
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

let db = mongoose.connection;
db.on('open', function() {
	console.log('----------------------------');
	console.log('Mongo DB Status:')
	console.log(`DB_HOST: ${dbHost}`);
	console.log(`DB_PORT: ${dbPort}`);
	console.log(`DB_NAME: ${dbName}`);
	console.log('----------------------------\n');
	
	init();
});

db.on('error', function() {
	console.error('DB Connection error');
});

function init() {
	let express = require('express');
	let app = express();
	let io = require('socket.io');
	let path = require('path');
	let exphbs = require('express-handlebars');
	let bodyParser = require('body-parser');
	let SocketServer = require('./socketServer');
	let __dirroot = path.resolve(__dirname, '..');
	let __dirclient, devProxyServer; 
	let logicController = require('./controllers/logicController');
	let appRoutes = require('./routes/appRoutes');
	let apiRoutes = require('./routes/apiRoutes');

	// Set client directory based on NODE_ENV
	if (process.env.NODE_ENV == 'development') {
		__dirclient = path.resolve(__dirroot, 'client');
		devProxyServer = require('./webpackDevServer');
	}
	else {
		__dirclient = path.resolve(__dirroot, 'dist');
	}

	// Set handlebars
	app.set('views', path.resolve(__dirclient, 'views'));
	app.set('view engine', '.hbs');
	app.engine('.hbs', exphbs({
		defaultLayout: 'default',
		layoutsDir: path.resolve(__dirclient, 'views/layouts'),
		partialsDir: path.resolve(__dirclient, 'views/partials'),
		extname: '.hbs'
	}));

	// Register middlewares
	app.use(express.static(__dirclient));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Routes
	app.use(function(req, res, next) {
	  console.log('%s %s', req.method, req.url);
	  next();
	});
	app.use('/api', apiRoutes);
	app.use('/', appRoutes);

	let appPort = process.env.APP_PORT || 3000;
	let devProxyServerPort = process.env.DEV_PROXY_SERVER_PORT || 8080;
	let server = app.listen(appPort, () => {
		console.log(`Server running on port ${appPort}`);
	});

	let socketServer = new SocketServer();
	socketServer.listen(server);
	logicController.activate(socketServer);

	if (devProxyServer && process.env.NODE_ENV == 'development') {
		devProxyServer.listen(devProxyServerPort, '0.0.0.0', (err, result) => {
			if (err) console.log(err);

			console.log(`Proxy server running on port ${devProxyServerPort}`)
		});
	}
}

