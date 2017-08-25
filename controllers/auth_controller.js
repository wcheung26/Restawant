const db = require("../models");

module.exports = function(app, passport) {

  app.post('/admin/login', function(req, res, next) {
    passport.authenticate('admin-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'success' });
      });
    })(req, res, next);
  });

  app.post('/admin/signup', passport.authenticate('admin-signup', {
    successRedirect : '/admin/dashboard',
    failureRedirect : '/admin/signup'
  }));

  app.post('/influencer/login', function(req, res, next) {
    passport.authenticate('influencer-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'success' });
      });
    })(req, res, next);
  });

  app.post('/influencer/signup', function(req, res, next) {
    passport.authenticate('influencer-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'success' });
      });
    })(req, res, next);
  });

  app.post('/restaurant/login', function(req, res, next) {
    passport.authenticate('restaurant-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'success' });
      });
    })(req, res, next);
  });

  app.post('/restaurant/signup', function(req, res, next) {
    passport.authenticate('restaurant-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info.message });
      }
      req.logIn(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: 'success' });
      });
    })(req, res, next);
  });

  app.get('/auth/restaurant', restaurantLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.get('/auth/influencer', influencerLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.get('/auth/admin', adminLoggedIn, function(req, res) {
    res.json(req.user);
  });
  
  app.get('/auth/user', isLoggedIn, function(req, res) {
    res.json(req.user);
  });

  app.get('/auth/logout', isLoggedIn, function(req, res) {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}

// route middleware to make sure a user is logged in
function restaurantLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isRestaurant === true && req.user.isAdmin === false) {
    return next();
  }

  res.redirect('/');
}

function influencerLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isRestaurant === false && req.user.isAdmin === false) {
    return next();
  }

  res.redirect('/');
}

function adminLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    return next();
  }

  res.redirect('/');
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}