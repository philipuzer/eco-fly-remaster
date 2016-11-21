$(document).ready(function(){
	$('.js-main-slider').slick({
		infinite: true,
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2500,
		speed: 2500,
		fade: true
	});


	$('.js-slider').slick({
		infinite: false,
		speed: 1500,
		autoplay: false,
		prevArrow: $('.btn-slide-left'),
		nextArrow: $('.btn-slide-right'),
		slidesToShow: 1,
		asNavFor: $('.js-slider-nav')
	});

function scroll(selector){
		$(selector).on("click", function (event) {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();
			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top - $('.js-menu-bar').innerHeight();
			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 500);
		});
	};
	scroll('.js-btn-calc');
//  form modal
	var modForm = $('.form-modal');
	var modFormBg = $('.js-modal-bg');
	var btnFormClose = $('.js-form-modal-close');
	var btnFormShow = $('.js-show-modal');
	btnFormShow.on('click', function(){
		modFormBg.slideDown();
		modForm.slideDown();
	})
	modFormBg.on('click', function(){
		modForm.slideUp();
		modFormBg.slideUp();
	})
	btnFormClose.on('click', function(e){
		e.preventDefault();
		modForm.slideUp();
		modFormBg.slideUp();
	})
	var modPhone = $('.js-modal-phone');
	var modName = $('.js-modal-name');
	var modSubmit =$(".js-form-modal-submit");

	function valid(elem){
		elem.on('keypress', function(){
			// if(elem.val().length > 4){
			// 	elem.css('border-color', '#5fa42c')
			// } else {
			// 	elem.css('border-color', '#ff8a00')
			// };
			if( modPhone.val().length > 4 && modName.val().length > 3){
				modSubmit.addClass('valid')
			} else {
				modSubmit.removeClass('valid')
			};
		});
	}
	valid(modName);
	valid(modPhone);


	modSubmit.on('click', function(e){
		if(!modSubmit.hasClass('valid')){
			e.preventDefault();
		}
	})

	// number-containers

	var inputContainers = $('.js-number-container-value');

		$('.js-plus').on('click', function(e){
			e.preventDefault();
			var numbConteiner = inputContainers.val();
			inputContainers.val( + numbConteiner + 1);
		});

		$('.js-minus').on('click', function(e){
			e.preventDefault();
			var numbConteiner = inputContainers.val();
			if( + numbConteiner > 1){
				inputContainers.val( + numbConteiner - 1);
			}
		});

		$('.select').on( 'click', function(){
			$(this).one('mouseleave', function(){
				$(this).parents('.select-box').addClass('changed')
			})
		});



	$('.js-slider-nav').slick({
		slidesToShow: 4,
		asNavFor: '.js-slider',
		centerMode: false,
		focusOnSelect: true
	});


// logo slider
	$('.js-logo-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false
	});
// counter
var deadline = '2016-12-31';

	function getTimeRemaining(endtime){
	  var t = Date.parse(endtime) - Date.parse(new Date());
	  var seconds = Math.floor( (t/1000) % 60 );
	  var minutes = Math.floor( (t/1000/60) % 60 );
	  var hours = Math.floor( (t/(1000*60*60)) % 24 );
	  var days = Math.floor( t/(1000*60*60*24) );
	  return {
	   'total': t,
	   'days': days,
	   'hours': hours,
	   'minutes': minutes,
	   'seconds': seconds
	  };
	}
// var a = getTimeRemaining(deadline);

	function initializeClock(idDate, idHour, idMinute, idSecond, endtime){
		var date = document.getElementById('idDate');
		var hour = document.getElementById('idHour');
		var minute = document.getElementById('idMinute');
		var second = document.getElementById('idSecond');
		var timeinterval = setInterval(function(){

			var t = getTimeRemaining(endtime);

			date.innerHTML = t.days;
			hour.innerHTML =t.hours;
			minute.innerHTML =t.minutes;
			second.innerHTML =t.seconds;

			if(t.total<=0){
				clearInterval(timeinterval);
			}

		},1000);
	}
	initializeClock('js-day','js-hour','js-minute','js-second', deadline);

	var btnShowMenu = $('.js-btn-burger');

	btnShowMenu.on('click', function(e){
		e.stopPropagation();
		$('.menu').slideDown();
		$(this).hide();
	});

	$('body').on('click', function(){
    if( $(window).width() < 700 ){
		$('.menu').slideUp();
			btnShowMenu.show();
		}
	});
  $(window).scroll(function(){
		if ( $(document).scrollTop() > 500 ) {
			$('.js-btn-top').show();
		} else {
			$('.js-btn-top').hide();
		}
	});
  $('.js-btn-top').click(function() {
			$('html, body').animate({scrollTop: 0},500);
			return false;
		});

})
