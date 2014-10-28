var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	name: String,
	password: String,
	email: String,
	verified: {type: Boolean, default: false}
});

mongoose.model('User',UsersSchema);