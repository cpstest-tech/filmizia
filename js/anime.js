async function loadAnime() {
    try {
        const risposta = await fetch('http://localhost:3000/anime');
        if (!risposta.ok) throw new Error('Errore nel caricamento delle anime');

        const anime = await risposta.json();
        const container = document.querySelector('.contenitori');

        anime.forEach(s => {
            const card = creaCardAnime(s);
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
    }
}

async function cercaAnime() {
    const query = document.getElementById('search-input').value;
    if (!query) {
        loadAnime();
        return;
    }

    try {
        const risposta = await fetch(`http://localhost:3000/anime?titolo_like=${encodeURIComponent(query)}`);
        if (!risposta.ok) throw new Error('Errore nella ricerca');

        const anime = await risposta.json();
        const container = document.querySelector('.contenitori');
        container.innerHTML = '';

        anime.forEach(s => {
            const card = creaCardAnime(s);
            container.appendChild(card);
        });

        if (anime.length === 0) {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Nessun anime trovato.</p>';
        }

    } catch (error) {
        console.error(error);
    }
}

function creaCardAnime(file) {
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

    const favBtn = createFavoriteButton(file, 'anime');
    card.appendChild(favBtn);

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
            <p><strong>Episodio più visto:</strong> ${file.episodio_piu_visto}</p>
            <p><strong>Cast:</strong> ${file.cast ? file.cast.join(', ') : 'N/D'}</p>
            <p><strong>Curiosità:</strong> ${file.curiosita}</p>
            <p><strong>Fonte:</strong> ${file.fonte}</p>
        `;
    }

    modal.style.display = 'flex';
}

window.onload = () => {
    loadAnime();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                cercaAnime();
            }
        });
    }
};

async function sorprendimiAnime() {
    try {
        const risposta = await fetch('http://localhost:3000/anime');
        if (!risposta.ok) throw new Error('Errore nel caricamento degli anime');

        const anime = await risposta.json();

        if (anime.length === 0) {
            alert('Nessun anime trovato!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * anime.length);
        const randomAnime = anime[randomIndex];

        apriDettagli(randomAnime);

    } catch (error) {
        console.error("Errore sorprendimiAnime:", error);
        alert('Impossibile caricare un anime a caso.');
    }
}

