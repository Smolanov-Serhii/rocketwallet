$( document ).ready(function() {

    var $menu = $(".header");
    $(window).scroll(function(){
        if ( $(this).scrollTop() > 100 && $menu.hasClass("default") ){
            $menu.removeClass("default").addClass("moved");
        } else if($(this).scrollTop() <= 100 && $menu.hasClass("moved")) {
            $menu.removeClass("moved").addClass("default");
        }
    });

    const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
    // const loadMapBlock = document.querySelector('.__load-map');
    const windowHeight = document.documentElement.clientHeight;
    let lazyImagePosition = [];
    if (lazyImages.length > 0) {
        lazyImages.forEach(img => {
            if (img.dataset.src || img.dataset.srcset) {
                lazyImagePosition.push(img.getBoundingClientRect().top + pageYOffset);
                lazyScrollCheck();
            }
        })
    }

    window.addEventListener("scroll", lazyScroll);

    function lazyScroll() {
        if (document.querySelectorAll('img[data-src],source[data-srcset]').length > 0) {
            lazyScrollCheck();
        }
    }

    function lazyScrollCheck() {
        let imgIndex = lazyImagePosition.findIndex(
            item => pageYOffset > item - windowHeight
        );
        if (imgIndex >= 0) {
            if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
                lazyImages[imgIndex].removeAttribute('data-src');
            } else if (lazyImages[imgIndex].dataset.srcset) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.srcset;
                lazyImages[imgIndex].removeAttribute('data-srcset');
            }
            delete lazyImagePosition[imgIndex];
        }
    }

    lazyScrollCheck();

    AOS.init();

    if($('.mobile-show').length){
        $(".mobile-show").click(function() {
            $('.header_front_page >.right').toggleClass('active');
            $('body').toggleClass('lock');
            $(this).toggleClass('active');
        });
    }
    if($('.header__language').length){
        $(".header__language-current").click(function() {
            $('.header__language-else').fadeToggle(300);
        });
    }
});




