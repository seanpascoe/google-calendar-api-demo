var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
})

router.get('/:handle', (req, res) => {
  client.get('statuses/user_timeline', { screen_name: req.params.handle }, function(err, tweets) {
    if(err) {
      console.log(err);
    }
    return res.json(tweets);
  });
});

router.post('/', (req, res) => {
  client.post('statuses/update', {status: req.body.tweet}, (err, tweet) => {
    if(err) {
      throw err;
    }
    return res.json(tweet);
  });
});

module.exports = router;
