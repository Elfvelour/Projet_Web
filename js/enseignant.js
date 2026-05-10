/* ----------------- Corps Enseignant et Recherche - Formulaire ------------------------- */

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
    setTimeout(() => {
        document.getElementById('contact-form').reset();        
        document.getElementById('form-confirmation').style.display = 'none'; 
    }, 2000);
}