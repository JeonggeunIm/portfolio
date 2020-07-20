'use strict';

$(document).ready(function() {
  setScroll();
  $(window).trigger('scroll');
  
  function setScroll() {
    var mainOpacity = 0;
    var imgScaleVal = 0;
    var $selector = $('main section>article').not('.not-ani');
    var articleOffset = [];
    var selLength = $selector.length;
    var mainOffset = $('main #brand').offset().top;
    var opacityAmt = 1 / mainOffset;
    var scaleAmt = 0.2 / mainOffset;
//    var heightAmt = [];
//    var topAmt = 0;
//    var minOffsetImg = -70;
//    var maxOffsetImg = 0;
//          var offsetImg = 0;
//    $('section figure img').css({'transform': '-70px'});
    $selector.each(function(i) {
      articleOffset[i] = $(this).offset().top - 600;
    });
    var height = $('#brand .right figure').innerHeight();
    $(window).on('scroll', function() {
      var scrollAmt = $(document).scrollTop();
      checkHeader();
      controlOpacity();
      controlScale();
      controlEtc();
      
      function controlEtc() {
        
        
        if (scrollAmt > articleOffset[0]) {onClass(0);}
        if (scrollAmt > articleOffset[1]) {onClass(1);}
        if (scrollAmt > articleOffset[2]) {onClass(2);}
        if (scrollAmt > articleOffset[3]) {onClass(3);}

        if (scrollAmt > (articleOffset[0] + 300)) {
//          topAmt++;
          $('#brand .right figure').addClass('on');
          $('#brand .right .leaf').addClass('on');
          
         
//          if (topAmt < 50) {
//           
//          controlHeight(0);
//            
//          } else {
//            return false;
//          }
        }
        if (scrollAmt > (articleOffset[0] + 350)) {
          $('#brand .right figure>img').addClass('on');
//          controlHeight();
          
        }
        function onClass(index) {
          $selector.eq(index).find('.sub-img').addClass('on');
          setTimeout(function() {
            $selector.eq(index).find('h2.title').addClass('on');
          }, 400);
          setTimeout(function() {
            $selector.eq(index).find('strong').addClass('on');    
          }, 800);
          setTimeout(function() {
            $selector.eq(index).find('p.text span').each(function(i) {
              setTimeout(function() {
                $selector.eq(index).find('p.text span').eq(i).addClass('on');
              }, i * 200);
              if (index === 1) {
                setTimeout(function() {
                  $('#brand .left figure').addClass('on');
                  $('#brand .left figure>img').addClass('on');
                }, 1800);
                $('#brand .left .leaf').addClass('on');
              }
              if (index === 2) {
                $('#farm .scale-w').addClass('on');
              }
            });
          }, 800);
        }
//        function controlHeight(index) {
////          $('section figure').css({'height': height - topAmt, 'transition': 'none'});
//          /*$('section figure').css({'transform': 'translateY(' + topAmt + 'px)', 'transition': 'top .1s'});
//          topAmt += 5;
//          console.log(topAmt);*/
//          if ((scrollAmt - (articleOffset[0] + 350) - 70) >= 0) {
//            $('section figure img').css({'transform': 'translateY('+ (scrollAmt - (articleOffset[0] + 350) - 70) + 'px)'});
//            
//          }
          
          
        }
      
      function controlScale() {
        if (scrollAmt < mainOffset){
          imgScaleVal = (scrollAmt * scaleAmt) + 1;
          $('#main-visual .visual-img>img').css({'transform': 'scale(' + imgScaleVal + ')'});
        } else {
          return false;
        }
      }
      function controlOpacity() {
        if (scrollAmt < mainOffset){
          mainOpacity = scrollAmt * opacityAmt;
          $('main').css({'opacity': mainOpacity});
          if (scrollAmt > (mainOffset - 600)) {
            $('#visual-text').removeClass('on');
          } else {
            $('#visual-text').addClass('on');
          }
        } else {
          $('main').css({'opacity': '1'});
          return false;
        }
      }
    });
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
})