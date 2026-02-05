async function loadBand() {
    try {
        const risposta = await fetch('http://localhost:3000/bands');
        if (!risposta.ok) throw new Error('Errore nel caricamento delle anime');

        const bands = await risposta.json();
        const container = document.querySelector('.contenitori');

        bands.forEach(s => {
            const card = creaCardBand(s);
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

async function cercaBand() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        loadBand();
        return;
    }

    try {
        const risposta = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        if (!risposta.ok) throw new Error('Errore nella ricerca');

        const data = await risposta.json();
        const container = document.querySelector('.contenitori');
        container.innerHTML = '';
        if (data.results && data.results.bands && Array.isArray(data.results.bands)) {
            const filteredBands = data.results.bands.filter(s => s.band.toLowerCase().includes(query.toLowerCase()));

            filteredBands.forEach(s => {
                const card = creaCardBand(s);
                container.appendChild(card);
            });

            if (filteredBands.length === 0) {
                container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Nessuna band trovata.</p>';
            }
        }

    } catch (error) {
        console.error(error);
    }
}

function creaCardBand(file) {
    const card = document.createElement('div');
    card.className = 'item';

    const img = document.createElement('img');
    img.src = 'img/hero_film.png';
    img.alt = file.band;
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'item-overlay';

    const titolo = document.createElement('h2');
    titolo.textContent = file.band;
    overlay.appendChild(titolo);

    const genere = document.createElement('p');
    genere.textContent = file.genere.join(', ');
    overlay.appendChild(genere);

    const btn = document.createElement('button');
    btn.className = 'dettagli-btn';
    btn.textContent = 'Dettagli';
    btn.onclick = () => apriDettagli(file);
    overlay.appendChild(btn);

    card.appendChild(overlay);

    return card;
}

function apriDettagli(file) {
    const modal = document.getElementById('dettagli-modal');
    const modalTitle = modal.querySelector('.modal-content h2');
    const modalInfo = modal.querySelector('.modal-info');

    if (modalTitle) modalTitle.textContent = file.band;

    if (modalInfo) {
        // Helper to safely join arrays or return value as is
        const safeJoin = (val) => Array.isArray(val) ? val.join(', ') : val;

        modalInfo.innerHTML = `
            <p><strong>Paese:</strong> ${file.paese_origine}</p>
            <p><strong>Anni:</strong> ${file.periodo_attivita}</p>
            <p><strong>Genere:</strong> ${safeJoin(file.genere)}</p>
            <p><strong>Etichette:</strong> ${safeJoin(file.etichette)}</p>
            <p><strong>Componenti:</strong> ${safeJoin(file.componenti)}</p>
            <p><strong>Album pubblicati:</strong> ${file.numero_album_pubblicati}</p>
            <p><strong>Premi principali:</strong> ${safeJoin(file.premi_principali_vinti)}</p>
            <p><strong>Curiosità:</strong> ${file.curiosita}</p>
            <p><strong>Fonte:</strong> ${file.fonte}</p>
        `;
    }

    modal.style.display = 'flex';
}

window.onload = loadBand;

