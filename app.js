var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var author = require('./routes/author');
var i18n = require("i18n");

// For store session in redis session = require('express-session');
// If you wanna to store session in external DB such as Redis.
//var RedisStore = require('connect-redis')(session);
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');



// International plugin
i18n.configure({
	// setup some locales - other locales default to en silently
	locales:['zh-CN','en','de','ja'],
	
	//fall back from Dutch to German
	//fallbacks:{'nl' : 'de'},
	
	//you may alter a site wide default locales
	dafaultLocales : 'en',
	
	//sets a custom cookie name to parse locale setting from -defaults to NULL
	cookie:'sprint3',
	
	// where to store json files -defualts to './locales' relative to modules
	directory : './locales',
	
	//Whether to write new locale information to disk - default to true
	updateFiles: 'false',
	
	//what to use as the identation unit - dafault to "t\"
	ident:"\t",
	
	//setting extension of json files -default to '.json'
	extension: ".js",
	
	//setting of log level DEBUG - dafault to require('debug')('i18n:debug')
	logDebugFn: function(msg){
		console.log('debug',msg);
	}
	
})

var app = express();

//Set mongoose which is connecting MongoDB.
//var connectOptions = {url:"mongodb://Sam:111111@localhost:27017/test"};
var connectOptions = {url:"mongodb://localhost:27017/test"};
const db = mongoose.createConnection(connectOptions);;

db.on('open',function(){
})

// Initial session options
var sessionOptions = {
	secret : "secret",
	resave : false,
	saveUninitialiezed:false,
	//store : new MongoStore(url:"mongodb://localhost/test"),
	store : new MongoStore({mongooseConnection : db}),
	cookie : {secure : true},
	//"host":"127.0.0.1",
	//"port":"6379",
	//ttl": 60*60*24*30 //30 days.
	"ttl": 60 //60 seconds. 
};

app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);
app.use('/', routes);
app.use('/users', users);
app.use('/author', author); // Log in or out

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
};

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

