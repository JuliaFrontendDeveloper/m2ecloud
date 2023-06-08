$(document).ready(function () {
    JS.init();


});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var JS = {
    clickEvent: '',
    hoverEvent: '',

    init: function () {
        JS.clickEvent = isMobile.any() ? 'touchstart' : 'click';
        JS.hoverEvent = isMobile.any() ? 'touchstart' : 'hover';

        JS.headerMenu();
        JS.toggleMenu();
        JS.featuresTabs();
        JS.topBlockAnimation();
        JS.pFilter();
        JS.faqList();
        JS.togglePlanFeatures();
        JS.spsSlider();
    },

    spsSlider: function(){
        if($('.sps_slider').length > 0){
            $('.sps_slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,
                infinite: true,
                arrows: false,
                dots: true,
                appendDots: $('.sps_slider_dots')
            });
        }
    },

    togglePlanFeatures: () => {
        $('body').on('click', '.js_toggle_plan_features', function(){
            $('#comparePlanFeatures').toggleClass('active');

            return false;
        });

        $('body').on('click', '.js_togle_ttf_cbl', function(){
            const $this = $(this);
            const block = $(this).closest('.ttf_collapse_block');
            block.toggleClass('_show');
            console.log(1234);
            return false;
        });
    },

    faqList: function(){
        $('body').on('click', '.js_toggle_faq', function(){
            var block = $(this).closest('.js_toggle_faq_block');
            if(block.hasClass('open')){
                block.removeClass('open');
                block.find('.faq_answer_block').slideUp();
            }else{
                $('.js_toggle_faq_block').removeClass('open');
                $('.js_toggle_faq_block').find('.faq_answer_block').slideUp();
                block.addClass('open');
                block.find('.faq_answer_block').slideDown();
            }

            return false;
        });
    },

    pFilter: function(){
        JS.checkSupport();

        $('body').on('click', '.js_change_currency', function(){
            const $this = $(this);
            let currency = $this.attr('data-currency');

            $('.js_change_currency').removeClass('active');
            $this.addClass('active');

            $('.p_tarifs__var_p').removeClass('active');
            $('.p_tarifs__var_p[data-ptarif="'+currency+'"]').addClass('active');

            $('.btn_tarif__amount_n').removeClass('active');
            $('.btn_tarif__amount_n[data-ptarif="'+currency+'"]').addClass('active');

            return false;
        });

        $('body').on('click', '.js_change_period', function(){
            const $this = $(this);
            let period = $this.attr('data-period');

            $('.js_change_period').removeClass('active');
            $this.addClass('active');

            $('.subtitle_p_tarif_t').removeClass('active');
            $('.subtitle_p_tarif_t[data-pperiod="'+period+'"]').addClass('active');

            $('.p_tarifs__var_item').removeClass('active');
            $('.p_tarifs__var_item[data-pperiod="'+period+'"]').addClass('active');

            if(period == 'annually'){
                $('.p_tarifs__var_price_an_ins').show();
            }else{
                $('.p_tarifs__var_price_an_ins').hide();
            }

            return false;
        });

        $('body').on('click', '.js_select_variant', function(){
            const $this = $(this);

            const tarif_item = $this.closest('.js_select_tarif_item');
            $('.js_select_tarif_item').removeClass('p_tarif_item_active');
            tarif_item.addClass('p_tarif_item_active');

            if($this.hasClass('disabled')) return false;

            let variant = $this.attr('data-variant');
            let tarif = $this.closest('.p_tarifs__var_item');

            tarif.find('.p_tarif__period_var').removeClass('active');
            tarif.find('.p_tarif__period_var[data-pvariant="'+variant+'"]').addClass('active');

            JS.checkSupport();

            return false;
        });

        $('body').on('click', '.js_select_tarif_item', function(){
            const $this = $(this);
            $('.js_select_tarif_item').removeClass('p_tarif_item_active');
            $this.addClass('p_tarif_item_active');

            JS.checkSupport();
        });
    },

    checkSupport: function (){
        const p_tarif_item_active = $('.p_tarif_item_active').attr('data-tarif');
        const f_month = $('.js_change_period.active').attr('data-period');
        let active_tarif_0 = $('.js_select_tarif_item[data-tarif="1"] .p_tarifs__var_item.active .p_tarif__period_var.active').attr('data-pvariant');

        console.log(p_tarif_item_active, f_month, active_tarif_0);

        if(p_tarif_item_active == 1 && f_month == 'monthly' && active_tarif_0 == 1){
            $('.tarif_0_y').show();
            $('.tarif_0_n').hide();
        }else{
            $('.tarif_0_y').hide();
            $('.tarif_0_n').show();
        }

        if(p_tarif_item_active == 3){
            $('.tarif_3_y').show();
            $('.tarif_3_n').hide();
        }else{
            $('.tarif_3_y').hide();
            $('.tarif_3_n').show();
        }
    },

    featuresTabs: function (){
        $('body').on('click', '.js_sfh_collapse_nav_item', function(){
            const $this = $(this);
            let id = $this.attr('href');

            $('.sfh_collapse_nav_item').removeClass('active');
            $this.addClass('active');
            $('.sfh_collapse_img_item').removeClass('show');
            $(id).addClass('show');
            id = id.replace('#', '');
            $('.sfh_collapse_img_item[data-id="'+id+'"]').addClass('show');

            return false;
        })
    },

    topBlockAnimation: () => {
        $('#a_full').addClass('a_start');

        JS.chartAnimation('.a_chart_1', 504, 504, 478, 3500, 'M322.894 @H295.277V504H322.894V478.422Z');
        JS.chartAnimation('.a_chart_11', 504, 504, 478, 3500, 'M302.772 @H295V504H302.772V478.422Z');

        setTimeout(function(){
            JS.chartAnimation('.a_chart_2', 504, 504, 456, 3500, 'M363.002 @H335.385V503.862H363.002V456.282Z');
            JS.chartAnimation('.a_chart_21', 504, 504, 456, 3500, 'M343.018 @H335.246V503.862H343.018V456.282Z');
        }, 100);

        setTimeout(function(){
            JS.chartAnimation('.a_chart_3', 504, 504, 434, 3500, 'M406.023 @H378.406V503.862H406.023V434.142Z');
            JS.chartAnimation('.a_chart_31', 504, 504, 434, 3500, 'M386.039 @H378.268V503.862H386.039V434.142Z');
        }, 100);

        setTimeout(function(){
            JS.chartAnimation('.a_chart_4', 504, 504, 412, 3500, 'M448.212 @H420.595V504H448.212V412.14Z');
            JS.chartAnimation('.a_chart_41', 504, 504, 412, 3500, 'M428.228 @H420.457V504H428.228V412.14Z');
        }, 100);

        setTimeout(function(){
            JS.chartAnimation('.a_chart_5', 504, 504, 390, 3500, 'M488.32 @H460.703V504H488.32V390Z');
            JS.chartAnimation('.a_chart_51', 504, 504, 390, 3500, 'M468.474 @H460.703V503.862H468.474V390Z');
        }, 100);

        setTimeout(function(){
            $('.a_service_3')
                .attr('transform', 'matrix(1 0 0 1 1 1)')
                .css('opacity', '1');
        }, 1500);
        setTimeout(function(){
            $('.a_service_4')
                .attr('transform', 'matrix(1 0 0 1 1 1)')
                .css('opacity', '1');
        }, 2000);
        setTimeout(function(){
            $('.a_service_1')
                .attr('transform', 'matrix(1 0 0 -1 411 163)')
                .css('opacity', '1');
        }, 2500);
        setTimeout(function(){
            $('.a_service_2')
                .attr('transform', 'matrix(1 0 0 1 283 38)')
                .css('opacity', '1');
        }, 3000);
        setTimeout(function(){
            $('.a_service_5')
                .attr('transform', 'matrix(1 0 0 1 1 1)')
                .css('opacity', '1');
        }, 3500);
        setTimeout(function(){
            $('.a_service_6')
                .attr('transform', 'matrix(1 0 0 1 1 1)')
                .css('opacity', '1');
        }, 4000);
    },

    chartAnimation: (chart, start, path, finish, time, str) => {
        const interval = time/100;
        const shift = (start - finish)/100;
        let value = path - shift;
        let d = str.replace('@', value);
        setTimeout(function(){
            if(value > finish){
                $(chart).attr('d', d);
                JS.chartAnimation(chart, start, value, finish, time, str);
            }
        }, interval)
    },

    toggleMenu: function(){
        function closeMobileMenu(obj){
            if($(window).width()*1 < 1500){
                $('.js_toggle_menu').removeClass('show');
                $('body').removeClass('body_fixed');
                $('.header_nav').hide();
            }
        }

        $('body').on('click', '.js_toggle_menu', function(){
            const $this = $(this);
            const menu = $('.header_nav');
            if($this.hasClass('show')){
                closeMobileMenu($this);
            }else{
                $this.addClass('show');
                $('body').addClass('body_fixed');
                $('.header_nav').show();
            }

            return false;
        });

        $('body').on('click', '.js_header_nav a', function(){
            const obj = $('.js_toggle_menu');
            closeMobileMenu(obj);
        });

        /*
        var header = $('.header'),
            scrollPrev = 0;

        $(window).scroll(function() {
            let scrolled = $(window).scrollTop();

            if ( scrolled > 100 && scrolled > scrollPrev ) {
                header.addClass('out');
            } else {
                header.removeClass('out');
            }
            scrollPrev = scrolled;
        });
         */
    },

    headerMenu: function(){
        $('body').on('click', '.hfm_item__has_dd > a', function(){
            const $this = $(this);
            const hfm_item = $this.closest('.hfm_item__has_dd');
            const sub_menu = hfm_item.find('.sub-menu');
            if(!hfm_item.hasClass('show')){
                $('.hfm_item__has_dd').removeClass('show');
                $('.sub-menu').slideUp(100);

                hfm_item.addClass('show');
                sub_menu.slideDown(100);
            }else{
                hfm_item.removeClass('show');
                sub_menu.slideUp(100);
            }

            return false;
        });

        $('body').on('click', function(){
            $('.hfm_item__has_dd').removeClass('show');
            $('.sub-menu').slideUp(100);
        });

        $('body').on('click', '.js_toggle_menu', function(){
            const $this = $(this);

            return false;
        });
    }


};

function initHideYears(){
    $('.pay_yearly').hide();
    $('.pay_monthly').show();
}
initHideYears()


const $watchVideo = $('#watchVideo');
const $video = $('#video');
let $videoSrc = ''
$('#watchVideoBtn').on('click', function () {
    $videoSrc = $(this).data('src')
    $video.attr('scr', $videoSrc)
});

$watchVideo.on('shown.bs.modal', function () {
    $video.attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
});
$watchVideo.on('hide.bs.modal', function () {
    $video.attr('src', $videoSrc);
});

window.fwSettings = {'widget_id': 9000000743};
!function () {
    if ('function' != typeof window.FreshworksWidget) {
        let n = function () {
            n.q.push(arguments)
        };
        n.q = [];
        window.FreshworksWidget = n;
    }
}()


$('.open-fcWidget').on('click', function (e) {
    e.preventDefault()
    FreshworksWidget('open', 'ticketForm');
});