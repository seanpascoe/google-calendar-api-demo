import React from 'react';
import $ from 'jquery';

class Tweets extends React.Component {
  constructor(props) {
    super(props)
    this.tweets = this.tweets.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.state = {tweets: []}
  }

  postTweet(e) {
    e.preventDefault();
    let tweet = this.refs.tweet.value;
    this.refs.postTweetForm.reset();
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: {tweet}
    }).done(tweet => {
      console.log(tweet.text, tweet.user.description);

    });
  }

  tweets() {
    return this.state.tweets.map(tweet => {
      return (<li className="collection-item" key={tweet.id}>{tweet.text}</li>);
    });
  }

  getTweets(e) {
    e.preventDefault();
    $.ajax({
      url: `/tweets/${this.refs.handle.value}`,
      type: 'GET'
    }).done(tweets => {
      this.setState({ tweets });
      this.refs.tweetForm.reset();
    });
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Post Tweet</h3>
        <form ref="postTweetForm" onSubmit={this.postTweet}>
          <input ref="tweet" placeholder="Tweet..." />
        </form>
        <h3 className="text-center">Tweets</h3>
        <form ref="tweetForm" onSubmit={this.getTweets}>
          <input ref="handle" placeholder="Handle..." />
        </form>
        <ul className="collection">
          {this.tweets()}
        </ul>
      </div>
    )
  }
}

export default Tweets;
