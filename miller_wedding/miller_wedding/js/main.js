// Make it rain!

// $(window).on('scroll', function () {
//  	var distanceScrolled = $(window).scrollTop();
//  	console.log('The distance scrolled is: ' + distanceScrolled);
//  	if ($(this).scrollTop() >= 550) {
//  	   $('nav').addClass('scrolled');
//  } else {
//  	   $('nav').removeClass('scrolled');
// };

var translateX = 0;

$('#right').on('click', function () {
	if (translateX === -87.5) {
		translateX = 0;
	} else {
		translateX -= 12.5;
	}

	$('.slides').css('transform', 'translateX(' + translateX + '%)');
});

$('#left').on('click', function () {
	if (translateX === 0) {
		translateX = -87.5;
	} else {
		translateX += 12.5;
	}

	$('.slides').css('transform', 'translateX(' + translateX + '%)');
});
