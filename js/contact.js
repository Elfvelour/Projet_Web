/* ----------------- Bouton copier-coller ---------------------- */

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

/* ------------------- Contact et Admission - FAQ et plan d'accès ----------------------- */

function triangle_FAQ(id, event) {
    event.stopPropagation();
    const section = document.getElementById(id);
    const triangleP = section.querySelector(':scope > .depliable-contenu > .depliable-header .triangle p');
    const contenu = section.querySelector(':scope > .depliable-contenu > .hidden');
    const freres = section.parentElement.querySelectorAll(':scope > .postit');
    freres.forEach(frere => {
        if (frere !== section) {
            const t = frere.querySelector(':scope > .depliable-contenu > .depliable-header .triangle p');
            const c = frere.querySelector(':scope > .depliable-contenu > .hidden');
            if (t) t.innerHTML = '▶';
            if (c) c.classList.remove('active');
        }
    });
    if (triangleP.innerHTML === '▶') {
        triangleP.innerHTML = '▼';
        contenu.classList.add('active');
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


/* FAQ */

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

chargerFAQ();

/* Plan d'accès */

function switchCampus(campusId, btn) {
    const villejuif = document.getElementById('campus-villejuif');
    const bordeaux = document.getElementById('campus-bordeaux');
    if (villejuif) villejuif.style.display = 'none';
    if (bordeaux) bordeaux.style.display = 'none';
    document.querySelectorAll('.campus-choisi').forEach(button => {
        button.classList.remove('active');
    });
    const selectedCampus = document.getElementById(campusId);
    if (selectedCampus) selectedCampus.style.display = 'block';
    btn.classList.add('active');
}

/* ------------------- Contact et admission ----------------------------- */

function switchAdm(id) {
    document.querySelectorAll('.adm-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.adm-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('adm-' + id).classList.add('active');
    const map = { postbac: 0, cpge: 1, parallele: 2, international: 3 };
    document.querySelectorAll('.adm-tab')[map[id]].classList.add('active');
}