# 웹 포트폴리오 ( JeonggeunIm )

- **적용 스킬** : HTML / CSS / Javascript / JQuery

- **총 소요 기간** : 1달 반

- **HTML5 / CSS3 문법을 준수 & 시멘틱 태그 활용 & Clone Coding**

>### 해당 포트폴리오는 전부 학습한 내용을 응용하여 직접 제작한 포트폴리오입니다. <br>플러그인 등 일절 사용하지 않았습니다. 참고 부탁드립니다. <br>(기여도 : 100%)

<br><br><br>
## 1. 포레스트 리솜 (첫 번째 포트폴리오)
- **페이지 링크** : [Intro Page](https://jeonggeunim.github.io/portfolio/risom/index.html)
 / [Main Page](https://jeonggeunim.github.io/portfolio/risom/indexForest.html)
 / [Sub Page1](https://jeonggeunim.github.io/portfolio/risom/conceptForest.html)
 / [Sub Page2](https://jeonggeunim.github.io/portfolio/risom/have9Forest.html)

- **Size** : PC / Tablet / Mobile (반응형 제작)
<br>

 >### 주요 작업
- **3개의 분기점을 통한 반응형 제작**
  
  <br>

- **반응형에 따른 다른 이벤트 처리**<br>
  - window의 width값을 조건으로 함
  
  <br>

- **Main-visual에 Fade 전환 효과의 슬라이드 적용**<br>
  - 모바일 화면에선 스와이프로 전환 가능
  
  <br>

- **모바일/태블릿 화면에서의 gnb의 디자인 변화**<br>
  - 햄버거 메뉴 활용
  
<br>

 >### 작업 후 배운 점
```markdown
- 의미와 구조에 맞는 태그의 사용법

- 미디어 쿼리를 사용한 반응형 웹 제작 방법

- 가장 기본이 되는 fade효과 슬라이드의 기본 원리
```

<br>

 >### 아쉬운 점
```markdown
- js, css 파일을 페이지 별로 분리한 점

- footer 부분에 반응형 화면을 위해 position으로 배치한 부분 

- PC 화면의 gnb 부분이 반응형 전환 시 실시간으로 적용되지 않는 부분
```
<br><br>
## 2. 올프레쉬 (두 번째 포트폴리오)
- **페이지 링크** : [Main Page](https://jeonggeunim.github.io/portfolio/allFresh/index.html)
 / [Sub Page1](https://jeonggeunim.github.io/portfolio/allFresh/present.html)
 / [Sub Page2](https://jeonggeunim.github.io/portfolio/allFresh/brandstory.html)

- **Size** : PC

<br>

 >### 주요 작업
- **좀 더 심화된 형태의 슬라이드 자체 구현**<br>
  - [Main Page]<br>
  fade 슬라이드 & 두 번째 section의 무한 Moving 슬라이드<br>
  
  - [Sub Page2]<br>
  다수의 애니메이션이 적용된 무한 슬라이드<br>
  (연속 이벤트(click) 방지를 위한 'transitionend' 이벤트와 'setTimeout'을 이용한 쓰로틀링 기법 사용)
  
  **무한 슬라이드 핵심 함수**
  - 만들어진 클론을 제어하고, 해당 위치로 리셋시키는 함수
```javascript 
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
```
  
  <br>
  
- **list의 나열 형태로 마크업** <br>
  - [Sub Page1]
  
  <br>

- **스크롤 이벤트**<br>
  - [Sub Page2]<br>
   ScrollTop 값에 따른 opacity와 scale값의 변화를 주어 비주얼 전환 효과<br>
   ScrollTop 값에 따른 텍스트 전환 효과 <br>

  - [Common]<br>
  스크롤 위치에 따른 header, quick menu, top button 변화

<br>

 >### 작업 후 배운 점
```markdown
- 쓰로틀링 기법을 활용한 이벤트 제어

- 스크롤 이벤트에 대한 이해

- 이벤트 처리에 대한 논리적 순서
```

<br>

 >### 아쉬운 점
```markdown
- 스크롤 이벤트의 효율성을 크게 높이지 못한 점
```
<br><br>
## 3. 파라다이스 (세 번째 포트폴리오)
- **페이지 링크** : [Main Page](https://jeonggeunim.github.io/portfolio/paradise/index.html)

- **Size** : PC
<br>

 >### 주요 작업

- **화려한 전환 효과의 슬라이드**<br>
  - Main visual에 7개의 블럭을 나누어 순차적 전환 효과를 적용
  
  <br>
  
- **독특한 문서 구조**<br>
  - 우측의 'Paradise Now' 버튼 클릭시 해당 영역으로 문서가 전체 이동되는 형태<br>
   우측 영역 진입 시 서브 슬라이드 작동 & 메인 슬라이드 정지<br>
   우측 영역 진입 시에만 스크롤 작동<br>
  
  <br>

- **재귀적 함수 호출과 setTimeout를 활용한 슬라이드 'AutoPlay' 기능**
  
  <br>

- **svg의 circle태그를 활용한 'Progress Bar' 구현**<br>
  - [메인 영역]
  
  <br>

- **스크롤 이벤트**<br> 
  - [우측 영역]<br>
  ScrollTop 값에 따른 header 영역의 변화
  
  <br>

- **Mouseenter 이벤트**<br>
  - [메인 영역]<br>
  3depth의 gnb를 구현하기 위해 사용한 position 속성으로 인해 높이 값을 가져오지 못하는 문제 발생 => Jquery의 Height() 메소드를 사용하여 검정색 배경의 높이에 차이를 적용함
  
  <br>

- **웹 접근성 중 '운용의 용이성'을 준수하고자 키보드로의 동작 고려**<br>
  - [메인 영역]<br>
  Tab키를 통한 gnb, 사이트맵 접근, 슬라이드 전환 등 가능

<br>

 >### 작업 후 배운 점
```markdown
- 복잡한 순서의 이벤트를 적용

- 작은 부분이지만 웹 접근성에 대한 이해도 향상

- 상황에 따른 스크롤 작동 제어

- 3depth gnb의 배치 방법
```

<br>

 >### 아쉬운 점
```markdown
- 웹 접근성에 대한 고려가 좀 더 이루어지지 못한 점

- 사이트 맵의 size가 다른 화면 크기를 고려하지 못하여 크기가 큰 점
```
