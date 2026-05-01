function switchCampus(campus, btn) {
    document.querySelectorAll('.campus-panel').forEach(function(p) {
        p.style.display = 'none';
    });
    document.querySelectorAll('.campus-tab').forEach(function(t) {
        t.classList.remove('active');
    });
    document.getElementById('campus-' + campus).style.display = 'block';
        btn.classList.add('active');
    }

/* Redéfinition de triangle() pour les sites du Plan d'accès :
ouvre le site cliqué et ferme tous les autres du même panel */
function triangle(id) {
    var clickedSite = document.getElementById(id);
    var panel = clickedSite.closest('.campus-panel');
    var allSites = panel ? panel.querySelectorAll('.postit') : [];

    allSites.forEach(function(postit) {
        if (postit.id === id) return;
        var hidden = postit.querySelector(':scope > .contenu-depliable > .hidden');
        var tri = postit.querySelector(':scope > .contenu-depliable > .depliable-header .triangle p');
        if (hidden && hidden.classList.contains('active')) {
            hidden.classList.remove('active');
            if (tri) tri.innerHTML = '▶';
        }
    });

    var target = clickedSite.querySelector(':scope > .contenu-depliable > .hidden');
    var triTarget = clickedSite.querySelector(':scope > .contenu-depliable > .depliable-header .triangle p');
    if (target) {
        var isOpen = target.classList.contains('active');
        target.classList.toggle('active', !isOpen);
        if (triTarget) triTarget.innerHTML = isOpen ? '▶' : '▼';
    }
}