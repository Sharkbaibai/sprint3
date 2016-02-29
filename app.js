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

var session = require('express-session');
var RedisStore = require('connect-redis')(session);


// International plugin
i18n.configure({
	// setup some locales - other locales default to en silently
	locales:['zh-CN','en','de','ja'],
	
	//fall back from Dutch to German
	//fallbacks:{'nl' : 'de'},
	
	//you may alter a site wide default locales
	dafaultLocales : 'en',
	
	//sets a custom cookie name to parse locale setting from -defaults to NULL
	cookie:'spring3',
	
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

// Initial session
var option = {
	"host":"127.0.0.1",
	"port":"6379",
	//ttl": 60*60*24*30 //30 days.
	"ttl": 60*60
};

app.use(session({
	store: new RedisStore(option),
	secret:'Haliluyaaaaa!'
}));


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
      message: err.message,var express = require('express');
var router = express.Router();
var i18n = require('i18n');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  res.send('respond with a resource' + req.params.userId + "=====>"+ i18n.__({phrase:'hello world!', locale:"zh-CN"}));
});

module.exports = router;

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
