var express = require('express');
var router = express.Router();
var path = require('path');
var db = require("../models");
// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// router.get("/api/influencer/:iid/history", function(req, res) {
//   Discounts.findAll({
//   	where: {
//   		id: iid
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

// router.get("/api/restaurant/:rid/history", function(req, res) {
//   Discounts.findAll({
//   	where: "Restaurant.id = " + rid,
//   	include: [ Influencers ]
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