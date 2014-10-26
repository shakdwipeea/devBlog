var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	subtitle: String,
	author: String,
	date: {type: Date, default: Date.now },
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post',PostSchema);