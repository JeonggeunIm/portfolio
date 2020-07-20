$(document).ready(function(){
  $('#contents-wrap .nav-brands a').mouseenter(function(){
    if ($(window).width() >= 1290){
      const index=$(this).attr('class').substr(5,1);

      $('#main-visual').css({'background':'url(./img/img_main_s0'+index+'.jpg) no-repeat center','background-size':'cover'});
    }
  });

  $('.navigation .gnv>ul>li').mouseenter(function(){
    if ($(window).width() >= 1290){
      $(this).addClass('on');
    }      
  });

  $('.navigation .gnv>ul>li').mouseleave(function(){
    if ($(window).width() >= 1290){
      $(this).removeClass('on');
    }  
  });
  
  $('#contents-wrap .nav-brands a').mouseenter(function(){
    if ($(window).width() >= 768 && $(window).width() <= 1289){
      const index=$(this).attr('class').substr(5,1);

      $('#main-visual').css({'background':'url(./img/img_main_s0'+index+'.jpg) no-repeat center','background-size':'cover'});
    }
  });
  
  $('.navigation .gnv>ul>li').click(function(){
    if ($(window).width() >= 768 && $(window).width() <= 1289){
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
  
  $('#contents-wrap .nav-brands a').mouseenter(function(){
    if ($(window).width() <= 767) {
      const index=$(this).attr('class').substr(5,1);
    
      $('#main-visual').css({'background':'url(./img/img_main_s0'+index+'_m.jpg) no-repeat center','background-size':'cover'});
    }
  });
  
  $('.navigation .gnv>ul>li').click(function(){
    if ($(window).width() <= 767) {
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
  
  $('#h-area .menu').click(function(){
    if ($(window).width() <= 1289) {
      $(this).toggleClass('on');
      if($('#h-area .menu').is('.on')){
        $('.navigation').stop().animate({left: 0},200);
        $('#h-area .menu').css('position','fixed').css('right','16px');
      }else{
        $('.navigation').stop().animate({left: '100%'},200);
        $('.navigation .gnv>ul>li').find('.sub-list').slideUp();
        $('.navigation .gnv>ul>li').removeClass('on');
        $('#h-area .menu').css('position','relative').css('right','0');
      }  
    }
	});
  
	
})