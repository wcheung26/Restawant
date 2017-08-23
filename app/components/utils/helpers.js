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

	createRestaurantPromo: function(promo) {
		console.log("Promo: ", promo);
		// return axios.post("/api/restaurant/promotions", promo);
		$.post("/api/restaurant/promotions", promo)
		.done(function(data) {
			console.log("Promo code successfuly created!");
		});
	},

	getExistingInfluencers: function() {
		return axios.get("/api/restaurant/influencers/existing");
	},

	findInfluencers: function() {
		return axios.get("/api/restaurant/influencers/all")
	},

	getRestaurantHistory: function() {
		return axios.get("/api/restaurant/history");
	}

  // This function hits our own server to retrieve the record of query results
  // getInflHistory: function(iid) {
  //   return axios.get(`/api/${iid}/history`);
  // },

 //  // This function hits our own server to retrieve the record of query results
 //  getInflHistory: function(iid) {
 //    return axios.get(`/api/${iid}/history`);
 //  },
    
	// yelpQuery: function(id, email, password) {
	// 	console.log("Yelp Query Run");
	// 	return axios.get(`https://api.yelp.com/v2/business/${id}`)
	// 	.then(function(results) {
	// 			console.log("this is yelpQuery results")
	// 			console.log(results)
	// 			var addressFormatted = results.data.location.display_address.join()
	// 			$.post("/api/yelp/" + results.data.id, {
	// 		    	phone: results.data.display_phone, 
	// 		    	address: addressFormatted, 
	// 		    	image: results.data.snippet_image_url, 
	// 		    	name: results.data.name,
	// 		    	email: email,  
	// 		    	password: passowrd
	// 			}).done(function(data) {
	// 				console.log("restaurant posted")
	// 			})
	// 	})
	// } 
}

// We export the helpers function
module.exports = helpers;