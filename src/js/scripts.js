$( document ).ready(function() {
    var time = 1,
        cc = 1;
    $(window).scroll(function() {
        $('#counter').each(function() {
            var
                cPos = $(this).offset().top,
                topWindow = $(window).scrollTop();
            viewportHeight = $(window).height();
            if ((topWindow + viewportHeight) - cPos > viewportHeight / 6) {
                if (cc < 2) {
                    $(".number").addClass("viz");
                    $('div.digit').each(function() {
                        var
                            i = 1,
                            num = $(this).data('num'),
                            step = time / num,
                            that = $(this),
                            int = setInterval(function() {
                                if (i <= num) {
                                    that.html(i + "");
                                } else {
                                    cc = cc + 2;
                                    clearInterval(int);
                                }
                                i++;
                            }, step);
                    });
                }
            }
        });
    });
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

    $(function() {
        $('select.selectric').selectric();
    });

    if($('.login').length){
        $(".js-login").click(function() {
            $('.login').fadeToggle(300);
            $('body').toggleClass('locked');
        });
        $(".login__close").click(function() {
            $('.login').fadeToggle(300);
            $('body').toggleClass('locked');
        });
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(".login__container"); // тут указываем ID элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0) { // и не по его дочерним элементам
                $('.login').fadeOut(300);
                $('body').removeClass('locked');
            }
        });
    }
});




