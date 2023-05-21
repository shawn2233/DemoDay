// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');


const multer = require('multer');
const upload = multer({ dest: 'public/img' });

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var db

// require("dotenv").config({ path: "./config/.env" });


const accountSid = "AC7deb0af7001862e523ea56aa1f177f5a"
const authToken = "1cfbb1ca2ec6b37636207ba7e2bf8255";
const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Hello, Welcome to LinkUp ! Enjoy !',
//     from: '+18775409350',
//     to: '7817740264'
//   })
//   .then(message => console.log(message.sid));

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db, upload, client);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
  secret: 'rcbootcamp2023a', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// const postRoutes = require("./routes/posts");
// app.use("/post", postRoutes);

// launch ======================================================================
app.listen(port);
console.log('LinkUp is on port ' + port);

