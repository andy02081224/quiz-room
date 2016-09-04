let router = require('express').Router();
let logicCtrl = require('../controllers/logicController');

router.get('/questionset', function(req, res) {
	logicCtrl.getQuestionSetList()
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/questionset/:id', function(req, res) {
	logicCtrl.getQuestionSet(req.params.id)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
});

router.post('/questionset', function(req, res) {
	logicCtrl.createQuestionSet(req.body)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.patch('/questionset/:id', function(req, res) {
	logicCtrl.updateQuestionSet(req.params.id, req.body)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
});

router.delete('/questionset/:id', function(req, res) {
	logicCtrl.deleteQuestionSet(req.params.id)
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});























module.exports = router;