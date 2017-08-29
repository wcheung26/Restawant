// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Helper Functions
var helpers = {

  checkRestaurantAuth: function() {
    return axios.get('/auth/restaurant');
  },

  checkInfluencerAuth: function() {
    return axios.get('/auth/influencer');
  },

  checkAdminAuth: function() {
    return axios.get('/auth/admin');
  },

	checkUserAuth: function() {
		return axios.get('/auth/user');
	},

	logOut: function() {
		return axios.get('/auth/logout');
	},

	createRestaurantPromo: function(promo) {
		console.log("Promo: ", promo);
		// return axios.post("/api/restaurant/promotions", promo);
		$.post("/api/restaurant/promotions", promo)
		.done(function(data) {
			console.log("Promo code successfuly created!");
		});
	},

  getRestaurantPromotions: function() {
    return axios.get("/api/restaurant/promotions");
  },

  getInfluencers: function() {
    return axios.get("/api/restaurant/influencers");
  },

  getRestaurantSummary: function() {
    return axios.get("/api/restaurant/summary");
  },

  incrementCount: function(promotionId, influencerId) {
  	console.log("incrementCount");
  	return $.post("/api/qr/increment", {
  		promotionId: promotionId,
  		influencerId: influencerId
  	})
  },

	// ==================================
	// Influencer panel helpers
	getInfluencerPromotions: function() {
		console.log("===================");
		console.log("getInfluencerPromotions");
		console.log("===================");
		return $.get("/api/influencer/promotions");
	},

  // Get influencer summary data
	getInflHistory: function() {
		return $.get("/api/influencer/summary");
	},

	// Get active promotions for specific restaurant (for influencer modal)
	getActivePromotions: function(rId) {
		return $.get(`/api/influencer/findPromotions/${rId}`)
	},

	generateQR: function(promotionId) {
		return $.get(`/api/qr/${promotionId}`)
	},

	// ==================================
	// Admin panel helpers

  getAdminApprove: function() {
    return $.get("/api/admin");
  },

  approveRestaurant: function(id) {
    return $.post("/api/admin/approve", id);
  },

  denyRestaurant: function(id) {
    return $.post("/api/admin/deny", id);
  }

  // getBizHistory: function(rid) {
  //   return axios.get(`/api/${rid}/history`);
  // },
    
  // yelpQuery: function(id, email, password) {
  //  console.log("Yelp Query Run");
  //  return axios.get(`https://api.yelp.com/v2/business/${id}`);
  //  // .then(function(results) {
  //  //    console.log("this is yelpQuery results")
  //  //    console.log(results)
  //  //    var addressFormatted = results.data.location.display_address.join()
  //  //    $.post("/api/yelp/" + results.data.id, {
  //  //        phone: results.data.display_phone, 
  //  //        address: addressFormatted, 
  //  //        image: results.data.snippet_image_url, 
  //  //        name: results.data.name,
  //  //        email: email,  
  //  //        password: passowrd
  //  //    }).done(function(data) {
  //  //      console.log("restaurant posted")
  //  //    })
  //  // })
  // } 
}

// We export the helpers function
module.exports = helpers;