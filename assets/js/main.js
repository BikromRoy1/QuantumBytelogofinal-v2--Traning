(function ($) {
  'use strict';

  /*--------------------------------------------------------------
    RegisterPlugin, ScrollTrigger, SplitText
  --------------------------------------------------------------*/
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.config({
    nullTargetWarn: false,
    trialWarn: false,
  });

  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split('/').reverse()[0];

    selector.find('li').each(function () {
      let anchor = $(this).find('a');
      if ($(anchor).attr('href') == FileName) {
        $(this).addClass('current');
      }
    });
    // if any li has .current elmnt add class
    selector.children('li').each(function () {
      if ($(this).find('.current').length) {
        $(this).addClass('current');
      }
    });
    // if no file name return
    if ('' == FileName) {
      selector.find('li').eq(0).addClass('current');
    }
  }

  if ($('.main-menu__list').length) {
    // dynamic current class
    let mainNavUL = $('.main-menu__list');
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($('.main-menu__list').length && $('.mobile-nav__container').length) {
    let navContent = document.querySelector('.main-menu__list').outerHTML;
    let mobileNavContainer = document.querySelector('.mobile-nav__container');
    mobileNavContainer.innerHTML = navContent;
  }
  if ($('.sticky-header__content').length) {
    let navContent = document.querySelector('.main-menu').innerHTML;
    let mobileNavContainer = document.querySelector('.sticky-header__content');
    mobileNavContainer.innerHTML = navContent;
  }

  if ($('.mobile-nav__container .main-menu__list').length) {
    let dropdownAnchor = $(
      '.mobile-nav__container .main-menu__list .dropdown > a'
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement('BUTTON');
      toggleBtn.setAttribute('aria-label', 'dropdown toggler');
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find('button').on('click', function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass('expanded');
        self.parent().toggleClass('expanded');
        self.parent().parent().children('ul').slideToggle();
      });
    });
  }

  if ($('.mobile-nav__toggler').length) {
    $('.mobile-nav__toggler').on('click', function (e) {
      e.preventDefault();
      $('.mobile-nav__wrapper').toggleClass('expanded');
      $('body').toggleClass('locked');
    });
  }

  if ($('.search-toggler').length) {
    $('.search-toggler').on('click', function (e) {
      e.preventDefault();
      $('.search-popup').toggleClass('active');
      $('.mobile-nav__wrapper').removeClass('expanded');
      $('body').toggleClass('locked');
    });
  }

  if ($('.odometer').length) {
    var odo = $('.odometer');
    odo.each(function () {
      $(this).appear(function () {
        var countNumber = $(this).attr('data-count');
        $(this).html(countNumber);
      });
    });
  }

  if ($('.dynamic-year').length) {
    let date = new Date();
    $('.dynamic-year').html(date.getFullYear());
  }

  if ($('.wow').length) {
    var wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($('.tabs-box').length) {
    $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
      e.preventDefault();
      var target = $($(this).attr('data-tab'));

      if ($(target).is(':visible')) {
        return false;
      } else {
        target
          .parents('.tabs-box')
          .find('.tab-buttons')
          .find('.tab-btn')
          .removeClass('active-btn');
        $(this).addClass('active-btn');
        target
          .parents('.tabs-box')
          .find('.tabs-content')
          .find('.tab')
          .fadeOut(0);
        target
          .parents('.tabs-box')
          .find('.tabs-content')
          .find('.tab')
          .removeClass('active-tab');
        $(target).fadeIn(300);
        $(target).addClass('active-tab');
      }
    });
  }

  // ===Portfolio===
  function projectMasonaryLayout() {
    if ($('.masonary-layout').length) {
      $('.masonary-layout').isotope({
        layoutMode: 'masonry',
      });
    }
    if ($('.post-filter').length) {
      $('.post-filter li')
        .children('.filter-text')
        .on('click', function () {
          var Self = $(this);
          var selector = Self.parent().attr('data-filter');
          $('.post-filter li').removeClass('active');
          Self.parent().addClass('active');
          $('.filter-layout').isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: 'linear',
              queue: false,
            },
          });
          return false;
        });
    }

    if ($('.post-filter.has-dynamic-filters-counter').length) {
      // var allItem = $('.single-filter-item').length;
      var activeFilterItem = $('.post-filter.has-dynamic-filters-counter').find(
        'li'
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data('filter');
        var count = $('.filter-layout').find(filterElement).length;
        $(this)
          .children('.filter-text')
          .append('<span class="count">' + count + '</span>');
      });
    }
  }

  if ($('.circle-progress').length) {
    $('.circle-progress').appear(function () {
      let circleProgress = $('.circle-progress');
      circleProgress.each(function () {
        let progress = $(this);
        let progressOptions = progress.data('options');
        progress.circleProgress(progressOptions);
      });
    });
  }

  function SmoothMenuScroll() {
    var anchor = $('.scrollToLink');
    if (anchor.length) {
      anchor.children('a').bind('click', function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = '90';
        } else {
          var headerH = '90';
        }
        var target = $(this);
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: $(target.attr('href')).offset().top - headerH + 'px',
            },
            1200,
            'easeInOutExpo'
          );
        anchor.removeClass('current');
        anchor.removeClass('current-menu-ancestor');
        anchor.removeClass('current_page_item');
        anchor.removeClass('current-menu-parent');
        target.parent().addClass('current');
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $('.one-page-scroll-menu .scrollToLink').children('a');
      menuAnchor.each(function () {
        var sections = $(this).attr('href');
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            var Sectionid = $(sections).attr('id');
            $('.one-page-scroll-menu').find('li').removeClass('current');
            $('.one-page-scroll-menu')
              .find('li')
              .removeClass('current-menu-ancestor');
            $('.one-page-scroll-menu')
              .find('li')
              .removeClass('current_page_item');
            $('.one-page-scroll-menu')
              .find('li')
              .removeClass('current-menu-parent');
            $('.one-page-scroll-menu')
              .find('a[href*=\\#' + Sectionid + ']')
              .parent()
              .addClass('current');
          }
        });
      });
    } else {
      $('.one-page-scroll-menu li.current').removeClass('current');
      $('.one-page-scroll-menu li:first').addClass('current');
    }
  }

  /*-- Handle Scrollbar --*/
  function handleScrollbar() {
    const bodyHeight = $('body').height();
    const scrollPos = $(window).innerHeight() + $(window).scrollTop();
    let percentage = (scrollPos / bodyHeight) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    $('.scroll-to-top .scroll-to-top__inner').css('width', percentage + '%');
  }

  // Animation gsap
  function title_animation() {
    var tg_var = jQuery('.sec-title-animation');
    if (!tg_var.length) {
      return;
    }
    const quotes = document.querySelectorAll(
      '.sec-title-animation .title-animation'
    );

    quotes.forEach((quote) => {
      //Reset if needed
      if (quote.animation) {
        quote.animation.progress(1).kill();
        quote.split.revert();
      }

      var getclass = quote.closest('.sec-title-animation').className;
      var animation = getclass.split('animation-');
      if (animation[1] == 'style4') return;

      quote.split = new SplitText(quote, {
        type: 'lines,words,chars',
        linesClass: 'split-line',
      });
      gsap.set(quote, {
        perspective: 400,
      });

      if (animation[1] == 'style1') {
        gsap.set(quote.split.chars, {
          opacity: 0,
          y: '90%',
          rotateX: '-40deg',
        });
      }
      if (animation[1] == 'style2') {
        gsap.set(quote.split.chars, {
          opacity: 0,
          x: '50',
        });
      }
      if (animation[1] == 'style3') {
        gsap.set(quote.split.chars, {
          opacity: 0,
        });
      }
      quote.animation = gsap.to(quote.split.chars, {
        scrollTrigger: {
          trigger: quote,
          start: 'top 90%',
        },
        x: '0',
        y: '0',
        rotateX: '0',
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: 0.02,
      });
    });
  }
  ScrollTrigger.addEventListener('refresh', title_animation);

  // window load event
  $(window).on('load', function () {
    if ($('.preloader').length) {
      $('.preloader').fadeOut();
    }

    projectMasonaryLayout();
    fullHeight();
    title_animation();

    if ($('.post-filter').length) {
      var postFilterList = $('.post-filter li');
      // for first init
      $('.filter-layout').isotope({
        filter: '.filter-item',
        animationOptions: {
          duration: 500,
          easing: 'linear',
          queue: false,
        },
      });
      // on click filter links
      postFilterList.on('click', function () {
        var Self = $(this);
        var selector = Self.attr('data-filter');
        postFilterList.removeClass('active');
        Self.addClass('active');

        $('.filter-layout').isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: 'linear',
            queue: false,
          },
        });
        return false;
      });
    }

    if ($('.post-filter.has-dynamic-filter-counter').length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $('.post-filter.has-dynamic-filter-counter').find(
        'li'
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data('filter');
        var count = $('.filter-layout').find(filterElement).length;
        $(this).append('<sup>[' + count + ']</sup>');
      });
    }
  });

  

  // window scroll event

  $(window).on('scroll', function () {
    if ($('.stricked-menu').length) {
      var headerScrollPos = 130;
      var stricky = $('.stricked-menu');
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass('stricky-fixed');
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass('stricky-fixed');
      }
    }

    OnePageMenuScroll();
  });

  $(window).on('scroll', function () {
    handleScrollbar();
    if ($('.sticky-header--one-page').length) {
      var headerScrollPos = 130;
      var stricky = $('.sticky-header--one-page');
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass('active');
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass('active');
      }
    }

    var scrollToTopBtn = '.scroll-to-top';
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass('show');
      } else {
        $(scrollToTopBtn).removeClass('show');
      }
    }
  });

  $('select:not(.ignore)').niceSelect();


})(jQuery);
