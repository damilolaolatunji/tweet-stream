import React, { Component } from 'react';
import Pusher from 'pusher-js';
import TimeAgo from 'react-timeago';
import './App.css';

class App extends Component {
  state = {
    tweets: [],
  };

  componentDidMount() {
    const pusher = new Pusher('<your app key>', {
      cluster: '<your app cluster>',
      encrypted: true,
    });

    const channel = pusher.subscribe('tweets');
    channel.bind('new-tweet', data => {
      const { tweets } = this.state;
      tweets.push(data.payload);

      this.setState({
        tweets,
      });
    });
  }

  render() {
    const { tweets: tweetArr } = this.state;

    const Tweet = (tweet, index) => (
      <div className="tweet" key={index}>
        <p className="user">
          <span className="screen-name">{tweet.user__name}</span>
          <span className="username">{tweet.user__screen_name}</span>
        </p>
        <p className="tweet-text">{tweet.text}</p>
        <div className="meta">
          <div>
            <span className="retweets">Retweets: {tweet.retweet_count}</span>
            <span className="likes">Likes: {tweet.favorite_count}</span>
          </div>
          <a href={tweet.url}>
            <TimeAgo date={tweet.created_at} />
          </a>
        </div>
      </div>
    );

    const tweets = tweetArr.map((tweet, index) => Tweet(tweet, index));

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tweets</h1>
        </header>

        <main className="tweets">{tweets}</main>
      </div>
    );
  }
}

export default App;
