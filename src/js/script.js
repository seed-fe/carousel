// $(document).ready(function() {
// 	var slide = $('.slide-li');
// 	console.log(slide);
// });
$(document).ready(function() {
    $('.slide-li').eq(0).clone().addClass('clone').prependTo('#slides');
    $('.slide-li:last-child').clone().addClass('clone').appendTo('#slides');
    var slideNum = $('.slide-li').length,
        width = 1920 * slideNum;
        // windowWidth = window.innerWidth;
    $('#slides').css('width', width + 'px');
    // $('.slide-li').css('width', windowWidth + 'px');
    $(window).on('resize', function() {
        // windowWidth = window.innerWidth;
        // $('.slide-li').css('width', windowWidth + 'px');
    });
    $('.next')
});