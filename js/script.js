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
function triangle(id) {
    const section = document.getElementById(id);
    const triangleP = section.querySelector('.triangle p');
    const contenu = section.querySelector('.hidden');

    const freres = section.parentElement.querySelectorAll(':scope > .postit');
    freres.forEach(frere => {
        if (frere !== section) {
            const t = frere.querySelector('.triangle p');
            const c = frere.querySelector('.hidden');
            if (t) t.innerHTML = '▶';
            if (c) c.classList.remove('active');
        }
    });

    if (triangleP.innerHTML === '▶') {
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

function toggleNav(){
    document.querySelector('nav').classList.toggle('open');
}
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
        ["Note", "Satisfaction (en %)", { role: "style" }],
        ["Très bien", 80.78, "green"],
        ["Bien", 10.31, "#7fff00"],
        ["Moyen", 6.67, "gray"],
        ["Mécontent", 2.24, "red"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
        2]);

 
   var chartDiv = document.getElementById("chart_div");
   var chartWidth = chartDiv.offsetWidth || 600;
   var chartHeight;
   if(window.innerWidth < 600){
      chartHeight = 200;
   } 
   else if(window.innerWidth < 768){
      chartHeight = 250;
   }
   else {
      chartHeight = 400;
   }

   var options = {
      title: "Satisfaction étudiante sur le département informatique",
      width: chartWidth,
      height: chartHeight,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
   };

    var chart = new google.visualization.ColumnChart(chartDiv);
    chart.draw(view, options);
}
window.addEventListener('resize', drawChart);

/*-------------------FAQ et plan d'accès-----------------------*/
function triangle_FAQ(id, event) {
    event.stopPropagation();

    const section = document.getElementById(id);
    const triangleP = section.querySelector(':scope > .depliable-contenu > .depliable-header .triangle p');
    const contenu = section.querySelector(':scope > .depliable-contenu > .hidden');

    // Fermer les frères (postits du même niveau)
    const freres = section.parentElement.querySelectorAll(':scope > .postit');
    freres.forEach(frere => {
        if (frere !== section) {
            const t = frere.querySelector(':scope > .depliable-contenu > .depliable-header .triangle p');
            const c = frere.querySelector(':scope > .depliable-contenu > .hidden');
            if (t) t.innerHTML = '▶';
            if (c) c.classList.remove('active');
        }
    });

    // Ouvrir ou fermer le postit cliqué
    if (triangleP.innerHTML === '▶') {
        triangleP.innerHTML = '▼';
        contenu.classList.add('active');
    } else {
        triangleP.innerHTML = '▶';
        contenu.classList.remove('active');
    }
}

/*------------------------FAQ---------------------------*/
// Fonction pour récupérer et traiter le JSON
async function chargerFAQ() {
    try {
        const response = await fetch('../data/faq.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const container = document.getElementById('faq-container');
        if (!container) return;
        container.innerHTML = '';

        data.faq.forEach((cat, catIdx) => {
            const catId = `faq-cat-${catIdx}`;

            // Catégorie = postit dépliable niveau 1
            const catDiv = document.createElement('div');
            catDiv.className = 'postit';
            catDiv.id = catId;
            catDiv.setAttribute('onclick', `triangle_FAQ('${catId}', event)`);
            catDiv.innerHTML = `
                <div class="depliable-contenu">
                    <div class="depliable-header">
                        <div class="triangle"><p>▶</p></div>
                        <p class="title-box">${cat.category}</p>
                    </div>
                    <div class="hidden" id="${catId}-contenu"></div>
                </div>`;
            container.appendChild(catDiv);

            const catContenu = document.getElementById(`${catId}-contenu`);

            // Questions = postit dépliable niveau 2
            cat.questions.forEach((item, qIdx) => {
                const qId = `faq-q-${catIdx}-${qIdx}`;
                const qDiv = document.createElement('div');
                qDiv.className = 'postit';
                qDiv.id = qId;
                qDiv.setAttribute('onclick', `triangle_FAQ('${qId}', event)`);
                qDiv.innerHTML = `
                    <div class="depliable-contenu">
                        <div class="depliable-header">
                            <div class="triangle"><p>▶</p></div>
                            <p class="title-box">${item.q}</p>
                        </div>
                        <div class="hidden">
                            <p style="font-style:normal; padding: 0.5rem 0;">${item.a}</p>
                        </div>
                    </div>`;
                catContenu.appendChild(qDiv);
            });
        });

    } catch (err) {
        console.error(err);
        const container = document.getElementById('faq-container');
        if (container) container.innerHTML = '<p>FAQ indisponible.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    chargerFAQ();
});

/*-------------------Plan d'accès-----------------------*/
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

document.addEventListener('DOMContentLoaded', () => {
    const textes = document.querySelectorAll('.timeline-content');

    textes.forEach(texte => {
        texte.addEventListener('mouseover', () => {
            texte.closest('.container2').classList.add('active');
        });

        texte.addEventListener('mouseout', () => {
            texte.closest('.container2').classList.remove('active');
        });
    });
});

/*-----------------Actualités dans la page d'accueil (responsive)------------------*/
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

window.addEventListener('resize', responsive_actu);
document.addEventListener('DOMContentLoaded', responsive_actu);

/*-----------------Formulaire Enseignants_Recherche------------------*/
function envoyerFormulaire() {
            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const sujet = document.getElementById('sujet').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!nom || !email || !sujet || !message) {
                alert('Veuillez remplir tous les champs obligatoires (*).');
                return;
            }
            document.getElementById('form-confirmation').style.display = 'block';
        }