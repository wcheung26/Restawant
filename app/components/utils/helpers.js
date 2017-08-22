// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Helper Functions
var helpers = {

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
			    	password: password
				}).done(function(data) {
					console.log("restaurant posted")
				})
		})
	} 

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;