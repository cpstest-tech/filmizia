async function loadSerieTV() {
    try {
        const risposta = await fetch('http://localhost:3000/tv_series');
        if (!risposta.ok) throw new Error('Errore nel caricamento delle serie TV');

        const serie = await risposta.json();
        const container = document.querySelector('.contenitori');
        container.innerHTML = '';

        serie.forEach(s => {
            const card = creaCardSerie(s);
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

async function cercaSerie() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        loadSerieTV();
        return;
    }

    try {
        const risposta = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        if (!risposta.ok) throw new Error('Errore nella ricerca');

        const data = await risposta.json();
        const container = document.querySelector('.contenitori');
        container.innerHTML = '';
        if (data.results && data.results.tv_series && Array.isArray(data.results.tv_series)) {
            const filteredSeries = data.results.tv_series.filter(s => s.titolo.toLowerCase().includes(query.toLowerCase()));

            filteredSeries.forEach(s => {
                const card = creaCardSerie(s);
                container.appendChild(card);
            });

            if (filteredSeries.length === 0) {
                container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Nessuna serie trovata.</p>';
            }
        }

    } catch (error) {
        console.error(error);
    }
}

function creaCardSerie(file) {
    const card = document.createElement('div');
    card.className = 'item';

    const img = document.createElement('img');
    img.src = 'img/hero_film.png';
    img.alt = file.titolo;
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'item-overlay';

    const titolo = document.createElement('h2');
    titolo.textContent = file.titolo;
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

    if (modalTitle) modalTitle.textContent = file.titolo;

    if (modalInfo) {
        modalInfo.innerHTML = `
            <p><strong>Paese:</strong> ${file.paese}</p>
            <p><strong>Anni:</strong> ${file.anni}</p>
            <p><strong>Genere:</strong> ${file.genere.join(', ')}</p>
            <p><strong>Stagioni:</strong> ${file.stagioni}</p>
            <p><strong>Network:</strong> ${file.network_streaming.join(', ')}</p>
            <p><strong>Cast:</strong> ${file.cast ? file.cast.join(', ') : 'N/D'}</p>
            <p><strong>Curiosità:</strong> ${file.curiosita}</p>
        `;
    }

    modal.style.display = 'flex';
}

window.onload = loadSerieTV;

