/*------------------------Caroussel----------------------*/
(function(){
    "use strict";

    const $slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.carousel-dots');

    if($slides.length === 0 || !dotsContainer) return;

    const slideTimeout = 5000;
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const $text = document.querySelectorAll('.carousel-txt');

    let $dots;
    let intervalId;
    let currentSlide = 0;

    function slideTo(index){
        if(index >= $slides.length){
            currentSlide = 0;
        } else if(index < 0){
            currentSlide = $slides.length - 1;
        } else {
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

/*----------------------------Contenu depliable-----------------*/
function triangle(id){
    const section = document.getElementById(id);         
    const triangleP = section.querySelector('.triangle p');
    const contenu = section.querySelector('.hidden');

    if(triangleP.innerHTML === '▶'){
        triangleP.innerHTML = '▼';
        contenu.classList.add('active');
    } else {
        triangleP.innerHTML = '▶';
        contenu.classList.remove('active');
    }
}

/*--------------------Suivi navigation-bar-------------------*/
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if(linkPage === currentPage && linkPage !== '#'){
            link.classList.add('active');
        }
    });

/*-----------------Bouton copier-coller----------------------*/    
const buttons = document.querySelectorAll('.copyBtn');
const textElements = document.querySelectorAll('.textcopie');

buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.stopPropagation()
        const text = textElements[index].innerText.trim();

        navigator.clipboard.writeText(text)
            .then(() => {
                button.innerHTML = `copié`;
                setTimeout(() => {
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
                }, 2000);
            });
    });
});

/*-----------------------Graphique-----------------------------*/
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Note", "Satisfaction (en %)", { role: "style" } ],
        ["Très bien", 8.94, "#b87333"],
        ["Bien", 10.49, "silver"],
        ["Moyen", 19.30, "gold"],
        ["Mécontent", 21.45, "color: #e5e4e2"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Satisfaction étudiante sur le département informatique",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
      chart.draw(view, options);
  }

  /*-------------------FAQ et plan d'accès-----------------------*/
  function triangle_FAQ(id,event){
    event.stopPropagation();

    const section = document.getElementById(id);         
    const triangleP = section.querySelector(':scope > .contenu-depliable > .depliable-header .triangle p');
    const contenu = section.querySelector(':scope > .contenu-depliable > .hidden');

    if(triangleP.innerHTML === '▶'){
        triangleP.innerHTML = '▼';
        contenu.classList.add('active');
    } else {
        triangleP.innerHTML = '▶';
        contenu.classList.remove('active');
    }
}

function switchCampus(campusId, btn) {
    // Masquer les deux conteneurs de campus
    const villejuif = document.getElementById('campus-villejuif');
    const bordeaux = document.getElementById('campus-bordeaux');
    if (villejuif) villejuif.style.display = 'none';
    if (bordeaux) bordeaux.style.display = 'none';
    
    // Retirer la classe 'active' de tous les boutons
    document.querySelectorAll('.campus-choisi').forEach(button => {
        button.classList.remove('active');
    });
    
    // Afficher le campus sélectionné et activer le bouton
    const selectedCampus = document.getElementById(campusId);
    if (selectedCampus) selectedCampus.style.display = 'block';
    btn.classList.add('active');
}
