/* ------------------------ Page d'accueil - Caroussel ---------------------- */

(function(){
    "use strict";

    const carouselInner = document.querySelector('.carousel-inner');
    const dotsContainer = document.querySelector('.carousel-dots');

    if(!carouselInner || !dotsContainer) return;

    const $slidesOriginales = Array.from(document.querySelectorAll('.slide'));
    if($slidesOriginales.length === 0) return;

    const slideTimeout = 5000;
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const $text = document.querySelectorAll('.carousel-txt');

    const premiereClone = $slidesOriginales[0].cloneNode(true);
    const derniereClone = $slidesOriginales[$slidesOriginales.length - 1].cloneNode(true);

    carouselInner.appendChild(premiereClone);     
    carouselInner.insertBefore(derniereClone, $slidesOriginales[0]);

    const $slides = Array.from(carouselInner.querySelectorAll('.slide'));
    const total = $slides.length;
    const nbOriginales = $slidesOriginales.length;

    let currentSlide = 1;
    let isTransitioning = false;
    let intervalId;
    let $dots;

    function slideTo(index, animate = true){
        if(isTransitioning) return;

        currentSlide = index;

        carouselInner.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

        const dotIndex = ((currentSlide - 1) + nbOriginales) % nbOriginales;
        $dots.forEach(($elt, key) => {
            $elt.className = `dot ${key === dotIndex ? 'active' : 'inactive'}`;
        });

        $text.forEach(($elt, key) => {
            $elt.classList.toggle('visible', key === dotIndex);
        });

        if(animate){
            isTransitioning = true;
            setTimeout(() => {
                isTransitioning = false;

                if(currentSlide === 0){
                    currentSlide = nbOriginales;
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
                } else if(currentSlide === total - 1){
                    currentSlide = 1;
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
                }
            }, 500);
        }
    }

    function showSlide(){
        slideTo(currentSlide + 1);
    }

    for(let i = 0; i < nbOriginales; i++){
        let span = document.createElement('span');
        span.className = `dot ${i === 0 ? 'active' : 'inactive'}`;
        span.dataset.slideId = i;
        dotsContainer.appendChild(span);
    }

    $dots = document.querySelectorAll('.dot');
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key + 1)));


    slideTo(1, false);

    prev.addEventListener('click', () => slideTo(currentSlide - 1));
    next.addEventListener('click', () => slideTo(currentSlide + 1));

    intervalId = setInterval(showSlide, slideTimeout);

    $slidesOriginales.forEach($elt => {
        let startX;
        let endX;

        $elt.addEventListener('mouseover', () => clearInterval(intervalId), false);
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);

        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });

        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            if(startX > endX) slideTo(currentSlide + 1);
            else if(startX < endX) slideTo(currentSlide - 1);
        });
    });

})();


/* ----------------- Page d'accueil - Actualités responsive -------------------- */

function responsive_actu() {
    const container = document.querySelector('.actu-container-inline');
    if (!container) return;
    
    if (window.innerWidth <= 768) {
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
    } else {
        container.style.flexDirection = 'row';
        container.style.alignItems = 'flex-start';
    }
}

let resizeTimeout;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        responsive_actu();
    }, 100);
});

/*-----------------------------Timeline-----------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const textes = document.querySelectorAll('.timeline-content');
    textes.forEach(texte => {
        texte.addEventListener('mouseenter', () => {
            texte.closest('.container2').classList.add('active');
        });
        texte.addEventListener('mouseleave', () => {
            texte.closest('.container2').classList.remove('active');
        });
    });
    responsive_actu();
});