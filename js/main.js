/*----------------SCROLLSPY----------------*/
$(document).ready(function () {
    const navbar = document.querySelector('#navbar');
    const scrollspy = new VanillaScrollspy(navbar);
    scrollspy.init();



    const navbar2 = document.querySelector('#nav-footer');
    const scrollspy2 = new VanillaScrollspy(navbar2);
    scrollspy2.init();
});
/*-----------------------------------------*/
/*------------HEDADER FIXED--------*/
$(document).ready(function() {
    var headerResize = $('#home').data('header-resize');

    if (headerResize == 1) {
        $(window).bind('scroll', toggleNavClass);
    }

    function toggleNavClass() {
        var scrollTop = $(window).scrollTop();
        var windowWidth = $(window).width();
        $('#home').toggleClass('fixed', scrollTop > 124);
    }
});

$(document).ready(function () {
    var linkDot = $('.main-menu ul li');
    var linkDotActive = $('.main-menu ul li a');

    linkDot.hover(function () {
        $(this).addClass('dot-hover');
    }, function () {
        $(this).removeClass('dot-hover');
    });

    linkDotActive.click(function () {
        $('ul li').removeClass('dot-active');
        $(this).closest('li').addClass('dot-active');
    });
});
/*--------------MENU MOBILE-------*/
$(document).ready(function() {
    var hederfixed = $('.header');
    var menu = $('.main-menu');
    var menulink = $('#nav-icon-mob');
    var blackOverlay = $('.black-overlay_menu');

    menulink.click(function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        menu.toggleClass('active');
        hederfixed.addClass('fixed');

        if (menulink.hasClass('open')){
            $('.overlay').fadeIn(600);
        } else{
            $('.overlay').fadeOut(600);
        }
    });

    blackOverlay.click(function(e){
        e.preventDefault();
        activekeypress();
        menulink.removeClass('open');
        $('.overlay').fadeOut(600);
        menu.toggleClass('active');
    });

    var navlink = $('.main-menu ul li a');
    navlink.click(function (e) {
        e.preventDefault();
        menu.removeClass('active');
        menulink.removeClass('open');
        hederfixed.removeClass('fixed');
        $('.overlay').fadeOut(600);
    });

});

function disblekeypress() {
    $("body.jj").on("keyup", function(e){
        if (e.which === 27){
            return false;
        }
    });
}
function activekeypress() {
    $("body").on("keyup", function(e){
        if (e.which === 27){
            alert("awesome");
            return true;
        }
    });
}
/*-------------------SLIDER---------------*/
$(document).ready(function(){

    var slide1= $('#slide1');
    var slide2 = $('#slide2');
    var slidesPerPage = 1;
    var syncedSecondary = true;

    slide1.owlCarousel({
        loop: true,
        items: 1,
        margin: 10,
        //stagePadding: 100,
        center:true,
        dots:true,
        //singleItem: true,
        itemsScaleUp : true,
        // smartSpeed: 500,
        // slideSpeed: 500,
        autoPlay: 5000,
        nav: true,
        responsiveClass:true,
        responsiveRefreshRate : 200,
        navText: [
            "<span class='arrow-prev'></span>",
            "<span class='arrow-next'></span>"
        ],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                //stagePadding: 110
            },
            768: {
                stagePadding: 115
            },
            992: {
                stagePadding: 110
            }
        }
    }).on('changed.owl.carousel', syncPosition);

    slide2.on('initialized.owl.carousel', function () {
            slide2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : slidesPerPage,
            margin: 50,
            center:true,
            dots: false,
            nav: false,
            autoplayHoverPause: true,
            // smartSpeed: 500,
            // slideSpeed : 5000,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 200
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }
        //end block
        slide2.find(".owl-item").removeClass("current").eq(current).addClass("current");
        var onscreen = slide2.find('.owl-item.active').length - 1;
        var start = slide2.find('.owl-item.active').first().index();
        var end = slide2.find('.owl-item.active').last().index();

        if (current > end) {
            slide2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            slide2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            slide1.data('owl.carousel').to(number, 100, true);
        }
    }

    slide2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        slide1.data('owl.carousel').to(number, 300, true);
    });

});
/*-------------------------------------*/