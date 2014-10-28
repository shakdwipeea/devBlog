var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var crypto = require('crypto');
var Post = mongoose.model('Post');
var Comments = mongoose.model('Comment');
var User = mongoose.model('User');

router.param('post',function  (req,res,next,id) {
	var query = Post.findById(id);

	query.exec(function  (err,post) {
		if (err) {return next(err)}
		if (!post) {return next(new Error('Cant find Post'));}

		req.body = post;
		return next();
	});

});



//router.use(hashpassword());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*Get The posts */
router.get('/posts',function  (req,res,next) {
	Post.find({},null,{sort:{date: -1}},function  (err,posts) {
		if (err) {return next(err);}
		res.json(posts);
	});
});

router.get('/postof/:name',function  (req,res) {
	console.log('Got',req.params.name);
	Post.find({'author':req.params.name},null,{sort:{date: -1}},function  (err,posts) {
		if (err) {next(err);};
		res.json(posts);
	});
});

router.get('/posts/:post',function  (req,res) {
	req.post.populate('comments',function  (err,post) {
		res.json(req.post);
	});
	
});

router.post('/secure/posts',function  (req,res,next) {
	var post = new Post(req.body);

	post.save(function  (err,post) {
		if (err) {return next(err);}

		res.json(post);
	});
});

router.post('/posts/:post/comments',function  (req,res,next) {
	var comment = new Comment(req.body);
	comment.post = req.post;

	comment.save(function  (err,comment) {
		if (err) {next(err);}

		req.post.comments.push(comment);
		req.post.save(function  (err,post) {
			if (err) {return next(err);}
			res.json(post);
		});
	});
});

router.post('/authenticate',function  (req,res) {
	console.log('Authenticating',req.body);
	/*
	if (!(req.body.username == 'akash' && req.body.password == 'akash')) {
		console.log('Wrong username');
		res.send(401,'Wrong username or password');
		return;
	}

	var profile = {
		name: 'Akash Shakdwipeea',
		email: 'ashakdwipeea@gmail.com',
		id:1
	};
	*/

	if (!req.body) {throw new Error('Incorrect params');};

	User.findOne({'name':req.body.username,'password':req.body.password},'name email',function  (err,user) {
		if (!user) {
			res.status(401).send('No user found');
		} else {

		console.log(err);
		var token = jwt.sign(user,'secret',{expiresInMinutes: 60*5});
		console.log('Sending token');
		res.json({token:token});
	}
	})


});

router.post('/newuser',function  (req,res) {
	if (req.body) {

		var user = new User(req.body);
		user.save(function  (err,user) {
			if (err) {return next(err)};
			res.json(user);
		});
	};
	
});

router.get('/secure/prof',function  (req,res) {
	console.log('Reques',req.user.name);
	res.json(req.user.name);
});


router.post('/users',function  (req,res) {
	// body...
	console.log('Request body',req.body);
	User.findOne({'name': req.body.name},'name',function  (err,user) {
		if (!user) {res.json({result:true});}
		else {
			res.json({result:false});
		}
	})
});
module.exports = router;
