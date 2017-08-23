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
  // This function hits our own server to retrieve the record of query results
  getInflHistory: function(iid) {
    return axios.get(`/api/${iid}/history`);
  },

  getBizHistory: function(rid) {
    return axios.get(`/api/${rid}/history`);
  },
    
	yelpQuery: function(id, email, password) {
		console.log("Yelp Query Run");
		return axios.get(`https://api.yelp.com/v2/business/${id}`)
		.then(function(results) {
				console.log("this is yelpQuery results")
				console.log(results)
				var addressFormatted = results.data.location.display_address.join()
				$.post("/api/yelp/" + results.data.id, {
			    	phone: results.data.display_phone, 
			    	address: addressFormatted, 
			    	image: results.data.snippet_image_url, 
			    	name: results.data.name,
			    	email: email,  
			    	password: passowrd
				}).done(function(data) {
					console.log("restaurant posted")
				})
		})
	} 
}

// We export the helpers function
module.exports = helpers;