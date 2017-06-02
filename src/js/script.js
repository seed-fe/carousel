// $(document).ready(function() {
// 	var slide = $('.slide-li');
// 	console.log(slide);
// });
$(document).ready(function() {
    // 插入用于无缝滚动的附属节点
    $('.slide-li:last-child').clone().addClass('clone').prependTo('#slides');
    $('.slide-li').eq(1).clone().addClass('clone').appendTo('#slides');
    
    var imgWidth = 0, // 图片宽度
        slideNum = $('.slide-li').length, // 滚动图片数，包括了附属节点
        slidesWidth = 1920 * slideNum, // slide的总宽度
        left = 0, //slide的左偏移量
        index = 1, // 当前图片的索引
        windowWidth = window.innerWidth, // 浏览器窗口宽度
        buttons = $('.buttons li'), // 底部切换按钮
        delayTimer = null, // 底部按钮延迟切换定时器
        autoTimer = null; // 自动切换的定时器
    $('.slide-li img').on('load', function() { // 图片宽度要在图片加载完成后才能获取，由于load事件的异步性，和imgWidth有关的语句都要写在load事件的回调函数里
        imgWidth = $(this).width();
        left = -imgWidth;
        if (imgWidth > windowWidth) {
            $('.slide-li').css('width', imgWidth + 'px');
            $('.slide-li img').css('marginLeft', -(imgWidth - windowWidth) / 2 + 'px');
        }
        $('#slides').css({'width': slidesWidth + 'px', 'left': left + 'px'});
    })
    
    // 左右箭头切换
    $('.next').on('click', function(e) {
        slideTo(-imgWidth, 1);
    });
    $('.prev').on('click', function(e) {
        slideTo(imgWidth, -1);
    });
    function slideTo (offset, indexP) {
        // body... 
        left += offset;
        $('#slides').stop(true, true).animate({left: left + 'px'}, 800, function() {
            index += indexP;
            if (index > slideNum - 2) {
                // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                $('#slides').css('left', -imgWidth + 'px');
                index = 1;
                left = -imgWidth;
                return;
            }
            if (index < 1) {
                // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                $('#slides').css('left', -imgWidth*(slideNum - 2) + 'px');
                index = (slideNum - 2);
                left = -imgWidth*(slideNum - 2);
            }
            buttons.eq(index - 1).addClass('on').siblings().removeClass('on');
        });
    }
    // 下方圆按钮切换
    buttons.on('mouseenter', function(e) {
        var buttonIndex = buttons.index($(this)) + 1;
        if (delayTimer) {
            clearTimeout(delayTimer);
            // delayTimer = null;
        }
        delayTimer = setTimeout(function() {
            $('#slides').animate({left: -imgWidth * buttonIndex + 'px'}, 800, function() {
                buttons.eq(buttonIndex - 1).addClass('on').siblings().removeClass('on');
            });
            delayTimer = null;
        }, 400);
    });
    // 自动切换
    if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
    }
    autoTimer = setInterval(function() {
        left -= imgWidth;
        $('#slides').stop(true, true).animate({left: left + 'px'}, 800, function() {
            index += 1;
            if (index > slideNum - 2) {
                // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                $('#slides').css('left', -imgWidth + 'px');
                index = 1;
                left = -imgWidth;
            }
            $('.buttons li').eq(index - 1).addClass('on').siblings().removeClass('on');
        });
    }, 2800);
    $('#slideCon').hover(function() {
        /* Stuff to do when the mouse enters the element */
        clearInterval(autoTimer);
        autoTimer = null;
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        autoTimer = setInterval(function() {
            left -= imgWidth;
            $('#slides').stop(true, true).animate({left: left + 'px'}, 800, function() {
                index += 1;
                if (index > slideNum - 2) {
                    // 这里必须把css的left值复位的语句放在animate方法的complete回调函数里，否则由于异步性，会先执行-1920px的语句，然后800ms后执行完毕animate方法，又把left值改为-9600px，无法实现无缝滚动
                    $('#slides').css('left', -imgWidth + 'px');
                    index = 1;
                    left = -imgWidth;
                }
                $('.buttons li').eq(index - 1).addClass('on').siblings().removeClass('on');
            });
        }, 2800);
    });
    $(window).on('resize', function() {
        windowWidth = window.innerWidth;
        $('.slide-li img').css('marginLeft', -(imgWidth - windowWidth) / 2 + 'px');
    });
});