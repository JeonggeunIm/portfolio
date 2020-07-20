'use strict';

$(document).ready(function() {
  $(document).on('click', 'a[href="#"]',function(e) {
    e.preventDefault();
  });
  
  checkHeader();
  fadeSlide({'selector': $('#main-visual')});
  infiniteMvSlide({'selector': $('#fruit'), 'isTimerOn': false,});
  infinite3ViewMvSlide({'selector': $('#value'), 'isTimerOn': false,'isIndicator': false});
  visualEffect($('#visual-text'));
  
  
  $(window).on('scroll', function() {
    checkHeader();
  });
 
  
  $('#quick-menu ul>li>a').on('mouseenter', function() {
    if ($(this).parent().index() !== 0) {$(this).addClass('on');}
  });
  
  $('#quick-menu ul>li>a').on('mouseleave', function() {
    $(this).removeClass('on');
  });
  
  $('.products, #main-visual').on('mouseenter', function() {
    $(this).addClass('arrow');
  });
  
  $('.products, #main-visual').on('mouseleave', function() {
    $(this).removeClass('arrow');
  });
  
  $('#top-btn').on('click', function() {
    $('html, body').animate({scrollTop: 0},300);
  });
  

 
  function visualEffect(selector) {
  
    letterEffect(selector.find('>strong'));
    setTimeout(function() {
     letterEffect(selector.find('>h2'));
    }, 800);
    setTimeout(function() {
     selector.find('>.desc').addClass('on');
    }, 2500);
    setTimeout(function() {
     selector.find('>img').addClass('on');
    }, 2500);
    
    function letterEffect(selector) {
      selector.addClass('on');
      selector.find('span').each(function(i) {
        setTimeout(function() {
          selector.find('span').eq(i).addClass('on');
        }, i * 100);
      });
    }
  }
  function checkHeader() {
    var scrollAmt = $(document).scrollTop();
    
    if (scrollAmt > 100) {
      $('header').addClass('on');
      $('#top-btn').addClass('on').stop(true).animate({'opacity': .8}, 600);
    } else {
      $('header').removeClass('on');
      $('#top-btn').removeClass('on');
    }
  }
  function infinite3ViewMvSlide(setting) {
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
      'aniTimerId': '',
      'fTimerId': '',
      'menuClicked': false,
    }, setting);
    
    set.numSlide = set.selector.find('.slide li').length;
    var afterImg = set.selector.find('.slide li').eq(set.numSlide - 1).find('figure').html();
    var beforeImg = set.selector.find('.slide li').eq(0).find('figure').html();
    
    set.selector.find('ul.slide li').each(function(i) {
      $(this).css({'left': (i * 100) + '%'});

      if (set.isIndicator === true) {
        set.selector.find('.indicator').append('<a href="#" class="indi"><span class="blind">' + (i + 1) + '번 슬라이드</span></a>\n');
      }
    });
    
    /*더미 세팅*/
//    set.selector.find('ul.dummy li.before figure').html(afterImg);
//    set.selector.find('ul.dummy li.after figure').html(beforeImg);
    
    showSlide(set.slideFirst);
    
    
    set.selector.find('.menu li>a').on('mouseenter', function() {
      $(this).addClass('on');
    });

    set.selector.find('.menu li>a').on('mouseleave', function() {
      var index = $(this).parent().index();
      
      if (index === (set.slideNow - 1)) {return false;}
      $(this).removeClass('on');
    });
    
    set.selector.find('.menu li>a').on('click', function() {
      var index = $(this).parent().index();
      set.isLastPrev = false;
      set.isLastNext = false;
      set.menuClicked = true;
      
      showSlide(index + 1);
    });
    
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      set.isLastPrev = false;
      set.isLastNext = false;
      
      showSlide(index + 1);
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      set.isLastNext = false;
      if (set.slideNow <= 1) {
        set.isLastPrev = true;
      }
      showSlide(set.slidePrev);
    });
    
    set.selector.find('p.control a.next').on('click', function() {
      set.isLastPrev = false;
      if (set.slideNow >= set.numSlide) {
        set.isLastNext = true;
      }
      showSlide(set.slideNext);
    });
    
     
    /*슬라이드 보여주는 함수*/
    function showSlide(n) {
      clearTimeout(set.timerId);
      
      if (set.slideNow === n || set.isAnimationOn === true) {return false;}
      
      set.isAnimationOn = true;
      
      if (!set.menuClicked) {
        set.aniTimerId = setTimeout(function() {
          set.isAnimationOn = false;
        }, 1100);
      } else {
        /*탭 메뉴 클릭시에는 애니메이션 막지 않도록(사용성)*/
        set.isAnimationOn = false;
        set.menuClicked = false;
      }
      
      set.selector.find('.slide>li>figure').removeClass('on');
      set.selector.find('ul.slide li>figure>img').removeClass('on');
      set.selector.find('.slide>li .text-area').removeClass('on');
//      set.selector.find('ul.dummy li figure').removeClass('on');
      
      if (set.slideNow === 0) {
        /*맨 처음 로딩됐을 때 ul위치 세팅*/
        set.selector.find('ul.slide').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        set.selector.find('.slide>li>figure').addClass('on');
//        set.selector.find('ul.dummy li figure').addClass('on');
        
        set.isAnimationOn = false;
      } 
      else if (set.isLastPrev === true) {
        /*처음 슬라이드에서 prev 클릭했을 때*/
        set.isLastPrev = false;
        
        var $listClone = set.selector.find('ul.slide li').clone().addClass('prevClone'); 
                
        $listClone.prependTo(set.selector.find('ul.slide'));
        
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
        
        
        return false;
      } 
      else if (set.isLastNext === true) {
        /*마지막 슬라이드에서 next 클릭했을 때*/
        set.isLastNext = false;
        
        var $listClone = set.selector.find('ul.slide li').clone().addClass('nextClone'); 
      
        $listClone.appendTo(set.selector.find('ul.slide'));

        $listClone.each(function(i) {
          $(this).css({'left': ((set.numSlide + i) * 100) + '%'});
        });
        
        set.slideNow = 1;
        set.slideNext = set.slideNow + 1;
        
        resetList({
          'resetClass': 'nextClone',
          'ulBeforeReset': -(set.numSlide * 100) + '%',
          'resetUl': 0 + '%',
        });
        

        return false;
      }
      else {
        /*처음과 마지막을 제외한 위치에서 이동할 때*/
        set.selector.find('ul.slide').css({'transition': 'all 0.8s', 'left': -((n - 1) * 100) + '%'}).one('transitionend', function() {
          set.selector.find('.slide>li>figure').addClass('on');
        });
//        set.selector.find('ul.dummy li figure').css({'opacity': 0, 'transition': 'none'});
      }
      
      if (set.slideNow === 1 || set.slideNow === set.numSlide) {
//        set.selector.find('ul.dummy li figure').css({'opacity': 1, 'transition': 'all .8s'}).addClass('on');
      } else {
//        set.selector.find('ul.dummy li figure').css({'opacity': 0, 'transition': 'none'});
        
      }
      
      showTabmenu(n);

      set.slideNow = n;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);

      set.selector.find('ul.slide li').eq(set.slideNow - 1).find('>figure>img').addClass('on');
      set.selector.find('ul.slide>li').eq(set.slideNow - 1).find('.text-area').addClass('on');
      
      if (set.isTimerOn === true) {
        set.timerId = setTimeout(function() {showSlide(set.slideNext)}, set.timerSpeed); 
      }
    }
    
    /*탭 메뉴 표시 함수*/
    function showTabmenu(n) {
      set.selector.find('.menu li>a').removeClass('on');
      set.selector.find('.menu li>a').eq(n - 1).addClass('on');
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
      
//      set.selector.find('ul.dummy li figure').css({'opacity': 0, 'transition': 'none'});
        set.isLastPrev = false;
        set.isLastnext = false;
      
      set.selector.find('ul.slide').css({'transition': 'all 0.8s', 'left': listSet.ulBeforeReset}).one('transitionend', function() {
        set.selector.find('ul.slide li').not('.' + listSet.resetClass).remove();
        set.selector.find('ul.slide li').removeClass(listSet.resetClass);
        set.selector.find('ul.slide li').each(function(i) {
          $(this).css({'left': (i * 100) + '%', 'transition': 'none'});
        });
        set.selector.find('ul.slide').css({'left': listSet.resetUl, 'transition': 'none'});
        set.selector.find('.slide>li>figure').addClass('on');
//        set.selector.find('ul.dummy li figure').css({'opacity': 1, 'transition': 'all .8s'}).addClass('on');
        
        set.selector.find('ul.slide li').eq(set.slideNow - 1).find('>figure>img').addClass('on');
        set.selector.find('ul.slide>li').eq(set.slideNow - 1).find('.text-area').addClass('on');
        
      });
      
      /*if (set.isLastNext === true) {
         set.fTimerId = setTimeout(function() {
          set.selector.find('ul.slide li').eq(set.numSlide - 1).clone().prependTo(set.selector.find('ul.slide')).css({'left': -(100) + '%'}).addClass('dummy');
          set.selector.find('ul.slide li.dummy').find('figure').addClass('exc').stop(true).animate({'width': '1000px', 'opacity': 1, 'transition': 'all .8s'});
        }, 850);
      }*/
     
      
      showTabmenu(set.slideNow);
    }
  } 
  function infiniteMvSlide(setting) {
    var set = $.extend({
      'selector': $('body'),
      'numSlide': 0,
      'timerId': '',
      'timerSpeed': 5000,
      'isTimerOn': false,
      'slideNow': 0,
      'slidePrev': 0,
      'slideNext': 0,
      'slideFirst': 1,
      'isLastPrev': false,
      'isLastNext': false,
      'isAnimationOn': false,
      'isIndicator': true,
    }, setting);
    set.numSlide = set.selector.find('.slide li').length;
    
    set.selector.find('ul.slide li').each(function(i) {
      $(this).css({'left': (i * 100) + '%'});

      if (set.isIndicator === true) {
        set.selector.find('.indicator').append('<a href="#" class="indi"><span class="blind">' + (i + 1) + '번 슬라이드</span></a>\n');
      }
    });
    
    showSlide(set.slideFirst);
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      set.isLastPrev = false;
      set.isLastNext = false;
      
      showSlide(index + 1);
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
    
    
    /*슬라이드 보여주는 함수*/
    function showSlide(n) {
      clearTimeout(set.timerId);
      
      if (set.slideNow === n || set.isAnimationOn === true) {return false;}
      set.isAnimationOn = true;
      if (set.slideNow === 0) {
        /*맨 처음 로딩됐을 때 ul위치 세팅*/
        set.selector.find('ul.slide').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
        set.isAnimationOn = false;
      } 
      else if (set.isLastPrev === true) {
        /*처음 슬라이드에서 prev 클릭했을 때*/
        var $listClone = set.selector.find('ul.slide li').clone().addClass('prevClone'); 
        
        $listClone.prependTo(set.selector.find('ul.slide'));
        
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
        var $listClone = set.selector.find('ul.slide li').clone().addClass('nextClone'); 
      
        $listClone.appendTo(set.selector.find('ul.slide'));

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
        set.selector.find('ul.slide').css({'transition': 'left 0.4s', 'left': -((n - 1) * 100) + '%'}).one('transitionend', function() {
          set.isAnimationOn = false;
        });
      }
      showIndicator(n);

      set.slideNow = n;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
      
      if (set.isTimerOn === true) {
        set.timerId = setTimeout(function() {
          if (set.slideNow === set.numSlide){
            set.isLastNext = true;
          } else {
            set.isLastNext = false;
          }
          showSlide(set.slideNext);
          console.log('dd');
        }, set.timerSpeed); 
      }
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
      
      set.selector.find('ul.slide').css({'transition': 'left 0.4s', 'left': listSet.ulBeforeReset}).one('transitionend', function() {
        set.selector.find('ul.slide li').not('.' + listSet.resetClass).remove();
        set.selector.find('ul.slide li').removeClass(listSet.resetClass);
        set.selector.find('ul.slide li').each(function(i) {
          $(this).css({'left': (i * 100) + '%', 'transition': 'none'});
        });
        set.selector.find('ul.slide').css({'left': listSet.resetUl, 'transition': 'none'});
        set.isAnimationOn = false;
      });

      showIndicator(set.slideNow);
    }
  } 
  function fadeSlide(setting) {
    var set = $.extend({
      'selector': $('body'),
      'numSlide': 0,
      'timerId': '',
      'timerSpeed': 5000,
      'isTimerOn': true,
      'slideNow': 0,
      'slidePrev': 0,
      'slideNext': 0,
      'onAnimation': false,
    }, setting);
    set.numSlide = set.selector.find('.slide li').length;
    
    set.selector.find('ul.slide li').each(function(i) {
        set.selector.find('.indicator').append('<a href="#" class="indi"><span class="blind">' + (i + 1) + '번 슬라이드</span></a>\n');
    });
    
    showSlide(set.slideNow + 1);
    
    
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      
      showSlide(index + 1);
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      showSlide(set.slidePrev);
    });
    set.selector.find('p.control a.next').on('click', function() {
      showSlide(set.slideNext);
    });
    
    function showSlide(i) {
      clearTimeout(set.timerId);
      
      if (set.slideNow <= 0) {
        set.selector.find('.slide li').css({'display': 'none'});
        set.selector.find('.slide li').eq(set.slideNow).css({'display': 'block'});
      } else {
        if (set.slideNow === i || set.onAnimation === true) {return false;}
        set.onAnimation = true;
        function fadeSlide(setting) {
    var set = $.extend({
      'selector': $('body'),
      'numSlide': 0,
      'timerId': '',
      'timerSpeed': 5000,
      'isTimerOn': true,
      'slideNow': 0,
      'slidePrev': 0,
      'slideNext': 0,
      'onAnimation': false,
    }, setting);
    set.numSlide = set.selector.find('.slide li').length;
    
    set.selector.find('ul.slide li').each(function(i) {
        set.selector.find('.indicator').append('<a href="#" class="indi"><span class="blind">' + (i + 1) + '번 슬라이드</span></a>\n');
    });
    
    showSlide(set.slideNow + 1);
    
    
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      
      showSlide(index + 1);
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      showSlide(set.slidePrev);
    });
    set.selector.find('p.control a.next').on('click', function() {
      showSlide(set.slideNext);
    });
    
    function showSlide(i) {
      clearTimeout(set.timerId);
      
      if (set.slideNow <= 0) {
        set.selector.find('.slide li').css({'display': 'none'});
        set.selector.find('.slide li').eq(set.slideNow).css({'display': 'block'});
      } else {
        if (set.slideNow === i || set.onAnimation === true) {return false;}
        set.onAnimation = true;
        
        set.selector.find('.slide li').eq(set.slideNow - 1).stop(true).animate({'opacity': 0}, 800, function() {
          $(this).css({'display': 'none'});
          set.onAnimation = false;
        });
        set.selector.find('.slide li').eq(i - 1).css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, 800);
      }

      set.selector.find('.indicator>.indi').removeClass('on');
      set.selector.find('.indicator>.indi').eq(i - 1).addClass('on');

      set.slideNow = i;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
      
      set.timerId = setTimeout(function() {showSlide(set.slideNext)}, set.timerSpeed);
//      console.log(set.slideNow);
    }
  }
        set.selector.find('.slide li').eq(set.slideNow - 1).stop(true).animate({'opacity': 0}, 800, function() {
          $(this).css({'display': 'none'});
          set.onAnimation = false;
        });
        set.selector.find('.slide li').eq(i - 1).css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, 800);
      }

      set.selector.find('.indicator>.indi').removeClass('on');
      set.selector.find('.indicator>.indi').eq(i - 1).addClass('on');

      set.slideNow = i;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
      
      set.timerId = setTimeout(function() {showSlide(set.slideNext)}, set.timerSpeed);
//      console.log(set.slideNow);
    }
  }
})