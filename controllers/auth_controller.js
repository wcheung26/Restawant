const db = require("../models");

module.exports = function(app, passport) {

  app.post('/influencer/login', passport.authenticate('influencer-login', {
    successRedirect : '/',
    failureRedirect : '/influencer'
  }));

  app.post('/influencer/signup', passport.authenticate('influencer-signup', {
    successRedirect : '/',
    failureRedirect : '/influencer/signup'
  }));

  app.post('/restaurant/login', passport.authenticate('restaurant-login', {
    successRedirect : '/restaurant/dashboard',
    failureRedirect : '/restaurant'
  }));

  app.post('/restaurant/signup', passport.authenticate('restaurant-signup', {
    successRedirect : '/restaurant/dashboard',
    failureRedirect : '/restaurant/signup'
  }));
}