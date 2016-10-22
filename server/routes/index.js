const fs = require('fs');
const path = require('path');

module.exports = function(app, socket) {
	fs.readdirSync(__dirname).forEach((fileName) => {
		if (fileName != 'index.js') {
			let route = require(path.resolve(__dirname, fileName));
			app.use('/api', route(socket));
		}
	});

	app.use(function errHandler(err, req, res, next) {
		console.error(JSON.stringify(err, null, 2));
		
		if (err.statusCode) {
			res.status(err.statusCode).json(err);
		}
		else {
			res.status(400).json(err);
		}
	});

	const validRoutes = [
		'/login', 
		'/register', 
		'/game', 
		'/result', 
		'/settings',
		'/profile/:username',
		'/room/:roomID', 
		'/room/:roomID/game', 
		'/room/:roomID/result',
		/\//,
	];

	const masterRoutes = ['/login', '/register', '/game', '/result', /\//];
	const controllerRoutes = ['/room/:roomID', '/room/:roomID/game', '/room/:roomID/result'];

	app.use(validRoutes, (req, res, next) => {
		if (req.params.roomID) {
			if (socket.isRoomExists(roomID)) {
				res.render('master');
			}
			else {	
				res.redirect('/');
			}
		}
		else {
			res.render('master');
		}
	});

	// app.use(controllerRoutes, (req, res, next) => {
	// 	let roomID = req.params.roomID;

	// 	if (socket.isRoomExists(roomID)) {
	// 		res.render('master');
	// 	}
	// 	else {	
	// 		res.redirect('/');
	// 	}
	// });

	app.get('/*', (req, res) => {
		res.render('404');
	});
};


