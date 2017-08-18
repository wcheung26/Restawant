var express = require('express');
var router = express.Router();
var path = require('path');

// Display index on any route not specified
router.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = router;