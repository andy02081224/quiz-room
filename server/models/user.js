const mongoose =  require('mongoose');

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		uniqure: true
	},
	name: {
		type: String
	},
	image: {
		type: String
	},
	phone: {
		type: String
	}

});

module.exports = mongoose.model('User', UserSchema);