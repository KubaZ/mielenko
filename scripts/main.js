(function ($) {
    'use strict';

    function Carousel (options) {
        var container = document.querySelector(options.element);
        var carouselItems;
        var currentItem = 0;
        var animationInterval;
        var scrollEnd;

        function animateCarousel () {
            stopAnimation();
            animationInterval = setInterval(moveForward, 3000);
        }

        function stopAnimation () {
            clearInterval(animationInterval);
        }

        function disableCurrentItem () {
            carouselItems[currentItem].classList.remove('active');
        }

        function setCurrentItem () {
            carouselItems[currentItem].classList.add('active');
            var img = carouselItems[currentItem].querySelector('img');
            if (img && img.getAttribute('data-original')) {
                img.setAttribute('src', img.getAttribute('data-original'));
            }
        }

        function moveBackward (e) {
            if (e) {
                e.preventDefault();
            }
            disableCurrentItem();
            currentItem--;
            checkBoundries();
            setCurrentItem();
        }

        function moveForward (e) {
            if (e) {
                e.preventDefault();
            }
            disableCurrentItem();
            currentItem++;
            checkBoundries();
            setCurrentItem();
        }

        function checkBoundries () {
            if (currentItem < 0) {
                currentItem = carouselItems.length - 1;
                return;
            }

            if (currentItem === carouselItems.length) {
                currentItem = 0;
                return;
            }
        }

        container.addEventListener('mouseover', stopAnimation, false);
        container.addEventListener('mouseout', animateCarousel, false);

        carouselItems = container.querySelectorAll('li');
        setCurrentItem();
        animateCarousel();
    }

    new Carousel({ element: '.carousel-container' });
    $('img[usemap]').rwdImageMaps();
    $('img[usemap]').maphilight({
    	fillColor: '44a9ff',
    	strokeColor: '44a9ff'
    });

    document.querySelector('map').addEventListener('click', function(event) {
    	event.preventDefault();
    	if (event.target.classList.contains('front-office-area')) {
    		document.querySelector('#gallery').classList.add('front-office-active');
    		document.querySelector('#gallery').classList.remove('apartment-active');
    	} else {
    		document.querySelector('#gallery').classList.remove('front-office-active');
    		document.querySelector('#gallery').classList.add('apartment-active');
    	}

    	$('a [data-lightbox="' + $(event.target).data('lightboxAlbum') + '"]').get(0).click();
    });
    function selectArea(area, isActive) {
    	var data = $(area).mouseout().data('maphilight') || {};
        data.alwaysOn = isActive;
        $(area).data('maphilight', data).trigger('alwaysOn.maphilight');
    }
    $('area').click(function(e) {
    	e.preventDefault();
    	selectArea(e.target, true);
    	var siblings = $(e.target).siblings('area');
    	siblings.each(function (key) { selectArea(siblings[key], false); });
    });
})(jQuery);