let router = require('express').Router({strict: true});
let logicController = require('../controllers/logicController');

const masterRoutes = ['/login', '/register', '/game', '/result', /\//];
const controllerRoutes = ['/room/:roomID', '/room/:roomID/game', '/room/:roomID/result'];

router.use(masterRoutes, (req, res, next) => {
	res.render('master');
});

router.use(controllerRoutes, (req, res, next) => {
	let roomID = req.params.roomID;

	if (logicController.isRoomExists(roomID)) {
		res.render('controller');
	}
	else {	
		res.redirect('/');
	}
});

router.get('/*', (req, res) => {
	res.render('404');
});

module.exports = router;