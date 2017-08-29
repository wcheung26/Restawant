var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var db = require("../models");
var sequelize = require('sequelize');

// URL for QR codes, change productionURL for deployment
var hostURL = process.env.PRODUCTION_URL || "http://localhost:8080";

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
  db.promotion.findAll({
    where: {
      restaurantId: req.user.id
    }
  }).then(function(promotions) {
    // console.log("All Promotions... ", promotions);
    var promotionCount = 0;
    promotions.forEach(function(promotion) {
      var information = {
        "promotion": {
          "id": promotion.id,
          "name": promotion.name,
          "offer": promotion.offer,
          "createdAt": moment(promotion.createdAt).format("MMMM D, YYYY"),
          "expiration": moment(promotion.expiration).format("MMMM D, YYYY"),
          "reward": promotion.reward
        }
      };
      // console.log("Promotion...", promotion);
      // Find all the influencers for this promotion
      db.discount.findAll({
        include: [{
          model: db.promotion,
          where: {
            id: promotion.id,
            restaurantId: req.user.id
          }
        }, {
          model: db.influencer
        }]
      }).then(function(discounts) {
        promotionCount++;
        console.log("Promotion Count: ", promotionCount);
        // console.log("Discounts... ", discounts);
        // If there are no influencers for the given promotion
        if (discounts.length === 0) {
          information["influencers"] = [];
          information["summary"] = {
            totalInfluencers: 0,
            totalScans: 0,
            totalPayout: 0
          };
        } else {
          // If there are influencers for the given promotion, push each of them into influencers array
          var influencers = [];
          var summary = {
            "totalInfluencers": 0,
            "totalScans": 0,
            "totalPayout": 0
          };

          discounts.forEach(function(discount) {
            var newDiscount = {
              "id": discount.influencer.id,
              "name": discount.influencer.firstName + " " + discount.influencer.lastName,
              "email": discount.influencer.email,
              "discountScans": discount.clicks              
            }; 
            influencers.push(newDiscount);
            summary["totalInfluencers"] += 1;
            summary["totalScans"] += discount.clicks;
            summary["totalPayout"] += discount.clicks * discount.promotion.reward
          });
          // Sort influencers array
          influencers.sort(function(a, b) {
            return b.discountScans - a.discountScans;
          });
          // Return the top 5 influencers only
          influencers.slice(0, 5);
          // Put the influencers array into the information object
          information["influencers"] = influencers;
          // Put the summary array into the information object
          information["summary"] = summary;
        }

        // For each promotion, check whether it is an active or past promotion
        if (promotion.expiration >= moment().format("YYYY-MM-DD")) {
          activePromotions.push(information);
        } else {
          pastPromotions.push(information);
        }

        if (promotionCount === promotions.length) {
          console.log("Active Promotions... ", activePromotions);
          console.log("Past Promotions... ", pastPromotions);
          res.send({
            "active": activePromotions,
            "past": pastPromotions
          });
        }
      });
    });
  });
});

  
router.get("/api/restaurant/influencers", function(req, res) {
  console.log("Retrieving all influencers...");
  // Find all the influencers in the database
  var allInfluencers = [];
  db.influencer.findAll({}).then(function(influencers) {
    // For each influencer, see whether they have discounts
    var influencerCount = 0;
    influencers.forEach(function(influencer) {
      var information = {
        "id": influencer.id,
        "name": influencer.firstName + " " + influencer.lastName,
        "email": influencer.email,
        "totalScans": 0
      };

      db.discount.findAll({
        include: {
          model: db.influencer,
          where: {
            id: influencer.id
          }
        }
      }).then(function(discounts) {
        influencerCount++;
        // console.log("Discounts for this influencer... ", discounts);
        if (discounts.length !== 0) {
          discounts.forEach(function(discount) {
            information["totalScans"] += discount.clicks;
          });
        }

        // Add influencer to allInfluencers array
        allInfluencers.push(information);

        if (influencerCount === influencers.length) {
          // Sort influencers by totalScans
          allInfluencers.sort(function(a, b) {
            return b.totalScans - a.totalScans;
          })

          // Return the top 20 influencers
          allInfluencers = allInfluencers.slice(0, 20);

          console.log("All Influencers... ", allInfluencers);
          res.send(allInfluencers);
        }
      });
    });
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

    // influencers = Object.values(influencers);
    influencers = Object.keys(influencers).map(function(key) {
      return influencers[key];
    });

    influencers.forEach(function(influencer) {
      if (influencer["totalScans"] === 0) {
        influencer["averagePayout"] = 0;
      } else {
        influencer["averagePayout"] = (influencer["totalPayout"] / influencer["totalScans"]).toFixed(2);
      }
    });
    // console.log("Group By All Influencers... ", influencers);

    if (finance["totalScans"] === 0) {
      finance["averagePayout"] = 0;
    } else {
      finance["averagePayout"] = (finance["totalPayout"] / finance["totalScans"]).toFixed(2);
    }
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


router.get("/api/influencer/find/:state/:city", function(req, res) {
  state = decodeURI(req.params.state);
  city = decodeURI(req.params.city);
  console.log("===================");
  console.log("State:", state);
  console.log("City:", city);
  console.log("===================");
  db.restaurant.findAll({
    where: {
      state: state,
      city: city
    }
  }).then(function(doc) {
    console.log("Sending:", doc);
    res.send(doc);
  })
})

// Query influencer's existing promtions
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

// Query for a selected restaurant's active promotions to sign up for
router.get("/api/influencer/findPromotions/:rId", function(req, res) {
  console.log("Retrieving desired restaurant promotions...");
  db.promotion.findAll({
    where: {
      restaurantId: req.params.rId
    }
  }).then(function(promotions) {
    console.log("Sending promotions:", promotions)
    res.send(promotions)
  })
});

// Generate new qr for influencer specific to the promotion
router.get("/api/qr/:promotionId" ,function(req, res) {
  // Real QR scans require a produciton URL as hostURL
  var qrTarget = hostURL + "/api/qr/" + req.params.promotionId + "/" + req.user.id;
  var qrUrl = "http://qrickit.com/api/qr.php?d=" + qrTarget;
  console.log(qrUrl);
  db.discount.create({
    url: qrUrl,
    promotionId: req.params.promotionId, 
    influencerId: req.user.id
  }).then(function(results) {
   res.send(qrUrl);
  })
})

// Listen to QR code scans
router.get("/api/qr/:promotionId/:influencerId", function(req, res) {
  db.promotion.findAll({
    where: {
      id: req.params.promotionId
    }
  }).then(function(promotion) { 
    if (req.user && (promotion[0].restaurantId == req.user.id)) {
      db.discount.update({
        clicks: sequelize.literal('clicks + 1')
      },
      {
        where: {
          promotionId: req.params.promotionId,
          influencerId: req.params.influencerId
        }
      }).then(function(doc) {
        res.redirect("/api/restaurant/qr/confirm")
      })
    } else {
      res.redirect("/api/restaurant/qr/confirm")      
    }
  })
})


router.get("/api/admin", function(req, res) {
  db.restaurant.findAll({
    where: {
      isVerified: false
    }
  }).then(function(doc) {
    res.send(doc);
  });
});

router.post("/api/admin/approve", function(req, res) {
  db.restaurant.update({
      isVerified: true
    },
    {
      where: {
        id: req.body.id
      }
  }).then(function(doc) {
    res.send(doc);
  });
});

router.post("/api/admin/deny", function(req, res) {
  db.restaurant.destroy({
    where: {
      id: req.body.id
    }
  }).then(function(doc) {
    res.end();
  });
});

router.get("/api/influencer/summary", function(req, res) {
  console.log("Retrieving summary...");
  var restaurants = {};
  // Find all of the user's existing discounts
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
  }).then(function(discounts) {
      // console.log("All of user's existing discounts... ", discounts);
      discounts.forEach(function(discount) {
        if (restaurants[discount.promotion.restaurant.id]) {
          if (restaurants[discount.promotion.restaurant.id]["promotionsId"].indexOf(discount.promotion.id) === -1) {
            restaurants[discount.promotion.restaurant.id]["promotionsId"].push(discount.promotion.id);
          };
          restaurants[discount.promotion.restaurant.id]["totalScans"] += discount.clicks;
          restaurants[discount.promotion.restaurant.id]["totalEarnings"] += discount.clicks * discount.promotion.reward;
        } else {
          restaurants[discount.promotion.restaurant.id] = {};
          restaurants[discount.promotion.restaurant.id]["restaurantId"] = discount.promotion.restaurant.id;
          restaurants[discount.promotion.restaurant.id]["restaurantName"] = discount.promotion.restaurant.name;
          restaurants[discount.promotion.restaurant.id]["promotionsId"] = []; 
          restaurants[discount.promotion.restaurant.id]["promotionsId"].push(discount.promotion.id);
          restaurants[discount.promotion.restaurant.id]["totalScans"] = discount.clicks;
          restaurants[discount.promotion.restaurant.id]["totalEarnings"] = discount.clicks * discount.promotion.reward;
        }
      });

      // restaurants = Object.values(restaurants);
      restaurants = Object.keys(restaurants).map(function(key) {
        return restaurants[key];
      });
      // console.log("Group By Restaurants... ", restaurants);

      restaurants.forEach(function(restaurant) {
        restaurant["promotionsParticipated"] = restaurant["promotionsId"].length;
      });
      console.log("Group By Restaurants... ", restaurants);
      res.send(restaurants);
  });
});

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