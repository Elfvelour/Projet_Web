(function(){
    "use strict";

    const slideTimeout = 5000;

    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

    const $slides = document.querySelectorAll('.slide');
    const $text = document.querySelectorAll('.carousel-txt');

    let $dots;
    let intervalId;
    let currentSlide = 0;

    function slideTo(index){
        if(index >= $slides.length){
            currentSlide = 0;
        } 
        else if(index < 0){
            currentSlide = $slides.length - 1;
        } 
        else {
            currentSlide = index;
        }

        document.querySelector('.carousel-inner').style.transform =
            `translateX(-${currentSlide * 100}%)`;

        $dots.forEach(($elt, key) => {
            $elt.className = `dot ${key === currentSlide ? 'active' : 'inactive'}`;
        });

        $text.forEach(($elt, key) => {
            $elt.classList.toggle('visible', key === currentSlide);
        });
    }

    function showSlide(){
        slideTo(currentSlide + 1);
    }

    const dotsContainer = document.querySelector('.carousel-dots');
    for(let i = 0; i < $slides.length; i++){
        let span = document.createElement('span');
        span.className = `dot ${i === currentSlide ? 'active' : 'inactive'}`;
        span.dataset.slideId = i;
        dotsContainer.appendChild(span);
    }

    $dots = document.querySelectorAll('.dot');
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));

    slideTo(0);

    prev.addEventListener('click', () => slideTo(currentSlide - 1));
    next.addEventListener('click', () => slideTo(currentSlide + 1));

    intervalId = setInterval(showSlide, slideTimeout);

    $slides.forEach($elt => {
        let startX;
        let endX;

        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false);

        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);

        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            if(startX > endX){
                slideTo(currentSlide + 1);
            } else if(startX < endX){
                slideTo(currentSlide - 1);
            }
        });
    });
})();