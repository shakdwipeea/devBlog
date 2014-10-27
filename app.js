var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
//Connect to mongodb
var mongoose = require('mongoose');


var app = express();
//Db Connection
app.set('MongodbHost',process.env.OPENSHIFT_MONGODB_DB_HOST || '127.0.0.1');
app.set('MongodbPort',process.env.OPENSHIFT_MONGODB_DB_PORT || '');
mongoose.connect('mongodb://' + app.get('MongodbHost') + ':' + app.get('MongodbPort') + '/blog');
require('./models/Posts');
require('./models/Comments');
require('./models/Users')

var routes = require('./routes/index');
var users = require('./routes/users');







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.json());
//app.use(express.urlencoded());

app.use(function (req, res, next) {
    console.log('In my middleware',req.body.password);
        if(req.body.password != undefined) {
            crypto.pbkdf2(req.body.password, 'MySecretSalt', 10, 30, function (err, key) {
                if (err) {
                    console.log(err);
                    next(err);
                }
                req.body.password = key.toString('hex');
                console.log(req.body.password);
                next();
            });
        } else {next();}

});

app.use('/secure',expressJwt({secret:'secret'}));
app.use('/', routes);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
