'use strict';
const QuestionSet = require('../models/questionSet');

function modelController() {
	
}



modelController.prototype.createQuestionSet = function(data) {
	let savedObj = {
		title: data.title,
		subtitle: data.subtitle,
		description: data.description,
		questions: data.questions
	};

	let questionSet = new QuestionSet(savedObj);
	questionSet.save();
};