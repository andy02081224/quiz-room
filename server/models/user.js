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
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		uniqure: true
	},
	image: {
		type: String
	},
	phone: {
		type: String
	}

});

model.exports = mongoose.model('User', UserSchema);