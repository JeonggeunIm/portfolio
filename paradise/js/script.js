'use strict';

$(document).ready(function() {
  $(document).on('click', 'a[href="#"]',function(e) {
    e.preventDefault();
  });
  
  stepSlide({'selector': $('.index #main-visual'),});
  infiniteMvSlide({'selector': $('.index #sub-visual'),});
  checkHeader();
  
  $(window).trigger('scroll');
  
  $('#gnb .main-list>li').on('mouseenter focusin',function(){
    var $depth2 = $(this).find('.depth2');
    var depth2Height = $depth2.innerHeight()+70;
    var $mainList = $('#gnb .main-list');

    depth2Height = depth2Height.toString() + 'px';

    $('#gnb .main-list>li').find('.depth2').css({display: 'none'});
    $mainList.addClass('on');
    $mainList.css({height: depth2Height});
    $(this).children('a').css({color: '#AB8D67'});
    $(this).find('.depth2').css({display: 'block', top: '70px',opacity: '1'});
    $('#header').addClass('on');
  });
  
  $('#gnb .main-list>li').on('focusout', function() {
    $(this).children('a').css({color: '#fff'});
  });
  
  $('#gnb .main-list>li').on('mouseleave',function(){
    var $mainList = $('#gnb .main-list');

    $mainList.removeClass('on');
    $mainList.css({height: '70px'});
    $(this).children('a').css({color: '#fff'});
    $(this).find('.depth2').css({display: 'none', top: '60px', opacity: '0'});
    $('#header').removeClass('on');
  });
  
  $('#top-menu .lang a').on('focus', function() {
    var $mainList = $('#gnb .main-list');
    
    $mainList.removeClass('on');
    $mainList.css({height: '70px'});
    $('#gnb .main-list>li .depth2').css({display: 'none', top: '60px', opacity: '0'});
    $('#header').removeClass('on');
  });
  
  $('#top-menu .menu').on('click',function(){
    $('#cite-map').toggleClass('on');
    if ($('#cite-map').hasClass('on')) {
      $('#cite-map').css({'display': 'block'}).stop(true).animate({'top': 0});
    } else {
      $('#cite-map').animate({'top': '-100vh'}, 400, function(){
        $('#cite-map').css({'display': 'none'})
      });
    }
  });

  $('#btn').on('click',function(){
    var $container = $('#container');
    var $btn = $('#btn');
    if($container.hasClass('on')){
      $container.removeClass('on');
      $container.find('.background>li span').removeClass('on');
      $('#btn>a>img').attr({src:'img/index/sns-txt.png',alt:'Paradise Now'});
    }else{
      $('#gnb .main-list').removeClass('on');
      $container.addClass('on');
      $container.find('.background>li span').addClass('on');
      $('#btn>a>img').attr({src:'img/index/sns-txt2.png',alt:'Home'});
    }
  });
  
  $('#btn').on('mouseenter',function(){
    $('#sub-slide').stop().animate({left: 'calc(100% - 80px)'});
  });
  
  $('#sns-header .select-box>a').on('click', function() {
    $('#sns-header .select-box .select-option').toggleClass('on');
    $(this).toggleClass('on');
  });
  
  $('#sns-header .select-box>a').on('focus', function() {
    $('#sns-header .select-box .select-option').addClass('on');
    $(this).addClass('on');
  });
  
  $('#sns-wrap .contents .hash>a').on('focus', function() {
    $('#sns-header .select-box .select-option').removeClass('on');
    $(this).removeClass('on');
  });
  
  
  $(window).on('scroll', function() {
    checkHeader();
  });
  
  
  function checkHeader() {
    var scrollAmt = $(document).scrollTop();
    
    if (scrollAmt > 0) {
      $('#sns-header').addClass('on');
    } else {
      $('#sns-header').removeClass('on');
    }
  }
  function infiniteMvSlide(setting) {
    var set = $.extend({
      'selector': $('body'),
      'numSlide': 0,
      'timerId': '',
      'timerSpeed': 5000,
      'isTimerOn': true,
      'slideNow': 0,
      'slidePrev': 0,
      'slideNext': 0,
      'slideFirst': 1,
      'isLastPrev': false,
      'isLastNext': false,
      'isAnimationOn': false,
      'isIndicator': true,
    }, setting);
    set.numSlide = set.selector.find('ul.slide-wrap li').length;
    
    set.selector.find('ul.slide-wrap li').each(function(i) {
      $(this).css({'left': (i * 100) + '%'});

      if (set.isIndicator === true) {
        set.selector.find('.indicator').prepend('<a href="#" class="indi"><span class="blind">' + (i + 1) + '번 슬라이드</span></a>\n');
      }
    });
    set.selector.find('.indicator').append('<a href="#" class="play">\n<i class="fas fa-pause"><span class="blind">슬라이드 정지</span></i>\n<i class="fas fa-play"><span class="blind">슬라이드 재생</span></i>\n</a>');
    
    if (set.isTimerOn === true) {
        set.selector.find('a.play').addClass('on');
    } else {
        set.selector.find('a.play').removeClass('on');
    }
    
    showSlide(set.slideFirst);
    
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      set.isLastPrev = false;
      set.isLastNext = false;
      
      showSlide(index + 1);
    });
    
    set.selector.find('a.play').on('click', function() {
        if (set.isTimerOn === true) {
            clearTimeout(set.timerId);
            $(this).removeClass('on');
            set.isTimerOn = false;
        } else {
            set.timerId = setTimeout(function() {showSlide(set.slideNext);}, set.timerSpeed);
            $(this).addClass('on');
            set.isTimerOn = true;
        }
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      set.isLastNext = false;

      if (set.slideNow <= 1) {set.isLastPrev = true}
      
      showSlide(set.slidePrev);
    });
    
    set.selector.find('p.control a.next').on('click', function() {
      set.isLastPrev = false;
      
      if (set.slideNow >= set.numSlide) {set.isLastNext = true;}

      showSlide(set.slideNext);
    });
    
    
    $('#btn').on('click',function(){
      var $container = $('#container');
      var $btn = $('#btn');
      if($container.hasClass('on')){
        if (set.isTimerOn === true) {clearTimeout(set.timerId);}
      }else{
        if (set.isTimerOn === true) {
          set.timerId = setTimeout(function() {
            if (set.slideNow === set.numSlide){
              set.isLastNext = true;
            } else {
              set.isLastNext = false;
            }
            showSlide(set.slideNext);
          }, set.timerSpeed); 
        }
      }
    });
    
    /*슬라이드 보여주는 함수*/
    function showSlide(n) {
      clearTimeout(set.timerId);
      if (set.isAnimationOn === true) {return false;}
      
      set.isAnimationOn = true;
      if (set.slideNow === 0) {
        /*맨 처음 로딩됐을 때 ul위치 세팅*/
        set.selector.find('ul.slide-wrap').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        set.isAnimationOn = false;
      } 
      else if (set.isLastPrev === true) {
        /*처음 슬라이드에서 prev 클릭했을 때*/
        var $listClone = set.selector.find('ul.slide-wrap li').clone().addClass('prevClone'); 
        
        $listClone.prependTo(set.selector.find('ul.slide-wrap'));
        
        $listClone.each(function(i) {
          $(this).css({'left': -((set.numSlide - i) * 100) + '%'});
        });
        
        set.slideNow = set.numSlide;
        set.slidePrev = set.numSlide - 1;
        
        resetList({
          'resetClass': 'prevClone',
          'ulBeforeReset': 100 + '%',
          'resetUl': -((set.numSlide - 1) * 100) + '%',
        });
        
        set.isLastPrev = false;
        
//        return false;
      } 
      else if (set.isLastNext === true) {
        /*마지막 슬라이드에서 next 클릭했을 때*/
        var $listClone = set.selector.find('ul.slide-wrap li').clone().addClass('nextClone'); 
      
        $listClone.appendTo(set.selector.find('ul.slide-wrap'));

        $listClone.each(function(i) {
          $(this).css({'left': ((set.numSlide + i) * 100) + '%'});
        });
        
        set.slideNow = 1;
        set.slideNext = set.slideNow + 1;
        
        resetList({
          'resetClass': 'nextClone',
          'ulBeforeReset': -(set.numSlide * 100) + '%',
          'resetUl': 0,
        });
        
        set.isLastNext = false;
        
//        return false;
      }
      else {
        /*처음과 마지막을 제외한 위치에서 이동할 때*/
        set.selector.find('ul.slide-wrap').css({'transition': 'left 0.4s', 'left': -((n - 1) * 100) + '%'}).one('transitionend', function() {
          set.isAnimationOn = false;
        });
      }
      showIndicator(n);
      
      if (set.isTimerOn === true) {
        if (set.slideNow === 0) {
          clearTimeout(set.timerId);
        } else {
          set.timerId = setTimeout(function() {
            if (set.slideNow === set.numSlide){
              set.isLastNext = true;
            } else {
              set.isLastNext = false;
            }
            showSlide(set.slideNext);
          }, set.timerSpeed); 
        }
      }
      
      set.slideNow = n;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
    }
    
    /*인디케이터 표시 함수*/
    function showIndicator(n) {
      set.selector.find('.indicator>.indi').removeClass('on');
      set.selector.find('.indicator>.indi').eq(n - 1).addClass('on');
    }
    
    /*맨 앞, 맨 끝에서 이전, 다음 이동했을 때 리셋해주는 함수*/
    function resetList(setting){
      var listSet = $.extend({
        'resetClass': '',
        'ulBeforeReset': 0,
        'resetUl': 0,
      }, setting);
      set.selector.find('ul.slide-wrap').css({'transition': 'left .4s', 'left': listSet.ulBeforeReset}).one('transitionend', function() {
        set.selector.find('ul.slide-wrap li').not('.' + listSet.resetClass).remove();
        set.selector.find('ul.slide-wrap li').removeClass(listSet.resetClass);
        set.selector.find('ul.slide-wrap li').each(function(i) {
          $(this).css({'left': (i * 100) + '%', 'transition': 'none'});
        });
        set.selector.find('ul.slide-wrap').css({'left': listSet.resetUl, 'transition': 'none'});
        set.isAnimationOn = false;
      });

      showIndicator(set.slideNow);
    }
  } 
  function stepSlide(setting) {
    var set = $.extend({
      'selector': $('body'),
      'numSlide': 0,
      'timerId': '',
      'timerSpeed': 8000,
      'isTimerOn': true,
      'slideNow': 0,
      'slidePrev': 0,
      'slideNext': 0,
      'onAnimation': false,
    }, setting);
    var zUp = 20;
    var zDown = 0;
    
    set.numSlide = set.selector.find('.slide-wrap>li').length;
    
    for (var i = 0; i < 7; i++) {
      set.selector.find('.background').append('<li><span></span></li>');
      set.selector.find('.black').append('<li><span></span></li>');
    }
    
    showSlide(set.slideNow + 1);
    
    $('#btn').on('click', function() {
      if ($('#container').hasClass('on') === false) {
        clearTimeout(set.timerId);
        set.selector.find('.pro-bar').css({'animation': 'none'});
      } else if ($('#container').hasClass('on') === true) {
        set.selector.find('.pro-bar').css({'animation': 'indi-animation 9.2s linear infinite'});
        if (set.onAnimation === true) {return false;}
        set.onAnimation = true;
        setTimeout(function() {
          set.onAnimation = false;
        }, 3000);
        stepEffect();
        sloganOff();
        setTimeout(function() {
          showSlide(set.slideNext);
        }, 1200);
      }
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      if (set.onAnimation === true) {return false;}
      set.onAnimation = true;
      setTimeout(function() {
        set.onAnimation = false;
      }, 3000);
      
      set.selector.find('.pro-bar').css({'animation': 'none'});
      
      clearTimeout(set.timerId);
      
      stepEffect();
      sloganOff();
      setTimeout(function() {
        set.selector.find('.pro-bar').css({'animation': 'indi-animation 9.2s linear infinite'});
        showSlide(set.slidePrev);
      }, 1200);
    });
    
    set.selector.find('p.control a.next').on('click', function() {
      if (set.onAnimation === true) {return false;}
      set.onAnimation = true;
      setTimeout(function() {
        set.onAnimation = false;
      }, 3000);
      
      set.selector.find('.pro-bar').css({'animation': 'none'});
      
      clearTimeout(set.timerId);
      
      stepEffect();
      sloganOff();
      setTimeout(function() {
        set.selector.find('.pro-bar').css({'animation': 'indi-animation 9.2s linear infinite'});
        showSlide(set.slideNext);
      }, 1200);
    });
    
    function sloganOff() {
      set.selector.find('.content-wrap>li').eq(set.slideNow - 1).stop(true).animate({'opacity': 0}, 800, function() {
       set.selector.find('.content-wrap>li').eq(set.slidePrev - 1).removeClass('on');
      });
    }
    function sloganEffect() {
      setTimeout(function() {
        set.selector.find('.content-wrap>li').eq(set.slideNow - 1).find('.slogan>p>span').addClass('on');
        set.selector.find('.content-wrap>li').eq(set.slideNow - 1).find('.slogan>em').addClass('on');
        set.selector.find('.content-wrap>li').eq(set.slideNow - 1).find('.slogan>.desc').addClass('on');
        set.selector.find('.content-wrap>li').eq(set.slideNow - 1).find('.visual-nav>ul').addClass('on');
      }, 800);
    }
    function sloganEffectOff() {
      set.selector.find('.content-wrap>li .slogan>p>span').removeClass('on');
      set.selector.find('.content-wrap>li .slogan>em').removeClass('on');
      set.selector.find('.content-wrap>li .slogan>.desc').removeClass('on');
      set.selector.find('.visual-nav>ul').removeClass('on');
    }
    function stepEffect() {
      set.selector.find('.slide-wrap>li').eq(set.slideNow - 1).find('.black>li>span').each(function(i) {
        setTimeout(function() {
          set.selector.find('.slide-wrap>li').eq(set.slideNow - 1).find('.black>li>span').eq(i).addClass('on');

          set.selector.find('.slide-wrap>li').eq(set.slideNow - 1).find('.background>li>span').eq(i).addClass('on');
        }, i * 150);
      });
    }
    function showSlide(n) {
      clearTimeout(set.timerId);
      
      sloganEffectOff();
      
      if (set.slideNow <= 0) {
        set.selector.find('.slide-wrap>li').removeClass('on');
        set.selector.find('.content-wrap>li').removeClass('on');
        
        set.selector.find('.slide-wrap>li').eq(n - 1).addClass('on');
        set.selector.find('.content-wrap>li').eq(n - 1).addClass('on');

        set.selector.find('.slide-wrap>li .background>li').removeClass('fill');
        set.selector.find('.slide-wrap>li').eq(n - 1).find(' .background>li').addClass('fill');
        
        set.selector.find('.slide-wrap').addClass('on');
        set.selector.find('.content-wrap>li').eq(n - 1).addClass('on').stop(true).animate({'opacity': 1,}, 800);
      } else {
        set.selector.find('.slide-wrap>li').eq(set.slideNow - 1).find('.background>li').css({'z-index': zDown});
        set.selector.find('.slide-wrap>li').eq(n - 1).find('.background>li').css({'z-index': zUp});
        
        set.selector.find('.slide-wrap>li').eq(set.slideNow - 1).find('.black').css({'z-index': zUp - 10});
        set.selector.find('.slide-wrap>li').eq(n - 1).find('.black').css({'z-index': zUp + 10});
        
        set.selector.find('.slide-wrap>li').eq(n - 1).addClass('on');
        
        setTimeout(function() {
          set.selector.find('.slide-wrap>li').eq(n - 1).find('.background>li').addClass('fill');
          set.selector.find('.content-wrap>li').eq(n - 1).addClass('on').stop(true).animate({'opacity': 1,},800, function() {
            set.selector.find('.content-wrap>li').eq(set.slidePrev - 1).removeClass('on');
            set.selector.find('.content-wrap>li').eq(n - 1).addClass('on').stop(true).animate({'opacity': 1,}, 400, function() {
              sloganEffect();
            });
            
          });
          
          setTimeout(function() {   
            set.selector.find('.black>li>span').removeClass('on');
            set.selector.find('.slide-wrap>li').eq(set.slidePrev - 1).find('.background>li span').removeClass('on');
            set.selector.find('.slide-wrap>li').eq(set.slidePrev - 1).find('.background>li').removeClass('fill');
            set.selector.find('.slide-wrap>li').eq(set.slidePrev - 1).removeClass('on');
            set.selector.find('.slide-wrap>li').eq(set.slideNext - 1).find('.background>li span').removeClass('on');
            set.selector.find('.slide-wrap>li').eq(set.slideNext - 1).find('.background>li').removeClass('fill');
            set.selector.find('.slide-wrap>li').eq(set.slideNext - 1).removeClass('on');
          }, 1000);
        }, 100);
      }
      
      set.slideNow = n;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
      if (set.isTimerOn === true) {
        set.timerId = setTimeout(function() {
          if (set.onAnimation === true) {return false;}
        set.onAnimation = true;

        setTimeout(function() {
          set.onAnimation = false;
        }, 3000);
        
        stepEffect();
        sloganOff();
        setTimeout(function() {
          showSlide(set.slideNext);
        }, 1200);
        }, set.timerSpeed);
      }
      
      $('.index #main-visual .indicator .slide-num').text(set.slideNow);
      
      sloganEffect();
      
    }
  }
});