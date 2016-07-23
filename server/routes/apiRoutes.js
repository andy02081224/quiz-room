let router = require('express').Router();
let logicCtrl = require('../controllers/logicController');

router.get('/questionset', function(req, res) {
	logicCtrl.getQuestionSetList()
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.send('error');
		});
});

router.get('/questionset/:id', function(req, res) {
	logicCtrl.getQuestionSet(req.params.id)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.send('error');
		})
});

router.post('/questionset', function(req, res) {
	logicCtrl.createQuestionSet(req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.send('error');
		});
});

router.patch('/questionset/:id', function(req, res) {
	logicCtrl.updateQuestionSet(req.params.id, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.send('error');
		})
});

router.delete('/questionset/:id', function(req, res) {
	logicCtrl.deleteQuestionSet(req.params.id)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			console.error(err);
			res.send('error');
		});
});























module.exports = router;