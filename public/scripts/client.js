
//Client-side JS logic goes here
//jQuery is already loaded
//Use jQuery's document ready function

//to handle cross-site Scripting
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
      <p class="message">${escape(tweetData.content.text)}</p>

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
    
    //validate the textarea
    if (dataLength > 140) {
      //if error message already exists, remove the <p> tag and hide the .error div
      if($("#errorMessage")) {
        $("#errorMessage").remove();
        $(".error").hide();
      }
      $(".error")
      if($(".error").is(":hidden")) {
        $(".error").slideDown("slow").append("<p id='errorMessage'>Please, don't exceed the max length</p>");
      } 
    } else if(dataLength === 0) {
      //if error message already exists, remove the <p> tag and hide the .error div
      if($("#errorMessage")) {
        $("#errorMessage").remove();
        $(".error").hide();
      }
      if($(".error").is(":hidden")) {
        $(".error").slideDown("slow").append("<p id='errorMessage'>You can't post an empty tweet</p>");
      } 
    } else {
      if($(".error").is(":visible")) {
        $(".error").hide();
      } 
      
      $.post( "/tweets", data).then(function( response ) {
      console.log( "Data Loaded: " + response );
      lastTweet();
      });
    }
  });

  const loadTweets = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({url}).then((response) => {
        renderTweets(response);
    });
  }

  // this function fetches the last tweet added passes it to the renderTweets
  const lastTweet = function() {
    const url = '/tweets';
    $.ajax({url}).then((response) => {
      //make the content of the textarea empty on after fetching a new tweet
      $('#tweet-text').val("");
      //reset the counter to 140 characters back
      $('.counter').val("140");
      renderTweets([response[response.length-1]]);
    });
  }
  loadTweets();
});



