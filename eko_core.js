var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    compression = require('compression')


var config = require('./config');
var globalConfig = config.getParam();
var lib = {};
var app = express();
var routeAPI = require('./routeAPI');


lib.config = globalConfig;
lib.app = app;

app.use(compression());
app.use(helmet());
app.use(bodyParser.json({
    limit: '2mb',
    strict: false
}));

app.disable('x-powered-by');

app.use(function (req, res, next) {
    if (req.url.match(/bower_components/)) {
        res.setHeader("Cache-Control", "max-age=2592000"); // cache lib file
    } else {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    }
    res.setHeader("Expires", "0"); // Proxies.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
    next();
});

routeAPI.startRouting(lib);

lib.app.use(function (error, req, res, next) {
    //Catch json error
    if (error) {
        res.json(lib.returnmessage.json_error_msg("error data"));
    } else {
        next();
    }
});

app.use('/' + globalConfig.APPPATH, express.static(__dirname + '/www'));

app.get('*', function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

// handling 404 errors
app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || '** Files not found **');
});


app.set('port', process.env.PORT || globalConfig.PORT);

process.on('uncaughtException', function (err) {
    log4js.getLogger('error').fatal("UNCAUGHTEXCEPTION | " + JSON.stringify(err.stack, null, 4));
    console.log(err.stack);
});

process.on('exit', function () {
    console.log('GOOD BYE -..-');
});

var server = http.createServer(app);

app.on('error', function (e) {
    log4js.getLogger('error').fatal("SERVER ON ERROR | " + e);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});