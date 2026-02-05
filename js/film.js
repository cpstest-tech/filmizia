let currentFilmsData = [];

async function loadFilms() {
    try {
        const risposta = await fetch('http://localhost:3000/movies');
        if (!risposta.ok) throw new Error('Errore nel caricamento dei film');

        currentFilmsData = await risposta.json();
        renderFilteredFilms();

    } catch (error) {
        console.error(error);
    }
}

async function cercaFilm() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        loadFilms();
        return;
    }

    try {
        const risposta = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        if (!risposta.ok) throw new Error('Errore nella ricerca');

        const data = await risposta.json();
        if (data.results && data.results.movies && Array.isArray(data.results.movies)) {
            currentFilmsData = data.results.movies.filter(s => s.titolo.toLowerCase().includes(query.toLowerCase()));
            renderFilteredFilms();
        }

    } catch (error) {
        console.error(error);
    }
}

function renderFilteredFilms() {
    const container = document.querySelector('.contenitori');
    const checkedInput = document.querySelector('input[name="is_anime"]:checked');

    if (!checkedInput) {
        return;
    }

    const filterValue = checkedInput.value;

    container.innerHTML = '';

    let displayedFilms = currentFilmsData;

    if (filterValue === 'yes') {
        displayedFilms = currentFilmsData.filter(f => f.is_anime === true);
    } else if (filterValue === 'no') {
        displayedFilms = currentFilmsData.filter(f => f.is_anime === false);
    }

    if (displayedFilms.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Nessun film trovato con questi criteri.</p>';
        return;
    }

    displayedFilms.forEach(f => {
        const card = creaCardFilm(f);
        container.appendChild(card);
    });
}

function creaCardFilm(file) {
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
            <p><strong>Anno:</strong> ${file.anno}</p>
            <p><strong>Genere:</strong> ${file.genere.join(', ')}</p>
            <p><strong>Durata:</strong> ${file.durata_min} min</p>
            <p><strong>Regia:</strong> ${file.regia}</p>
            <p><strong>Cast:</strong> ${file.cast ? file.cast.join(', ') : 'N/D'}</p>
            <p><strong>Incasso Mondiale:</strong> ${file.incasso_mondiale_eur}</p>
            <p><strong>Premi vinti:</strong> ${file.premi_vinti ? file.premi_vinti.join(', ') : 'N/D'}</p>
            <p><strong>Curiosità:</strong> ${file.curiosita}</p>
            <p><strong>Fonte:</strong> ${file.fonte}</p>
        `;
    }

    modal.style.display = 'flex';
}

window.onload = loadFilms;

