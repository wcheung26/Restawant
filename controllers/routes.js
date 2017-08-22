var express = require('express');
var router = express.Router();
var path = require('path');

// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});


router.get("/api/influencer/:iid/history", function(req, res) {
  Discounts.findAll({
  	where: {
  		Influencers.id: iid
  	},
  	include: [{ 
  		model: Restaurants
  	}]
  }).sort([
    ["expiration", "descending"]
  ]).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

router.get("/api/restaurant/:rid/history", function(req, res) {
  Discounts.findAll({
  	where: "Restaurant.id = " + rid,
  	include: [ Influencers ]
  }).sort([
    ["expiration", "descending"]
  ]).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
})

module.exports = router;