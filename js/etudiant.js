/* ------------------- Vie étudiante - Projet étudiants -------------------- */

const projets = {
    projet1: {
        img: "../img/projet_etudiants/etuaide.png",
        titre: "Etu'aide",
        but: "Favoriser la rencontre, l’entraide et le lien social entre étudiants, tout en luttant contre l’isolement et le gaspillage au quotidien.",
        qui: "Groupe P2 : Girault, Brémand, Splinder, Lemmonier, Marques, Aubert",
        quand: "Projet transverse P2 (2025/2026)",
        liens: [
            { texte: "GitHub", url: "https://github.com/matt-spdl/etuaide" },
        ]
    },
    projet2: {
        img: "../img/projet_etudiants/open3map.png",
        titre: "Open3map",
        but: "Application qui référence tout les points de tri",
        qui: "Groupe P2-SC1",
        quand: "Semestre 4 — 2025/2026",
        liens: [
            { texte: "Voir le projet", url: "https://github.com/Baptr0b0t" }
        ]
    },
    projet3: {
        img: "../img/projet_etudiants/ctfrei.png",
        titre: "Cybersécurité CTF",
        but: "Participation aux CTF InCyber avec l'association CTFrei.",
        qui: "Association CTFrei",
        quand: "Mars 2026",
        liens: [
            { texte: "CTFrei", url: "https://ctfrei.fr" },
        ]
    }
};

function ouvrirModal(id) {
    const p = projets[id];
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-titre').textContent = p.titre;
    document.getElementById('modal-but').innerHTML = '<strong>But</strong> : ' + p.but;
    document.getElementById('modal-qui').innerHTML = '<strong>Qui</strong> : ' + p.qui;
    document.getElementById('modal-quand').innerHTML = '<strong>Quand</strong> : ' + p.quand;

    const liensDiv = document.getElementById('modal-liens');
    liensDiv.innerHTML = '';
    p.liens.forEach(lien => {
        const a = document.createElement('a');
        a.href = lien.url;
        a.textContent = lien.texte;
        a.target = '_blank';
        a.className = 'modal-lien';
        liensDiv.appendChild(a);
    });

    document.getElementById('modal-overlay').classList.add('actif');
}

function fermerModal() {
    document.getElementById('modal-overlay').classList.remove('actif');
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') fermerModal();
});

