$(document).ready(function() {
  // $(function(){
  //   var currentPageName = getPageName(window.location.pathname);
  //   $('#' + currentPageName).addClass('active');
  // });
  var topButton = $('#topButton')
  $(window).scroll(function() {
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
