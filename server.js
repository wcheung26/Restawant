var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

// Models to sync
var db = require("./models");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/routes'));

// Sync models then start the server to begin listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});