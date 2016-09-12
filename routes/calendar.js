var express = require('express');
var router = express.Router();
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var calendar = google.calendar('v3');

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URL = process.env.REDIRECT_URL;

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


router.get('/', (req, res) => {
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar'
  });
  res.send(url)
});

router.get('/getEvents', (req, res) => {
  var code = req.query.code;

  oauth2Client.getToken(code, function(err, tokens) {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
    if(!err) {
      oauth2Client.setCredentials(tokens);

      calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, resp) {
        if (err) {
          console.log(err);
        } else {
        var events = resp.items;
        res.json(events);
        }
      });

    }
  });
})

router.post('/', (req, res) => {
  client.post('statuses/update', {status: req.body.tweet}, (err, tweet) => {
    if(err) {
      throw err;
    }
    return res.json(tweet);
  });
});

module.exports = router;
