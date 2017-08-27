var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
const db = require("../../models");

module.exports = function(passport) {

  var Restaurant = db.restaurant;
  var Influencer = db.influencer;
  var Admin = db.admin;

  passport.serializeUser(function(user, done) {
    return done(null, { id: user.id, isRestaurant: user.isRestaurant, isAdmin: user.isAdmin });
  });

  passport.deserializeUser(function(id, done) {
    if (id.isAdmin) {
      Admin.findById(id.id).then(function(user) {
        if (user) {
          done(null, user.get());
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
    else if (!id.isRestaurant) {
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
          message: 'Account does not exist.'
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
        Restaurant.findOne({
          where: {
            yelpId: req.body.yelpId
          }
        }).then(function(result) {
          if (result) {
            return done(null, false, {
              message: 'Yelp ID already exists.'
            });
          }
          else {
            var newPassword = generateHash(password);
            var data = {
              email: email,
              password: newPassword,
              name: req.body.name,
              yelpId: req.body.yelpId,
              address: req.body.address,
              city: req.body.city,
              state: req.body.state,
              phone: req.body.phone,
              verificationUrl: req.body.url
            };
            Restaurant.create(data).then(function(user, created) {
              if (!user) {
                return done(null, false);
              }
              else if (user) {
                return done(null, user);
              }
            }).catch(function(err) {
              console.log(err);
            });
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
        email: email,
        isVerified: true
      }
    }).then(function(result) {
      if (!result) {
        return done(null, false, {
          message: 'Account does not exist or is awaiting approval.'
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

  // Admin Signup
  passport.use('admin-signup', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  function(req, email, password, done) {
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    Admin.findOne({
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
        Admin.create(data).then(function(user, created) {
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
    
  // Admin signin
  passport.use('admin-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    Admin.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (!result) {
        return done(null, false, {
          message: 'Email does not exist'
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