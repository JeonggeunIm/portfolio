$(document).ready(function(){
	$('#contents-wrap .nav-brands a').mouseover(function(){
		const index=$(this).attr('class').substr(5,1);
		$('#main-visual').css({'background':'url(./img/img_main_s0'+index+'_m.jpg) no-repeat center','background-size':'cover'});
	});
	
	$('.navigation .gnv>ul>li').mouseover(function(){
		$(this).addClass('on');
	});
	$('.navigation .gnv>ul>li').mouseleave(function(){
		$(this).removeClass('on');
	});
	
	$('#h-area .menu').click(function(){
		$(this).toggleClass('on');
		if($('#h-area .menu').is('.on')){
			$('.navigation').stop().animate({left: 0},200);
		}else{
			$('.navigation').stop().animate({left: '100%'},200);
			$('.navigation .gnv>ul>li').find('.sub-list').slideUp();
			$('.navigation .gnv>ul>li').removeClass('on');
		}
	});
	
	$('.navigation .gnv>ul>li').click(function(){
		if($(this).is('.on')){
			$(this).find('.sub-list').slideUp('fast');
			$(this).removeClass('on');
		}else{
			$('.navigation .gnv>ul>li').find('.sub-list').slideUp('fast');
			$('.navigation .gnv>ul>li').removeClass('on');
			$(this).find('.sub-list').slideDown('fast');
			$(this).addClass('on');	
		}
	});
})