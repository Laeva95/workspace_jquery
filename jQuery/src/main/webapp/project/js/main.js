$(function() {
/*
	콘텐츠 영역 개발하기
	
		-콘텐츠 영역은 크게 
		  비주얼배너, 
		  알림판, 
		  최근게시물, 
		  알림배너, 
		  베스트Book, 
		  페이스북,
		  마케팅, 
		  온라인서점
		 으로 나뉩니다.
		 
		-레이아웃은 비주얼 배너가 들어가는 visual영역과
		  나머지 주제 소스들이 들어가는 content영역으로 나뉘었음.  
 */

//-----------------------------------------------------------
/*
 주제 : 비주얼 배너 터치 슬라이드 만들기
 비주얼 배너 영역은 배너 중 한개만 노출되어 이루어져 있으며,
 [이전/다음]버튼을 누르면 배너가 이동되어 바뀌게 됨.
 스마트폰에서는 손가락으로 터치 했을때 도 배너가 바뀔수 있도록 제작 하자

 //https://github.com/bradbirdsall/Swipe
 */


  /* 터치 슬라이드 비주얼 영역  */
  /*
	    <div id="mySwipe" class='swipe'>
			<ul class="touch_banner swipe-wrap">
				<!-- 배너 목록 -->
				<li><a href="#"><img src="images/visual_img_1.jpg" alt="" /></a></li>
				<li><a href="#"><img src="images/visual_img_2.jpg" alt="" /></a></li>
				<li><a href="#"><img src="images/visual_img_3.jpg" alt="" /></a></li>
			</ul>
		</div>
  */
	window.mySwipe = $("#mySwipe").Swipe({
		auto: 3000,				// 자동 슬라이드 전환
		continuius: true,		// 슬라이드를 반복해서 보여줌
		callback: function(index, element){	// index: li 요소의 index 위치 값
											// element: li 요소
			
			// 슬라이드 하단의 불릿 이미지를 on에서 off로 변환
			$(".touch_bullet .active").attr("src", "images/visual_bullet_off.png");
			
			// 클래스 active 값을 삭제
			$(".touch_bullet .active").removeClass("active");
			
			// 전환된 슬라이드 화면의 불릿 이미지를 off에서 on으로 변환
			$(".touch_bullet img").eq(index).attr("src", "images/visual_bullet_on.png");
			
			// 클래스 active 값을 추가
			$(".touch_bullet img").eq(index).addClass("active");			
		}						// 슬라이드 전환 후 자동으로 호출되는 함수 설정
		
	}).data('Swipe');			// Swipe 메서드로 생성된 객체를 가져오는데 사용
	
	// 이전, 다음 버튼을 클릭했을 때 슬라이드 전환 처리
	
	// 이전 < a 태그를 선택해 click 이벤트 등록 후 이전 배너 사진 화면으로 이동
	$(".touch_left_btn a").on("click", function(){
		
		mySwipe.prev();		// 이전 배너로 슬라이드 전환 처리
		
		return false;
		
	});
		
	// 다음 > a 태그를 선택해 click 이벤트 등록 후 다음 배너 사진 화면으로 이동
	$(".touch_right_btn a").on("click", function(){
		
		mySwipe.next();		// 다음 배너로 슬라이드 전환 처리
		
		return false;
		
	});
		
		
//-----------------------------------------------------------

  /*
   주제 : 자동 롤링 배너와 제어 버튼을 활용한 알림판 만들기
  
   알림판은 일정 시간 간격으로 자동으로 배너 이미지가 바뀌면서 해당하는 배너에 버튼이 활성화 됨.
   이때 버튼을 마우스로 클릭하면 버튼에 해당하는 배너로 이동 됨.
   그리고 정지 ■ 버튼을 누르면 자동으로 넘어가던 배너가 정지되고, 
   재생 ▶ 버튼을 누르면 다시 배너가 넘어가게 됨 
   */
	  
	/*
		1. index.html을 웹 브라우저로 처음 요청했을 때
		[1] 버튼 이미지에 관한 배너1 이미지만 보이게 하고 나머지는 숨김
	*/
	// 첫번째 dd를 제외한 나머지 dd 요소를 숨김 처리
	$("#roll_banner_wrap dd").not(":first").hide();
	
	// 첫번째 [1]버튼 img 태그를 감싸고 있는 a 요소를 선택해서 onBtn 변수에 저장
	let onBtn = $("#roll_banner_wrap dt a:first"); 	 
	  
	// img 태그를 감싸고 있는 모든 a 요소를 선택해서 click 이벤트 등록
	$("#roll_banner_wrap dt a").on("click", function(){

		// 현재 화면에 노출된 배너 사진 이미지 dd 영역을 숨김
		$("#roll_banner_wrap dd:visible").hide();
		
		// onBtn 변수에 저장된 첫번째 a의 하위 요소 img를 선택
		// src 속성의 이미지 주소를 하얀색 [1] 이미지로 변경
		$("img", onBtn)
		.attr("src", $("img", onBtn)
		.attr("src").replace("over.gif", "out.gif"));
		
		// [1]~[4] 중 클릭한 a의 index 번호를 가져오기
		let num = $("#roll_banner_wrap dt a").index(this);
		
		// 클릭한 a의 index 값과 일치하는 dd 영역만 화면에 표시
		$("#roll_banner_wrap dd").eq(num).show();
		
		// 클릭한 a의 하위 img 요소의 src 속성값을 over 이미지로 변경
		$("img", this)
		.attr("src", $("img", this)
		.attr("src").replace("out.gif", "over.gif"));
		
		// 클릭한 a 요소를 onBtn 변수에 저장
		onBtn = $(this);
						
		// 모든 a 태그의 기본 이벤트 차단
		return false;
	}); 
	
	
	/*
		3. autoPlay 함수 정의
		역할: 4초 간격으로 호출되어 [1] ~ [4] 사이의 a 태그가 강제로 클릭되도록 함
	*/
	let btnNum = 0;
	
	function autoPlay(){
		btnNum++;
		// btnNum 값이 4 이상이 되면 0으로 초기화
		btnNum = btnNum >= 4 ? 0 : btnNum;
		
		// 4초 간격으로 [1] ~ [4] a 태그를 강제 클릭
		$("#roll_banner_wrap dt a").eq(btnNum).trigger("click");
		
		// 4초 간격으로 자기 자신을 호출(재귀함수)
		auto1 = setTimeout(autoPlay, 4000);
	}
	
	// 최초 한번은 3초 휴식 후 호출
	var auto1 = setTimeout(autoPlay, 3000);
	
	/*
		4. 재생버튼 또는 정지버튼을 클릭했을 때 이벤트 처리
	*/
	
	// 재생 버튼을 선택해서 click 이벤트 등록
	$(".playBtn").on("click", function(){
		
		// 사이트 방문자가 재생버튼을 여러번 클릭 시 setTimeout()메소드가 쌓여서 문제가 될 수 있음
		// clearTimeout()으로 제거한 후 setTimeout()메서드를 다시 호출하도록 해야함
		clearTimeout(auto1);
		
		auto1 = setTimeout(autoPlay, 1000);
		
		// 재생 버튼, 정지 버튼 이미지 변경
		$(".playBtn img").attr("src", "images/pop_btn_play_on.gif");
		$(".stopBtn img").attr("src", "images/pop_btn_stop_off.gif");
		
		// a 태그의 기본 click 이벤트 차단
		return false;
	});
	
	$(".stopBtn").on("click", function(){
		
		// setTimeout 메서드를 정지하여 자동 배너 이미지 정지
		clearTimeout(auto1);
		
		// 재생 버튼, 정지 버튼 이미지 변경
		$(".playBtn img").attr("src", "images/pop_btn_play_off.gif");
		$(".stopBtn img").attr("src", "images/pop_btn_stop_on.gif");
		
		// a 태그의 기본 click 이벤트 차단
		return false;
	});
	
	
	
 //-----------------------------------------------------------
  /*
   주제 : 탭 메뉴를 이용해 최근 게시물 리스트 만들기
  
  - 탭메뉴의 경우 최초 탭버튼인[공지사항]이 활성화되어 보입니다.
    만일 방문자가 [질문과답변]탭을 클릭했을 때는 [공지사항]은 숨겨져야 하고,
    [질문과 답변]의 내용은 활성화되어 보여야 합니다.
    
  - 먼저 탭버튼에 <a>에 on()메서드를 사용하여 mouseover,focus,click이벤트를         등록하였고,
  	이벤트 핸들러에는 이벤트가 발생 했을때 마우스를 올린 탭 버튼과 탭에 해당하는 게시물 목록이 활성화되어 보이도록 만들자. 
   */
	 	
	  
 //-----------------------------------------------------------
	  
/*  
주제 : 자동 슬라이드 배너 를 이용한 베스트 Book영역   
	  https://bxslider.com/ 접속하여 사용법 보기 

  bxSlider 플러그인 이란?
    - 여러개의 배너에 슬라이드 기능을 간편하게 적용할수 있는 플러그인 종류중 하나

  bxSlider 플러그인 사용 문법
   
    	참조변수 = $("슬라이드 기능을 설정할 요소영역 선택").bxSlider({속성명:값, 속성명2:값2});

*/
	
// 베스트 book 목록 태그 영역인 ul 요소를 선택해서 bxSlider 메서드 적용
let mySlider = $("#best_bg ul").bxSlider({
	mode: "horizontal",	// 수평 방향으로 슬라이드가 전환됨
	speed: 500, 		// 0.5초만에 슬라이드 이동
	pager: false,		// 페이징 표시를 숨김
	moveSlides: 2,		// 이동 슬라이드 2개
	slideWidth: 125,	// 슬라이드 폭 125px
	minSlides: 1,		// 최소 노출될 슬라이드 1개
	maxSlides: 4,		// 최대 노출될 슬라이드 3개
	slideMargin: 30,	// 슬라이드 사이 간격
	auto: true,			// 자동 슬라이드 전환
	autoHover: true,	// 마우스 오버 시 슬라이드 전환 정지
	controls: false		// 이전, 다음 버튼을 숨김
});

// <이전 <p>요소를 클릭할 때마다 슬라이드를 한 단계 이전으로 이동
$(".prev_btn").on("click", function(){
	
	// 한 단계 이전 슬라이드로 전환
	mySlider.goToPrevSlide();
	
	// a 태그의 기본 이벤트 차단
	return false;
});

// >다음 <p>요소를 클릭할 때마다 슬라이드를 한 단계 다음으로 이동
$(".next_btn").on("click", function(){
	
	// 한 단계 다음 슬라이드로 전환
	mySlider.goToNextSlide();
	
	// a 태그의 기본 이벤트 차단
	return false;
});

 //-----------------------------------------------------------

  /*  
  주제 : 제이쿼리 UI플러그인과 쿠키 플러그인 사용 하기
  - 팝업창을 드래그 하여 이동시키려면, 제이쿼리 UI플러그인을 사용함.
  - [하루동안 이창 열지 않기]버튼 기능을 하용하기 위해서는 쿠키 플러그인을 사용함
  
  참고 : 쿠키 플러그인 사용법
  	       
  	    <쿠키를 생성 하는 기본 사용법>
  	    
  	  	 $.cookie("쿠키명","쿠키값",{expires:만료일});
  	  	 설명 : 쿠키명은 나중에 저장된 쿠키의 값을 불러올때 구분하기 위한 이름임.
  	  	            생성된 쿠키는 현재 부터 며칠동안 
                            클라이언트 컴퓨터의 웹브라우저에 보관할건지 만료일(expires)을 지정할수 있음.

			예)
	 	     $.cookie("pop","no",{expires:1}));
	 	         설명: 브라우저에는 "pop"라는 이름으로 "no"라는 값이 
                   1일 동안 쿠키가 보관 됩니다.
 	         
 	    <쿠키 플러그인을 이용하여  브라우저에 저장된 쿠키를 불러오는 기본 사용법>
 	    	$.cookie("쿠키명");
 	    
        	저장된 쿠키값인 "no" 불러오는 방법의 예)
	 	    $.cookie("pop");
 	    
 	    <쿠키 플러그인을 이용하여 브라우저에 저장된 쿠키를 삭제하는 기본 사용법>
 	    $.cookie("쿠키명",null);
 	    
 	    "pop"에 저장된 쿠키값 삭제의 예)
         $.cookie("pop",null);
  	  		
  */
	  

	


});

