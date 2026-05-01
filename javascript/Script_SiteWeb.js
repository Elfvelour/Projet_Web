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
