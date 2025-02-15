//adds css class to counter if number of counts goes beyond the 140
//it also renders timeago library
$(document).ready(function() {
  const maxLength = 140;
  $('textarea').on('keyup', function(event) {
    //get the text length from textarea
    let textLen = maxLength - ($(this).val().length);
    // add class red if textlength < 0
    if(textLen < 0) {
      $(this).parents("form").children("div.new-tweet-submit").children(".counter").addClass("red");  
      // remove class red if the textlength > 0  
    } else {
      $(this).parents("form").children("div.new-tweet-submit").children(".counter").removeClass("red");
    }
    //dynnamically reduce the count of the characters
    $(this).parents("form").children("div.new-tweet-submit").children(".counter").text(textLen)
  });
  //render the timeago
  timeago.render(document.querySelectorAll('.time-posted'));
});