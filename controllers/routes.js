var express = require('express');
var router = express.Router();
var path = require('path');
var db = require("../models");
// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// restaurants posting new discounts
router.post("/api/qr/:rid/:iid", function(req, res) {
	db.Discounts.create({
		name: req.body.name,
	    discount: req.body.discount,
	    expiration: req.body.expiration, 
	    url: `http://qrickit.com/api/qr.php?d=http://localhost3000/api/click/${req.params.rid}/${req.params.iid}`,
	    RestaurantsId: req.params.rid, 
	    InfluencersId: req.params.iid
	}).then(function(results) {
		res.redirect('/restaurants')
	})
})

router.post("/api/yelp/:id", function(req, res) {
	db.Restaurants.create({
		yelpId: req.params.id, 
    	phone: req.body.phone, 
    	address: req.body.address, 
    	image: req.body.image, 
    	name: req.body.name,
    	email: req.body.email, 
    	password: req.body.password
	}).then(function(results) {
		res.redirect('/restaurants')
	})
})

module.exports = router;