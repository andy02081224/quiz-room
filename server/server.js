'use strict';

let express = require('express');
let io = require('socket.io');
let path = require('path');
let exphbs = require('express-handlebars');

let app = express();
let SocketServer = require('./socketServer');

let __dirroot = path.resolve(__dirname, '..');
let __dirclient, devProxyServer; 
let socketServer = new SocketServer();

console.log('process.env.NODE_ENV in Node:', process.env.NODE_ENV);

if (process.env.NODE_ENV == 'development') {
	__dirclient = path.resolve(__dirroot, 'client');
	devProxyServer = require('./webpackDevServer');
}
else {
	__dirclient = path.resolve(__dirroot, 'dist');
}

app.set('views', path.resolve(__dirclient, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
	defaultLayout: 'default',
	layoutsDir: path.resolve(__dirclient, 'views/layouts'),
	partialsDir: path.resolve(__dirclient, 'views/partials'),
	extname: '.hbs'
}));




app.use(express.static(__dirclient));

app.get('/', (req, res) => {
	res.render('master');
});

app.get('/game', (req, res) => {
	res.render('master');
});

app.get('/result', (req, res) => {
	res.render('master');
});

app.get('/:gameId', (req, res) => {
	let gameId = req.params.gameId;
	socketServer.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

app.get('/:gameId/:playerName/game', (req, res) => {
	let gameId = req.params.gameId;
	socketServer.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

app.get('/:gameId/:playerName/result', (req, res) => {
	let gameId = req.params.gameId;
	socketServer.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

let server = app.listen(3000, () => {
	console.log('Server running on port 3000');
});

socketServer.listen(server);

if (devProxyServer && process.env.NODE_ENV == 'development') {
	devProxyServer.listen(8080, 'localhost', (err, result) => {
		if (err) console.log(err);

		console.log('Proxy server listening at localhost:8080')
	});
}

