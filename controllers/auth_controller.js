const db = require("../models");

module.exports = function(app, passport) {

  app.post('/influencer/login', passport.authenticate('influencer-login', {
    successRedirect : '/influencer/dashboard',
    failureRedirect : '/influencer/login'
  }));

  app.post('/influencer/signup', passport.authenticate('influencer-signup', {
    successRedirect : '/influencer/dashboard',
    failureRedirect : '/influencer/signup'
  }));

  app.post('/restaurant/login', passport.authenticate('restaurant-login', {
    successRedirect : '/restaurant/dashboard',
    failureRedirect : '/restaurant/login'
  }));

  app.post('/restaurant/signup', passport.authenticate('restaurant-signup'), function(req, res) {
    if (req.user) {
      res.json({ success: true });
    }
  });

  app.get('/auth/restaurant', restaurantLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.get('/auth/influencer', influencerLoggedIn, function(req, res) {
    res.json(req.user);
  });
}

// route middleware to make sure a user is logged in
function restaurantLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isRestaurant === true) {
    return next();
  }

  res.redirect('/');
}

function influencerLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isRestaurant === false) {
    return next();
  }

  res.redirect('/');
}