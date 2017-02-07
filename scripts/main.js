(function () {
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
})();