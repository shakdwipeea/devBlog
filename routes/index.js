var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var crypto = require('crypto');
var Post = mongoose.model('Post');
var Comments = mongoose.model('Comment');
var User = mongoose.model('User');
var fs = require('fs');


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

router.post('/secure/posts',function  (req,res) {
	var post = new Post(req.body);
	console.log(Object.keys(req.user));
	if (req.user.verified == false) {
		res.status(401).send('Please veify your account to add a post');
	} else if (req.user.verified == true) {
		post.save(function  (err,post) {
			if (err) {return next(err);}

			res.json(post);
		});
	}
	
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

	if (!req.body) {throw new Error('Incorrect params');};

	User.findOne({'name':req.body.username,'password':req.body.password},'name email verified',function  (err,user) {
		if (!user) {
			res.status(401).send('No user found');
		} else {

		console.log(err);
		console.log(user);
		var token = jwt.sign(user,'secret',{expiresInMinutes: 60*5});
		console.log('Sending token');
		res.json({token:token});
	}
	})


});

router.post('/newuser',function  (req,res) {
	if (req.body) {
		req.body.verified = false;
		var user = new User(req.body);
		user.save(function  (err,user) {
			if (err) {return next(err)};
			res.json(user);
			User.findOne({'name':req.body.name},'_id email',function  (err,user) {
				if (err) {console.log(err);return;}
				console.log('User id should be here',user._id);
				//send a mail to the user 

				require('../lib/mailer')(user.email,'http://blog-shak.rhcloud.com/verify/?_id='+user._id);

				fs.writeFile('./verify.txt','http://blog-shak.rhcloud.com/verify/?_id='+user._id,function  (err) {
					console.log(err);
				});
			});
		});
		
	};
	
});

router.get('/secure/prof',function  (req,res) {
	console.log('Reques',req.user.name);
	res.json(req.user.name);
});

router.get('/verify',function  (req,res) {
	console.log(req.params);
	//res.status(200).send(req.query._id);
	User.findOne({'_id':req.query._id},function  (err,user) {
		if (err) {
			res.status(401).send('Some error occured. Please try again');
		} else {
			user.verified = true;
			user.save();
			console.log(user);
			res.status(200).send("id verified. <a href='http://blog-shak.rhcloud.com'>Go to the blog</a>");
			
		}
	});
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
