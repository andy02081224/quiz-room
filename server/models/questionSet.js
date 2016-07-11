const mongoose = require('mongoose');

const QuestionSetSchema = mongoogse.Schema({
	title: String,
	subtitle: String,
	description: String,
	questions:[{
		type: String,
		title: String,
		answer: String
	}]
});

module.export = mongoogse.model('QuestionSet', QuestionSetSchema);