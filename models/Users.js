var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	name: String,
	password: String,
	email: String,
	verified: Boolean
});

mongoose.model('User',UsersSchema);