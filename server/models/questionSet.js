let mongoose = require('mongoose');

let QuestionSetSchema = mongoose.Schema({
	title: String,
	subtitle: String,
	description: String,
	questions:[{
		type: {type: String},
		title: String,
		options: [String],
		answer: String
	}]
});

/* Static Methods */
QuestionSetSchema.statics.getQuestionSetList = function(cb) {
	this.find({}).select('-__v').exec(cb);
};


/* Instance Methods */


module.exports = mongoose.model('QuestionSet', QuestionSetSchema);