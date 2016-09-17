const router = require('express').Router();
const QuestionSetModel = require('../models/questionSet');


module.exports = function(socket) {
	router.get('/questionset', function(req, res) {
		QuestionSetModel.getQuestionSetList((err, data) => {
			if (err) res.status(500).json(err);
			res.json(data);
		});
	});

	router.get('/questionset/:id', function(req, res) {
		QuestionSetModel.findById(req.params.id, (err, data) => {
				if (err) res.status(500).json(err);
				res.json(data);
		});		
	});

	router.post('/questionset', function(req, res) {
		let questionSet = req.body;
		let doc = {
			title: questionSet.title,
			subtitle: questionSet.subtitle,
			description: questionSet.description,
			questions: questionSet.questions
		};
		
		let questionSetModel = new QuestionSetModel(doc);

		questionSetModel.save((err, data) => {
			if (err) res.status(500).json(err);
			res.json(data);
		});
	});

	router.patch('/questionset/:id', function(req, res) {
		QuestionSetModel.update({_id: req.params.id}, questionSet, (err, data) => {
			if (err) res.status(500).json(err);
			res.json(data);
		});
	});

	router.delete('/questionset/:id', function(req, res) {
		let questionSetTitle = QuestionSetModel.findById(req.params.id).select('title');
		QuestionSetModel.remove({_id: req.params.id}, (err, data) => {
			if (err) res.status(500).json(err);
			res.json(data);
		});
	});

	return router;
}

