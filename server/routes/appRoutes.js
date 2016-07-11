let router = require('express').Router();
let logicController = require('../controllers/logicController');

router.get('/', (req, res) => {
	res.render('master');
});

router.get('/register', (req, res) => {
	res.render('master');
});

router.get('/game', (req, res) => {
	res.render('master');
});


router.get('/result', (req, res) => {
	res.render('master');
});

router.get('/:gameId', (req, res) => {
	let gameId = req.params.gameId;
	logicController.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

router.get('/:gameId/:playerName/game', (req, res) => {
	let gameId = req.params.gameId;
	logicController.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

router.get('/:gameId/:playerName/result', (req, res) => {
	let gameId = req.params.gameId;
	logicController.connectPeers(gameId, (error) => {
		if (!error) {
			// res.send(`connected to peers, room id: ${gameId}`);
			res.render('controller');
		}
		else {
			res.send('connection failed');
		}
	});
});

module.exports = router;