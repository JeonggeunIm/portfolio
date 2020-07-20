$(document).ready(function(){
  $(document).on('click', 'a[href="#"]',function(e) {
    e.preventDefault();
  });
  
  fadeSlide({'selector': $('#main-visual')});
  fadeSlide({'selector': $('#con-mid')});
  
	$('#h-area .menu').click(function(){
    if ($(window).width() <= 1289) {
      $(this).toggleClass('on');
      if($('#h-area .menu').is('.on')){
        $('.navigation').stop().animate({left: 0},200);
      }else{
        $('.navigation').stop().animate({left: '100%'},200);
        $('.navigation .gnv>ul>li').find('.sub-list').slideUp();
        $('.navigation .gnv>ul>li').removeClass('on');
      }
    }
	});
  
	$('.navigation .gnv>ul>li').click(function(){
    if ($(window).width() <= 1289) {
      if($(this).is('.on')){
        $(this).find('.sub-list').slideUp('fast');
        $(this).removeClass('on');
      }else{
        $('.navigation .gnv>ul>li').find('.sub-list').slideUp('fast');
        $('.navigation .gnv>ul>li').removeClass('on');
        $(this).find('.sub-list').slideDown('fast');
        $(this).addClass('on');	
      }
    }
	});
  
	$('.btn-go-t').click(function(){
		$('html, body').animate({scrollTop: $('#wrapper').offset().top},300);
	});

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
      'startX': 0,
      'delX': 0,
      'offsetX': 0,
      'startY': 0,
      'delY': 0,
      'direction': '',
      'isTouched': false,
    }, setting);
    set.numSlide = set.selector.find('.slide li').length;
    
    showSlide(set.slideNow + 1);
    
    set.selector.find('.indicator>.indi').on('click', function() {
      var index = $(this).index();
      
      showSlide(index + 1);
    });
    
    set.selector.find('p.control a.prev').on('click', function() {
      showSlide(slidePrev);
    });
     
    set.selector.find('p.control a.next').on('click', function() {
      showSlide(slideNext);
    });
    
    set.selector.find('ul.slide').on('touchstart', function(e) {
      clearTimeout(set.timerId);
      
//      set.selector.find('ul.slide').css({'transition': 'none'});
      /*none을 적용한 이유는 두번 째 부터 transition이 걸리므로 left가 변경될 때 마다 0.3초가 추가적으로 붙어서 버벅거리게 됨*/
      set.startX = e.touches[0].clientX;
      set.startY = e.touches[0].clientY;
//      set.offsetX = $(this).position().left;
      set.isTouched = true;
    });

    document.addEventListener('touchmove', function(e) {
      if (set.isTouched === true) {
        /*슬라이드에 터치가 됏을 때만 작동*/
//        e.preventDefault();

        set.delX = e.touches[0].clientX - set.startX;
        set.delY = e.touches[0].clientY - set.startY;
        if (set.direction === '') {
          if (Math.abs(set.delX) > 5) {
            set.direction = 'horizon';
          } else if (Math.abs(set.delY) > 5) {
            set.direction = 'vertical';
          }
        } else if (set.direction === 'horizon') {
          e.preventDefault();
          /*모바일에서는 touchmove가 기본동작이 scroll이므로 scroll을 막는 것*/
        } else if (set.direction === 'vertical') {
          set.delX = 0;
        }
      }
    }, {'passive': false});
    /*크롬만 스크롤에 따른 리소스 낭비를 막고자 passive를 true로 기본값을 지정해 놓은 것*/

    document.addEventListener('touchend', function(e) {
      if (set.isTouched === true /*&& direction === 'horizon' => 해당 조건을 달면 showSlide가 작동을 안해 타이머가 재실행 되지 않음*/) {
        if (set.delX < -50) {
          showSlide(set.slideNext);
        } else if (set.delX > 50) {
          showSlide(set.slidePrev);
        } else {
          showSlide(set.slideNow);
        }
      }
      set.isTouched = false;
      set.direction = '';
    }, {'passive': false});
     
    function showSlide(i) {
      clearTimeout(set.timerId);
      
      if (set.slideNow > 0) {
        if (set.slideNow === i) {return false;}
        set.selector.find('.slide li').eq(set.slideNow - 1).stop(true).animate({'opacity': 0}, 800, function() {
          $(this).css({'display': 'none'});
        });
        set.selector.find('.slide li').eq(i - 1).css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, 800);
      }

      set.selector.find('.indicator>.indi').removeClass('on');
      set.selector.find('.indicator>.indi').eq(i - 1).addClass('on');

      set.slideNow = i;
      set.slidePrev = (set.slideNow <= 1) ? set.numSlide : (set.slideNow - 1);
      set.slideNext = (set.slideNow >= set.numSlide) ? 1 : (set.slideNow + 1);
      
      if (set.isTimerOn === true) {
        set.timerId = setTimeout(function() {showSlide(set.slideNext)}, set.timerSpeed);
        console.log(set.slideNow);
      }
    }
  }
})