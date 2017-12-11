$(document).ready(function() {
  console.log("== hello world ==");
  var secondNav = $('#secondNav')
  var topButton = $('#topButton')
  $(window).scroll(function() {
    if($(window).scrollTop() > 56) {
      // secondNav.css('visibility', 'visible');
      secondNav.fadeIn(500);
    } else {
      // secondNav.css('visibility', 'hidden');
      secondNav.fadeOut(500);
    }
    if($(window).scrollTop() > 100) {
      topButton.css('visibility', 'visible');
    } else {
      topButton.css('visibility', 'hidden');
    }
});
  $('#topButton').on('click', function(){
    console.log("-- click topButton --");
    window.scrollTo(0, 0);
  })
});
