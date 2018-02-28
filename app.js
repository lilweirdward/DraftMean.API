/*
 * Main requires
 */
var express = require('express');
var logger = require('morgan');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');

var app = express();

// Get environment
var env = process.env.ENV;
console.log("ENV: " + env);



/*
 * Connect to Mongo
 */
var connectString = "mongodb://";
console.log("DB_USER: " + process.env.DB_USER);
console.log("DB_PASS: " + process.env.DB_PASS);
if (process.env.DB_USER && process.env.DB_PASS) {
  connectString = connectString + process.env.DB_USER + ":" + process.env.DB_PASS
                    + `@draftmeancluster-shard-00-00-hu7p6.mongodb.net:27017,
                        draftmeancluster-shard-00-01-hu7p6.mongodb.net:27017,
                        draftmeancluster-shard-00-02-hu7p6.mongodb.net:27017
                        /draftmean?ssl=true&replicaSet=DraftMeanCluster-shard-0&authSource=admin`;
} else if (env == "dev") {
  connectString = connectString + "127.0.0.1:27017/draftmean";
} else {
  console.log('DB_USER or DB_PASS not set in PROD env');
}

// Connect Mongoose to MongoDB
var mongoose = require('mongoose');
mongoose.Promise = bluebird;

mongoose.connect(connectString)
.then(
  ()=> { console.log('Successfully connected to Mongodb Database at URL: mongodb://draftmeancluster.mongodb.net:27017/draftmean')}
).catch(
  ()=> { console.log('Error connecting to Mongodb Database at URL: mongodb://draftmeancluster.mongodb.net:27017/draftmean')}
);



/*
 * Set up headers and error handlers
 */
// Headers
app.use(function(req, res, next) {
  if (env == "dev")
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  else
    res.header("Access-Control-Allow-Origin", "http://www.zach-woodward.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});



/*
 * Routes and other usings
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger(env));
app.use(cookieParser());

var api = require('./routes/api.route');
app.use('/api', api);

// Error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});



/*
 * Export app
 */
module.exports = app;
