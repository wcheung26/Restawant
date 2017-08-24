var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
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

router.get("/api/restaurant/promotions", function(req, res) {
  console.log("Retrieving all promotions...");
  var activePromotions = [];
  var pastPromotions = [];
  // Find all discounts issued by the restaurant
  db.discount.findAll({
    include: [{
      model: db.promotion,
      where: {
        restaurantId: req.user.id
      }
    }, {
      model: db.influencer
    }]
  }).then(function(discounts) {
    console.log("Found all discounts for this restaurant...");
    // console.log(discounts);
    discounts.forEach(function(discount) {
      var newDiscount = {
        "promotionId": discount.promotion.id,
        "promotionName": discount.promotion.name,
        "promotionPeriod": moment(discount.promotion.createdAt).format("YYYY-MM-DD") + " to " + discount.promotion.expiration,
        "promotionOffer": discount.promotion.offer,
        "promotionReward": discount.promotion.reward,
        "influencerId": discount.influencer.id,
        "influencerName": discount.influencer.firstName + " " + discount.influencer.lastName,
        "influencerEmail": discount.influencer.email,
        "discountScans": discount.clicks
      };
      // console.log("Discount Expiration: " + discount.promotion.expiration);
      // console.log("Today: ", moment().format("YYYY-MM-DD"));
      // console.log(discount.promotion.expiration > moment().format("YYYY-MM-DD"));
      if (discount.promotion.expiration > moment().format("YYYY-MM-DD")) {
        activePromotions.push(newDiscount);
      } else {
        pastPromotions.push(newDiscount);
      }
    });
    // console.log("Active Promotions... ", activePromotions);
    // console.log("Past Promotions... ", pastPromotions);

    var summaryActive = {};
    var summaryPast = {};

    activePromotions.forEach(function(active) {
      var influencer = {
        "id": active.influencerId,
        "name": active.influencerName,
        "email": active.influencerEmail,
        "discountScans": active.discountScans
      };
      if (summaryActive[active.promotionId]) {
        summaryActive[active.promotionId]["summary"]["totalInfluencers"]++;
        summaryActive[active.promotionId]["summary"]["totalScans"] += influencer.discountScans;
        summaryActive[active.promotionId]["summary"]["totalPayout"] += influencer.discountScans * active.promotionReward;        
        summaryActive[active.promotionId]["influencers"].push(influencer);
      } else {
        summaryActive[active.promotionId] = {};
        summaryActive[active.promotionId]["summary"] = {};
        summaryActive[active.promotionId]["summary"]["totalInfluencers"] = 1;
        summaryActive[active.promotionId]["summary"]["totalScans"] = influencer.discountScans;
        summaryActive[active.promotionId]["summary"]["totalPayout"] = influencer.discountScans * active.promotionReward;
        summaryActive[active.promotionId]["promotion"] = {};
        summaryActive[active.promotionId]["promotion"]["id"] = active.promotionId;
        summaryActive[active.promotionId]["promotion"]["name"] = active.promotionName;
        summaryActive[active.promotionId]["promotion"]["period"] = active.promotionPeriod;
        summaryActive[active.promotionId]["promotion"]["offer"] = active.promotionOffer;
        summaryActive[active.promotionId]["promotion"]["reward"] = active.promotionReward;
        summaryActive[active.promotionId]["influencers"] = [];
        summaryActive[active.promotionId]["influencers"].push(influencer);
      }
    });
    // console.log("Group By Active Promotions... ", summaryActive);

    pastPromotions.forEach(function(past) {
      var influencer = {
        "id": past.influencerId,
        "name": past.influencerName,
        "email": past.influencerEmail,
        "discountScans": past.discountScans
      };
      if (summaryPast[past.promotionId]) {
        summaryPast[past.promotionId]["summary"]["totalInfluencers"]++;
        summaryPast[past.promotionId]["summary"]["totalScans"] += influencer.discountScans;
        summaryPast[past.promotionId]["summary"]["totalPayout"] += influencer.discountScans * past.promotionReward;        
        summaryPast[past.promotionId]["influencers"].push(influencer);
      } else {
        summaryPast[past.promotionId] = {};
        summaryPast[past.promotionId]["summary"] = {};
        summaryPast[past.promotionId]["summary"]["totalInfluencers"] = 1;
        summaryPast[past.promotionId]["summary"]["totalScans"] = influencer.discountScans;
        summaryPast[past.promotionId]["summary"]["totalPayout"] = influencer.discountScans * past.promotionReward;
        summaryPast[past.promotionId]["promotion"] = {};
        summaryPast[past.promotionId]["promotion"]["id"] = past.promotionId;
        summaryPast[past.promotionId]["promotion"]["name"] = past.promotionName;
        summaryPast[past.promotionId]["promotion"]["period"] = past.promotionPeriod;
        summaryPast[past.promotionId]["promotion"]["offer"] = past.promotionOffer;
        summaryPast[past.promotionId]["promotion"]["reward"] = past.promotionReward;
        summaryPast[past.promotionId]["influencers"] = [];
        summaryPast[past.promotionId]["influencers"].push(influencer);
      }
    });
    // console.log("Group By Past Promotions... ", summaryPast);

    summaryActive = Object.values(summaryActive);
    summaryPast = Object.values(summaryPast);
    // console.log("Group By Active Promotions... ", summaryActive);
    // console.log("Group By Past Promotions... ", summaryPast);

    summaryActive.forEach(function(promotion) {
      promotion["influencers"].sort(function(a, b) {
        return b.discountScans - a.discountScans
      });
    });
    // Return the top 5 influencers
    summaryActive.forEach(function(promotion) {
      promotion["influencers"] = promotion["influencers"].slice(0, 5);
    });
    console.log("Sorted Trimmed Group By Active Promotions... ", summaryActive);

    summaryPast.forEach(function(promotion) {
      promotion["influencers"].sort(function(a, b) {
        return b.discountScans - a.discountScans
      });
    });
    // Return the top 5 influencers
    summaryPast.forEach(function(promotion) {
      promotion["influencers"] = promotion["influencers"].slice(0, 5);
    });
    console.log("Sorted Trimmed Group By Past Promotions... ", summaryPast);

    var summary = {
      "active": summaryActive,
      "past": summaryPast
    };
    // console.log("What actually gets sent over... ", summary);

    res.send(summary);

  });
});

  
router.get("/api/restaurant/influencers", function(req, res) {
  console.log("Retrieving all influencers...");
  // Find all the influencers in the database
  var influencers = {};
  db.discount.findAll({
    include: [ db.influencer ]
  }).then(function(discounts) {
    // console.log("All discounts...", discounts);
    discounts.forEach(function(discount) {
      if (influencers[discount.influencer.id]) {
        influencers[discount.influencer.id]["totalScans"] += discount.clicks;
      } else {
        influencers[discount.influencer.id] = {};
        influencers[discount.influencer.id]["id"] = discount.influencer.id;
        influencers[discount.influencer.id]["name"] = discount.influencer.firstName + " " + discount.influencer.lastName;
        influencers[discount.influencer.id]["email"] = discount.influencer.email;
        influencers[discount.influencer.id]["totalScans"] = discount.clicks;
      }
    });

    influencers = Object.values(influencers);
    // console.log("Group By All Influencers... ", influencers);

    influencers.sort(function(a, b) {
      return b.totalScans - a.totalScans;
    })

    // Return the top 20 influencers
    influencers = influencers.slice(0, 20);
    console.log("Sorted Group By All Influencers... ", influencers);

    res.send(influencers);

  });
});

router.get("/api/restaurant/summary", function(req, res) {
  console.log("Retrieving summary...");
  // Find restaurant's top 5 influencers
  var influencers = {};
  var finance = {
    "totalScans": 0,
    "totalPayout": 0
  };
  db.discount.findAll({
    include: [{
      model: db.promotion,
      where: {
        restaurantId: req.user.id
      }
    }, {
      model: db.influencer
    }]
  }).then(function(discounts) {
    // console.log("All discounts...", discounts);
    discounts.forEach(function(discount) {
      // console.log("Current Scan...", discount.clicks);
      // console.log("Current Reward...", discount.promotion.reward);
      // console.log("Current Payout...", discount.clicks * discount.promotion.reward);
      finance["totalScans"] += discount.clicks;
      finance["totalPayout"] += discount.clicks * discount.promotion.reward;
      if (influencers[discount.influencer.id]) {
        influencers[discount.influencer.id]["totalScans"] += discount.clicks;
        influencers[discount.influencer.id]["totalPayout"] += discount.clicks * discount.promotion.reward;
      } else {
        influencers[discount.influencer.id] = {};
        influencers[discount.influencer.id]["id"] = discount.influencer.id;
        influencers[discount.influencer.id]["name"] = discount.influencer.firstName + " " + discount.influencer.lastName;
        influencers[discount.influencer.id]["email"] = discount.influencer.email;
        influencers[discount.influencer.id]["totalScans"] = discount.clicks;
        influencers[discount.influencer.id]["totalPayout"] = discount.clicks * discount.promotion.reward;
      }
    });

    influencers = Object.values(influencers);
    influencers.forEach(function(influencer) {
      influencer["averagePayout"] = (influencer["totalPayout"] / influencer["totalScans"]).toFixed(2);
    });
    // console.log("Group By All Influencers... ", influencers);

    finance["averagePayout"] = (finance["totalPayout"] / finance["totalScans"]).toFixed(2);
    console.log("Finance Summary... ", finance);

    influencers.sort(function(a, b) {
      return b.totalScans - a.totalScans;
    })

    // Return the top 5 influencers
    influencers = influencers.slice(0, 5);
    console.log("Sorted Group By Top 5 Influencers... ", influencers);

    var summary = {
      "influencers": influencers,
      "finance": finance
    };
    res.send(summary);
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
  	}]
  }).then(function(doc) {
    console.log("===================")
    console.log("Sending doc...")
    res.send(doc);
  });
});

router.get("/api/influencer/summary", function(req, res) {
  console.log("===================") 
  console.log("Retrieving discounts under influencer...");  
  console.log("===================")
  db.discount.findAll({
    where: {
      influencerId: req.user.id
    },
    include: [{ 
      model: db.promotion,
      include: [{
        model: db.restaurant
      }]
    }]
  }).then(function(doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// router.get("/api/restaurant/summary", function(req, res) {
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