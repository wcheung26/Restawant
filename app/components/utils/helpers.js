var axios = require("axios");

var helper = {

  // This function hits our own server to retrieve the record of query results
  getInflHistory: function(iid) {
    return axios.get(`/api/${iid}/history`);
  },

  getBizHistory: function(rid) {
    return axios.get(`/api/${rid}/history`);
  },

// We export the API helper
module.exports = helper;
