/* --------------------------- A propos - Camembert ---------------------------------- */

const box = document.getElementById('detail-box');
const innerLabels = ['Flavie Brémand', 'Timothée Girault'];
const innerColors = ['#0A316C', '#00838F'];
const outerLabels = ['Formation', 'Corps enseignant & Recherche', 'Partenariats & Professionnalisation', 'Contact & Admission', 'À propos',
                        "Page d'accueil", 'Header / footer', 'Vie étudiante', 'Responsive design', 'Vérifications W3C'];
const outerColors = ['#0A316C', '#1A4D8F', '#2E6DB4', '#5B97D5', '#A8C8EE',
                    '#00838F', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB'];
const outerBorders = ['#0A316C', '#1A4D8F', '#2E6DB4', '#5B97D5', '#5B97D5',
                    '#00838F', '#26A69A', '#4DB6AC', '#4DB6AC', '#4DB6AC'];
const ownerOf = ['Flavie Brémand','Flavie Brémand','Flavie Brémand','Flavie Brémand','Flavie Brémand',
                'Timothée Girault','Timothée Girault','Timothée Girault','Timothée Girault','Timothée Girault'];
const ownerColor = ['#0A316C','#0A316C','#0A316C','#0A316C','#0A316C',
                    '#00838F','#00838F','#00838F','#00838F','#00838F'];

const donutEl = document.getElementById('donutChart');
if(donutEl) {        
    new Chart(donutEl, {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    label: 'Contributeur',
                    data: [50, 50],
                    backgroundColor: innerColors,
                    borderColor: ['#fff', '#fff'],
                    borderWidth: 3,
                    hoverOffset: 6
                },
                {
                    label: 'Tâche',
                    data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                    backgroundColor: outerColors,
                    borderColor: outerBorders,
                    borderWidth: 1.5,
                    hoverOffset: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: false,
                    external: function(ctx) {
                        const tooltip = ctx.tooltip;
                        if (!tooltip.dataPoints || tooltip.opacity === 0) {
                            box.innerHTML = '<span style="color:#888;font-size:13px;">Survolez une section pour voir le détail.</span>';
                            return;
                        }
                        const dp = tooltip.dataPoints[0];
                        const dsIdx = dp.datasetIndex;
                        const idx = dp.dataIndex;
                        if (dsIdx === 0) {
                            const name = innerLabels[idx];
                            const color = innerColors[idx];
                            box.innerHTML = `<p style="margin:0;font-weight:600;font-style:normal;color:${color};">${name} — 50 %</p>`;
                        } else {
                            const task  = outerLabels[idx];
                            const owner = ownerOf[idx];
                            const color = ownerColor[idx];
                            box.innerHTML = `<p style="margin:0 0 2px;font-weight:600;font-style:normal;color:${color};">${task}</p><p style="margin:0;font-size:12px;font-style:normal;color:#666;">${owner}</p>`;
                        }
                    }
                }
            }
        }
    });
}
