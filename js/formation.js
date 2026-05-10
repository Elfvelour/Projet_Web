/* --------------------- Cours et Formations ------------------------------- */

function switchTab(id) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    const btns = document.querySelectorAll('.tab-btn');
    const map = { cpi: 0, ingenieur: 1, bachelor: 2 };
    btns[map[id]].classList.add('active');
}

function toggleAccord(id) {
    const el = document.getElementById(id);
    el.classList.toggle('open');
}