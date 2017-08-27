var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var passport = require('passport');
var session = require('express-session');

var app = express();
var PORT = process.env.PORT || 8080;

// Models to sync
var db = require("./models");

var secret;
if (process.env.SECRET) {
  secret = process.env.SECRET;
}
else {
  var secretLocal = require("./secret.js");
  secret = secretLocal.secret;
}

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/auth_controller')(app, passport);
require('./config/passport/passport.js')(passport);
app.use(require('./controllers/routes'));

// Sync models then start the server to begin listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});