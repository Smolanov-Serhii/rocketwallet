if ($('section.tarif').length && $('section.rates').length) {



    var filters = [];
    $.getJSON('../../data.json', function (data) {
        $(window).resize(function() {
            if ($(window).width() >= '769'){
                if (!$('.tarif__content .tarif__table').length) {
                    $('section.tarif').find('.tarif__content').empty()
                    $('.tarif__content').append('<table class="tarif__table">\n' +
                        '            <thead>\n' +
                        '              <tr>\n' +
                        '                <th>Платежная система</th>\n' +
                        '                <th class="first-param">Комиссия на депозит</th>\n' +
                        '                <th class="second-param">Комиссия на вывод</th>\n' +
                        '              </tr>\n' +
                        '            </thead>\n' +
                        '            <tbody></tbody>\n' +
                        '          </table>')
                }

                MakeTable()}
            else   {
                MakeTableMobile()
            }

        });
        if ($(window).width() >= '769'){
            MakeTable()}
        else   {
            MakeTableMobile();
        }
        function MakeTable(){
            $('section.rates').find('.rates__table tbody').empty()
            $('section.tarif').find('.tarif__table tbody').empty()
            for (const [key, value] of Object.entries(data.EXCHANGE_RATES)) {
                var first = '-';
                var second = '-';

                var name = key;
                if (name.indexOf(' ') > 0) {
                    name = name.replace(' ', '(')+')';
                }

                if (data.DEPOSIT_FEES[key]) {
                    first = '<strong>' + data.DEPOSIT_FEES[key] + '</strong> ' + name;
                }

                if (data.WITHDRAW_FEES[key]) {
                    second = '<strong>' + data.WITHDRAW_FEES[key] + '</strong> ' + name;
                }

                $('section.tarif').find('.tarif__table tbody').append('<tr>' +
                    '<td><img src="images/icons/' + key.toLowerCase() + '.svg">' + name + '</td>' +
                    '<td>' + first + '</td>' +
                    '<td>' + second + '</td>`' +
                    '</tr>')

                for (const [keyI, valueI] of Object.entries(value)) {
                    var point = valueI.toString().replace('1e-', '');

                    $('section.rates').find('.rates__table tbody').append('<tr data-currency="' + keyI + '">' +
                        '<td><img src="images/icons/' + key.toLowerCase() + '.svg">' + key.toUpperCase() + '</td>' +
                        '<td>' + keyI + '<strong>' + Number(valueI).toFixed(point) + '</strong> </td>' +
                        '</tr>')
                    if (filters.indexOf(keyI) < 0) {
                        filters.push(keyI);
                    }
                }
            }
        }

        function MakeTableMobile(){
            $('section.tarif').find('.tarif__content').empty()
            for (const [key, value] of Object.entries(data.EXCHANGE_RATES)) {
                var firstparam = 'Комиссия на депозит';
                var secondparam = 'Комиссия на вывод';
                var first = '-';
                var second = '-';

                var name = key;
                if (name.indexOf(' ') > 0) {
                    name = name.replace(' ', '(')+')';
                }

                if (data.DEPOSIT_FEES[key]) {
                    first = '<strong>' + data.DEPOSIT_FEES[key] + '</strong> ' + name;
                }

                if (data.WITHDRAW_FEES[key]) {
                    second = '<strong>' + data.WITHDRAW_FEES[key] + '</strong> ' + name;
                }
                $('section.tarif').find('.tarif__content').append('<div class="tarif__content-item">' +
                    '<div class="tarif__content-head"><img src="images/icons/' + key.toLowerCase() + '.svg">' + name + '</div>' +
                    '<div class="tarif__content-value"><div class="tarif-fist">' + firstparam + '</div>' + first + '</div>' +
                    '<div class="tarif__content-value"><div class="tarif-fist">' + secondparam + '</div>' + second + '</div>' +
                    '</div>')

                for (const [keyI, valueI] of Object.entries(value)) {
                    var point = valueI.toString().replace('1e-', '');
                    $('section.rates').find('.rates__table tbody').append('<tr data-currency="' + keyI + '">' +
                        '<td><img src="images/icons/' + key.toLowerCase() + '.svg">' + key.toUpperCase() + '</td>' +
                        '<td><strong>' + keyI + '</strong><strong>' + Number(valueI).toFixed(point) + '</strong></td>' +
                        '</tr>')
                    if (filters.indexOf(keyI) < 0) {
                        filters.push(keyI);
                    }
                }
            }
        }


        filters.forEach((element) => {
            $('select.selectric').append('<option value="' + element + '">' + element + '</option>')
        })
    });
}

$(document).ready(function () {
    function MenuMobile(){
        if ($(window).width() > '1024') {
            if ($('.header__mobile').length) {
                $(".header__nav").appendTo($(".header__container"));
                $(".header__button").appendTo($(".header__container"));
                $(".header__language").appendTo($(".header__container"));
                $('.header__mobile').remove();
            }
        }
        else   {
            if (!$('.header__mobile').length) {
                $('.header__container').append('<div class="header__mobile"></div>');
                $(".header__nav").appendTo($(".header__mobile"));
                $(".header__button").appendTo($(".header__mobile"));
                $(".header__language").appendTo($(".header__mobile"));
            }
        }
    }

    MenuMobile()

    var time = 1,
        cc = 1;
    $(window).scroll(function () {
        $('#counter').each(function () {
            var
                cPos = $(this).offset().top,
                topWindow = $(window).scrollTop();
            viewportHeight = $(window).height();
            if ((topWindow + viewportHeight) - cPos > viewportHeight / 6) {
                if (cc < 2) {
                    $(".number").addClass("viz");
                    $('div.digit').each(function () {
                        var
                            i = 1,
                            num = $(this).data('num'),
                            step = time / num,
                            that = $(this),
                            int = setInterval(function () {
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
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100 && $menu.hasClass("default")) {
            $menu.removeClass("default").addClass("moved");
        } else if ($(this).scrollTop() <= 100 && $menu.hasClass("moved")) {
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

    if ($('.mobile-show').length) {
        $(".mobile-show").click(function () {
            $('.header_front_page >.right').toggleClass('active');
            $('body').toggleClass('lock');
            $(this).toggleClass('active');
        });
    }
    if ($('.header__language').length) {
        $(".header__language-current").click(function () {
            $('.header__language-else').fadeToggle(300);
        });
    }

    $(function () {
        $('select.selectric').selectric();
    });

    if ($('.login').length) {
        // $(".js-login").click(function () {
        //     $('.login').fadeToggle(300);
        //     $('body').toggleClass('locked');
        // });
        // $(".login__close").click(function () {
        //     $('.login').fadeToggle(300);
        //     $('body').toggleClass('locked');
        // });
        // $(document).mouseup(function (e) { // событие клика по веб-документу
        //     var div = $(".login__container"); // тут указываем ID элемента
        //     if (!div.is(e.target) // если клик был не по нашему блоку
        //         && div.has(e.target).length === 0) { // и не по его дочерним элементам
        //         $('.login').fadeOut(300);
        //         $('body').removeClass('locked');
        //     }
        // });
    }

    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    if ($('section.table').length) {
        $.getJSON('../../data.json', function (data) {
            $('section.table #table-commission').find('.table__row').each(function () {
                var cript = $(this).data('cript').toUpperCase();

                if (data.WITHDRAW_FEES[cript]) {
                    $(this).find('.table__price .digit').html(data.WITHDRAW_FEES[cript])
                }
            });

            $('section.table #table-rates').find('.table__row').each(function () {
                var cript = $(this).data('cript').toUpperCase();
                var key = $(this).find('.table__price span.cript').html().toUpperCase().trim();

                if (data.EXCHANGE_RATES[cript] && data.EXCHANGE_RATES[cript][key]) {
                    var point = data.EXCHANGE_RATES[cript][key].toString().replace('1e-', '');
                    $(this).find('.table__price .digit').html(Number(data.EXCHANGE_RATES[cript][key]).toFixed(point))
                }
            });
        });
    }

    $('select.selectric').change(function () {
        var value = $(this).val();
        if (value == 'all') {
            $('.rates__table').find('tr').show();
            $('.rates__table').removeClass('sorted');
        } else {
            $('.rates__table').addClass('sorted');
            $('.rates__table').find('tr').hide();
            $('.rates__table').find('tr[data-currency="' + value + '"]').show();
        }
    })

    $(".header__burger").click(function () {
        $(this).toggleClass('active');
        $('body').toggleClass('locked');
        $('.header__mobile').fadeToggle(300);
    });

    $(window).resize(function() {
        MenuMobile();
    });

    var ticking

    let wh = window.innerHeight
    let n = 0
    let el_t
    let scroll_pos = 100;
    $( ".btn-burger" ).click(function() {
        $('#collapseExample').fadeToggle(300);
        $('body').toggleClass('locked');

    });

    function doSomething(scroll_pos) {
        //$('body').css('transform', 'translateY(-' + scroll_pos / 20 + '%)')
        // console.log('scroll')

        $('.motion').each( function (e) {
            if ( $(window).width() > 768 ) {
                var scrollParam = 300;
            } else {
                var scrollParam = 300;
            }
            if ( $(this).offset().top + $(this).height() > ( scroll_pos + wh - scrollParam ) && $(this).offset().top  < ( scroll_pos + wh - scrollParam ) ) {

                $(this).addClass('show')

            }

        })

    }

    window.addEventListener('scroll', function(e) {

        let last_known_scroll_position = window.scrollY

        if (!ticking) {
            window.requestAnimationFrame( function() {
                doSomething(last_known_scroll_position)
                ticking = false
            });

            ticking = true
        }
    })

    let bg = document.querySelectorAll('.mouse-parallax-img');
    for (let i = 0; i < bg.length; i++){
        window.addEventListener('mousemove', function(e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            bg[i].style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
        });
    }
});




