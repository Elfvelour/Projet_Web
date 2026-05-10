/* ---------------------------- Contenu dépliable ----------------------------- */

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
        /* Déclencher les compteurs dans le dépliable qui vient d'ouvrir */
        contenu.querySelectorAll('.stat-number[data-target]').forEach(el => {
            if (!el.dataset.animated) {
                el.dataset.animated = '1';
                animateCounter(el);
            }
        });
    } else {
        triangleP.innerHTML = '▶';
        contenu.classList.remove('active');
    }
}


/* -------------------- Suivi navigation-bar ------------------- */

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
