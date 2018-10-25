
$(document).ready(() => {
    $('#description').css('margin-top', `${$('.header-nav').height()}px`);
    $(window).resize(() => {
        $('#description').css('margin-top', `${$('.header-nav').height()}px`)
    });

    $('.mobile-nav > img:first-child').click(() => {
        $('.mobile-nav > img:first-child').css('display', 'none');
        $('.mobile-nav img:nth-child(2)').css('display', 'block');
        $('.header-nav').css({
            'background-color': 'rgba(0, 0, 0, 1)'
        });
        $('body').css('overflow', 'hidden');
        let h = $('.header-nav').height();
        let styles = {
            'display': 'block',
            'height': `calc(100vh - ${h}px)`,
            'top': `${h}px`,
        };

        $('.mobile-abs-nav').css(styles);
        $('.mobile-abs-nav').removeClass('fadeOut');
        $('.mobile-abs-nav').addClass('fadeIn');

    });
    $('.mobile-nav > img:nth-child(2)').click(() => {
        $('.mobile-nav > img:first-child').css('display', 'block');
        $('.mobile-nav img:nth-child(2)').css('display', 'none');
        $('.header-nav').css('background-color', 'transparent');
        $('body').css('overflow', 'auto');

        // $('.mobile-abs-nav').css(styles)
        $('.mobile-abs-nav').removeClass('fadeIn');
        $('.mobile-abs-nav').addClass('fadeOut');
        setTimeout(() => {
            $('.mobile-abs-nav').css('display', 'none');
        }, 500)
    });

    $('.mobile-abs-nav a').click(()=>{
        $('.mobile-nav > img:nth-child(2)').trigger('click');
    })


    $('.picker ').on('click', 'img', (event) => {
        let target = event.target.src;
        $('.main img').attr('src', target)
    })

});