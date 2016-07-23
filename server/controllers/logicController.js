let QuestionSetModel = require('../models/questionSet');

let logicController = {
	activate: function(socket) {
		this.socket = socket;
	},
	connectPeers: function(key, cb) {
		this.socket.connectPeers(key, cb);
	},
	getQuestionSetList: function() {
		return new Promise((resolve, reject) => {
			QuestionSetModel.getQuestionSetList((err, list) => {
				if (err) reject(err);
				resolve(list);
			});
		});
	},
	createQuestionSet: function(questionSet) {
		let doc = {
			title: questionSet.title,
			subtitle: questionSet.subtitle,
			description: questionSet.description,
			questions: questionSet.questions
		};
		
		let questionSetModel = new QuestionSetModel(doc);

		return new Promise((resolve, reject) => {
			questionSetModel.save((err, savedObj) => {
				if (err) reject(err);
				resolve(savedObj);
			});
		});
	},
	getQuestionSet: function(id) {
		return new Promise((resolve, reject) => {
			QuestionSetModel.findById(id, (err, questionSet) => {
					if (err) reject(err);
					resolve(questionSet);
			});		
		});
	},
	updateQuestionSet: function(id, questionSet) {
		return new Promise((resolve, reject) => {
			QuestionSetModel.update({_id: id}, questionSet, (err, response) => {
				if (err) reject(err);
				resolve(response);
			});
		});
	},
	deleteQuestionSet: function(id) {
		return new Promise((resolve, reject) => {
			let questionSetTitle = QuestionSetModel.findById(id).select('title');
			QuestionSetModel.remove({_id: id}, (err, response) => {
				if (err) reject(err);
				resolve(response);
			});
		});
	}
}



module.exports = logicController;

