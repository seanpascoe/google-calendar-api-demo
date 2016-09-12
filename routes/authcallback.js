var express = require('express');
var router = express.Router();
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var calendar = google.calendar('v3');


router.get('/', (req, res) => {
  res.render('authWindow.jade', {code: req.query.code});
});

module.exports = router;
