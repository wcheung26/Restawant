var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
const db = require("../../models");

module.exports = function(passport) {

  var Restaurant = db.restaurant;
  var Influencer = db.influencer;

  passport.serializeUser(function(user, done) {
    return done(null, { id: user.id, isRestaurant: user.isRestaurant });
  });

  passport.deserializeUser(function(id, done) {
    if (!id.isRestaurant) {
      Influencer.findById(id.id).then(function(user) {
        if (user) {
          done(null, user.get());
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
    else if (id.isRestaurant) {
      Restaurant.findById(id.id).then(function(user) {
        if (user) {
          done(null, user.get());
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  });

  // Influencer Signup
  passport.use('influencer-signup', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  function(req, email, password, done) {
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    Influencer.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (result) {
        return done(null, false, {
          message: "Email already exists."
        });
      }
      else {
        var newPassword = generateHash(password);
        var data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: email,
          password: newPassword
        };
        Influencer.create(data).then(function(user, created) {
          if (!user) {
            return done(null, false);
          }
          else if (user) {
            return done(null, user);
          }
        });
      }
    });
  }));
    
  // Influencer signin
  passport.use('influencer-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    Influencer.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (!result) {
        return done(null, false, {
          message: 'Email does not exist.'
        });
      }
      if (!isValidPassword(result.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, result);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your Sign-in'
      });
    });
  }));

  // Restaurant signup
  passport.use('restaurant-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    Restaurant.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (result) {
        return done(null, false, {
          message: 'Email already exists.'
        });
      }
      else {
        var newPassword = generateHash(password);
        var data = {
          email: email,
          password: newPassword,
          name: req.body.name,
          yelpId: req.body.yelpId,
          verificationUrl: req.body.url
        };
        Restaurant.create(data).then(function(user, created) {
          if (!user) {
            return done(null, false);
          }
          else if (user) {
            return done(null, user);
          }
        });
      }
    });
  }));

  // Restaurant signin
  passport.use('restaurant-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    Restaurant.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (!result) {
        return done(null, false, {
          message: 'Email does not exist.'
        });
      }
      if (!isValidPassword(result.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, result);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your Sign-in'
      });
    });
  }));
}