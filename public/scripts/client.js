/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//data for the tweet
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


// this function creates a markup for the tweet
function createTweetElement (tweetData) {
  const markup = `
  <article class="tweet" >
    <header>
      <div class="profile">
        <img class="profile-image" src="${tweetData.user.avatars}" />
        <p>${tweetData.user.name}</p>
      </div>
      <p class="at-name">${tweetData.user.handle}</p>
    </header>
      <p class="message">${tweetData.content.text}</p>
      <hr />
    <footer>
      <span class="time-posted" datetime="${tweetData.created_at}"></span>
        <div>
          <span class="icons flag"><i class="fas fa-flag"></i></span>
          <span class="icons retweet"><i class="fas fa-retweet"></i></span>
          <span class="icons heart"><i class="fas fa-heart"></i></span>
        </div>
    </footer>
    </article>
  `;
  return markup;
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweetData of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweetData);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  }
  
}

$(document).ready(function() { 
  //const $tweet = createTweetElement(tweetData); //why should we use $ sign before tweet?

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  //$('#tweets-container').append($tweet); 
  renderTweets(data);
 
});



