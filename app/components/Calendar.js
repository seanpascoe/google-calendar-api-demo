import React from 'react';
import $ from 'jquery';



class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.events = this.events.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.authWindow;
    this.getEventItems = this.getEventItems.bind(this);
    this.state = {eventItems: [], code: ''}
  }

  postTweet(e) {
    e.preventDefault();
    let tweet = this.refs.tweet.value;
    this.refs.postTweetForm.reset();
    $.ajax({
      url: '/calendar',
      type: 'POST',
      data: {tweet}
    }).done(tweet => {
      console.log(tweet.text, tweet.user.description);
    });
  }

  events() {
    console.log(this.state.eventItems);
    return this.state.eventItems.map(event => {
      let eventDate;
      if(event.start.dateTime) {
        let rawDate = new Date(event.start.dateTime);
        eventDate = rawDate.toLocaleString();
      } else {
        let rawDate = new Date(`${event.start.date}T13:03:03`);
        eventDate = `${rawDate.toLocaleDateString()} (All Day)`
      }
      return (<li className="collection-item" key={event.id}>{eventDate} - {event.summary}</li>);
    });
  }

  getEventItems(code) {
    $.ajax({
      url: '/calendar/getEvents',
      type: 'GET',
      data: {code: code}
    }).done(eventItems => {
      this.setState({ eventItems });
    });
  };

  getEvents(e) {
    e.preventDefault();
    $.ajax({
      url: `/calendar`,
      type: 'GET'
    }).done(url => {
      this.authwindow = window.open(url, "Please login with google", "width=500,height=500p");
    });
  }

  render() {
    window.onmessage = function(e) {
      console.log(e.data);
      if (typeof e.data !==  "object") {
        let urlWithCode = e.data;
        let idx = urlWithCode.lastIndexOf('code=');
        let code = urlWithCode.substring(idx + 5).replace('#', '');
        this.getEventItems(code);
      }
    }.bind(this)
    return (
      <div>
        {/* <h3 className="text-center">Create Calendar Event</h3>
        <form ref="postTweetForm" onSubmit={this.postTweet}>
          <input ref="tweet" placeholder="Tweet..." />
        </form> */}
        <h3 className="text-center">Get your next 10 Events</h3>
        <form ref="eventForm" onSubmit={this.getEvents}>
          <button className="btn" type="submit">Get Events</button>
        </form>
        <ul className="collection">
          {this.events()}
        </ul>
      </div>
    )
  }
}

export default Calendar;
