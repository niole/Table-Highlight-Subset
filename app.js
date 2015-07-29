"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database Routes
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017", {native_parser:true});

/* BELOW will be the name of your routes file
 * which interacts with MongoDB.
 * name it whatever you want */

var routes = require('./routes/index');
var rendermarkdown = require('./routes/rendermarkdown');

var app = express();

/* BELOW is the express view-engine setup
 *it declares that in the app's top level,
 *there will be a 'views' directory, which
 *will contain jade templates (rather than e.g
 *an html, or handelbars template).*/

/* The below code also declares that
 *the files that the express framework will
 *look for so that they can be served
 *exist in 'public/', whichs is why
 *the gulpfile's 'DEST_SRC' and 'DEST_BUILD'
 *both exist in 'public/'*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/* --- Make db accessible to our router ---*/
app.use(function(req,res,next){
    req.db = db;
    next();
});

/* BELOW is so that your router can access
 *your database routes file.
 *My routes file is 'routes/rendermarkdown.js'*/
app.use('/', routes);

//app.use('/rendermarkdown', rendermarkdown);

/// catch 405 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
