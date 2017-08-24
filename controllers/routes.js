var express = require('express');
var router = express.Router();
var path = require('path');
var db = require("../models");

router.post("/api/restaurant/promotions", function(req, res) {
  console.log("Saving new restaurant promotion...");
  console.log("Requesting to save promotion... ", req.body);
  console.log("Restaurant Id: ", req.user.id);
  db.promotion.create({
    name: req.body.name,
    offer: req.body.offer,
    expiration: req.body.expiration,
    reward: req.body.reward,
    restaurantId: req.user.id
  }).then(function(promotion) {
    console.log(promotion);
    res.send(promotion);
  });

});

router.get("/api/restaurant/influencers/existing", function(req, res) {
  console.log("Retrieving all existing influencers...");
  // Find all the discounts that has not expired
  db.discount.findAll({
    include: [{
      model: db.promotion,
      where: {
        restaurantId: req.user.id,
        expiration: {
          $gte: new Date()
        }
      }
    }, {
      model: db.influencer
    }]
  }).then(function(discounts) {
    console.log("Number of discounts that have not expired... ", discounts);
  });
});

  
router.get("/api/restaurant/influencers/all", function(req, res) {
  console.log("Retrieving all influencers...");
  // Find all the influencers in the database
  db.influencer.findAll().then(function(influencers) {
    console.log("All influencers... ", influencers);
    res.json(influencers);
  });
});

router.get("/api/influencer/promotions", function(req, res) {
  console.log("===================") 
  console.log("Retrieving discounts under influencer...");  
  console.log("===================")
	db.discount.findAll({
  	where: {
  		influencerId: req.user.id
  	},
  	include: [{ 
  		model: db.promotion,
      order: ['expiration', 'DESC']
  	}],
  }).then(function(doc) {
    console.log("===================")
    console.log("Sending doc...")
    res.send(doc);
  });
});

// router.get("/api/restaurant/history", function(req, res) {
//   console.log("Retrieving summary...");
//   db.discount.findAll({
//     include: [{
//       model: db.promotion,
//       where: {
//         restaurantId: req.user.id
//       }
//     }, {
//       model: db.influencer
//     }]
//   }).then(function(discounts) {

//   });
// });

// router.get("/api/restaurant/history", function(req, res) {
//   Discounts.findAll({
//    where: "Restaurant.id = " + rid,
//    include: [ Influencers ]
//   }).sort([
//     ["expiration", "descending"]
//   ]).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });

// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// router.get("/api/influencer/:iid/history", function(req, res) {
//   Discounts.findAll({
//   	where: {
//   		Influencers.id: iid
//   	},
//   	include: [{ 
//   		model: Restaurants
//   	}]
//   }).sort([
//     ["expiration", "descending"]
//   ]).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });

// // restaurants posting new promo
// router.post("/api/promo/:rid", function(req, res) {
// 	db.Promotion.create({
// 	   name: req.body.name,
// 	   discount: req.body.discount,
// 	   expiration: req.body.expiration, 
// 	   RestaurantId: req.params.rid
// 	}).then(function(results) {
// 		res.redirect('/restaurants')
// 	})
// })



// router.post("/api/qr/:rid/:iid", function(req, res) {
// 	db.Discounts.create({
// 	    url: `http://qrickit.com/api/qr.php?d=http://localhost3000/api/click/${req.params.rid}/${req.params.iid}`,
// 	    RestaurantId: req.params.rid, 
// 	    InfluencerId: req.params.iid
// 	}).then(function(results) {
// 		res.redirect('/restaurants')
// 	})
// })

// router.post("/api/yelp/:id", function(req, res) {
// 	db.Restaurants.create({
// 		yelpId: req.params.id, 
//     	phone: req.body.phone, 
//     	address: req.body.address, 
//     	image: req.body.image, 
//     	name: req.body.name,
//     	email: req.body.email, 
//     	password: req.body.password
// 	}).then(function(results) {
// 		res.redirect('/restaurants')
// 	})
// })

module.exports = router;