// $(document).ready(function() {
// 	var slide = $('.slide-li');
// 	console.log(slide);
// });
$(document).ready(function() {
    $('.slide-li:last-child').clone().addClass('clone').prependTo('#slides');
    $('.slide-li').eq(1).clone().addClass('clone').appendTo('#slides');
    
    var slideNum = $('.slide-li').length,
        width = 1920 * slideNum,
        left = -1920,
        index = 1,
        windowWidth = window.innerWidth,
        autoTimer = null;
    var imgWidth = $('.slide-li').width();
    $('.slide-li img').css('marginLeft', -(imgWidth - windowWidth) / 2 + 'px');
    $('#slides').css({'width': width + 'px', 'left': left + 'px'});
    // 左右箭头切换
    $('.next').on('click', function(e) {
        left-=1920;
        $('#slides').animate({left: left + 'px'}, 800, function() {
            index += 1;
            if (index > slideNum - 2) {
                // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                $('#slides').css('left', -1920 + 'px');
                index = 1;
                left = -1920;
            }
        });
    });
    $('.prev').on('click', function(e) {
        left += 1920;
        $('#slides').animate({left: left + 'px'}, 800, function() {
            index -= 1;
            if (index < 1) {
                // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                $('#slides').css('left', -1920*4 + 'px');
                index = 4;
                left = -1920*4;
            }
        })
        
    });
    $(window).on('resize', function() {
        windowWidth = window.innerWidth;
        $('.slide-li img').css('marginLeft', -(imgWidth - windowWidth) / 2 + 'px');
    });
});