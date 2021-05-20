/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//data for the tweet
// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const escape = function (str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

// this function creates a markup for the tweet
function createTweetElement (tweetData) {
  const newTime = timeago.format(tweetData.created_at);
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
    
      <span class="time-posted" datetime="${tweetData.created_at}">${newTime}</span>
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
    $('#tweets-container').prepend($tweet);
  }
  
}

$(document).ready(function() { 
  //const $tweet = createTweetElement(tweetData); //why should we use $ sign before tweet?

  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  //$('#tweets-container').append($tweet); 
  //renderTweets(data);

  //Event handler for submitting a form
  $( "#submitTweet" ).submit(function( event ) {
   // console.log("form submitted");
    event.preventDefault();
    //serialize the data coming from the form
    let data = $( this).serialize();
   let textData = $(this).find("[name = 'text']").val().trim();

  
    const url ='/tweets';

    //get the length of data
    const dataLength = textData.length
    console.log(dataLength);
    if (dataLength > 140) {
      alert("Your tweet should not exceed more thna 140 characters");
    } else if(dataLength === 0) {
      alert("Your tweet can't be empty");
    } else {
      $.post( "/tweets", data).then(function( response ) {
      console.log( "Data Loaded: " + response );
      lastTweet();
  });
      // $.ajax({
      //   type: "POST",
      //   url: url,
      //   data: data,
      //   success: function(data) {
      //     console.log(data);
      //   }
      //   // dataType: dataType
      // })
      
    }
    

  
    

  });

  const loadTweets = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({url}).then((response) => {
        renderTweets(response);
    });
  }

  const lastTweet = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({url}).then((response) => {
      $('#tweet-text').val("");
      $('.counter').val("140");
      renderTweets([response[response.length-1]]);
    });
  }
  loadTweets();
 
 
});



