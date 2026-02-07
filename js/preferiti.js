
/**
 * Gestione Pagina Preferiti
 */

let allFavorites = [];

// Carica e renderizza i preferiti all'avvio
window.onload = () => {
    loadFavoritesPage();

    // Setup ricerca estemporanea
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                cercaPreferiti();
            } else {
                // Ricerca live
                cercaPreferiti();
            }
        });
    }
};

function loadFavoritesPage() {
    allFavorites = getFavorites(); // da favorites.js
    renderFavorites();
}

function cercaPreferiti() {
    renderFavorites();
}

function renderFavorites() {
    const container = document.getElementById('favorites-container');
    const filterType = document.querySelector('input[name="fav_type"]:checked').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();

    container.innerHTML = '';

    if (allFavorites.length === 0) {
        container.innerHTML = '<p class="favorites-empty">Non hai ancora aggiunto nulla ai preferiti.</p>';
        return;
    }

    // Filtra per tipo e ricerca
    const filtered = allFavorites.filter(fav => {
        const item = fav.data;
        const matchesType = filterType === 'all' || fav.type === filterType;

        let title = (item.titolo || item.band || '').toLowerCase();
        const matchesSearch = !searchQuery || title.includes(searchQuery);

        return matchesType && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="favorites-empty">Nessun preferito trovato con questi criteri.</p>';
        return;
    }

    filtered.forEach(fav => {
        const card = createCard(fav.data, fav.type);
        container.appendChild(card);
    });
}

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'item';

    // Etichetta tipo
    const typeLabel = document.createElement('div');
    typeLabel.className = 'card-type-label';
    typeLabel.textContent = type.toUpperCase();
    card.appendChild(typeLabel);

    const img = document.createElement('img');
    // Img default in base al tipo
    if (type === 'film') img.src = 'img/hero_film.png';
    else if (type === 'serie') img.src = 'img/hero_serie.png';
    else if (type === 'anime') img.src = 'img/hero_anime.png';
    else if (type === 'band') img.src = 'img/hero_band.png';
    else img.src = 'img/hero_film.png';

    // Usa nome/titolo appropriato
    const titleText = item.titolo || item.band || 'Titolo Sconosciuto';
    img.alt = titleText;
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'item-overlay';

    const titolo = document.createElement('h2');
    titolo.textContent = titleText;
    overlay.appendChild(titolo);

    const genere = document.createElement('p');
    if (item.genere && Array.isArray(item.genere)) {
        genere.textContent = item.genere.join(', ');
    } else {
        genere.textContent = 'Genere non specificato';
    }
    overlay.appendChild(genere);

    const btn = document.createElement('button');
    btn.className = 'dettagli-btn';
    btn.textContent = 'Dettagli';
    btn.onclick = () => showDetails(item, type);
    overlay.appendChild(btn);

    // Bottone preferito (da favorites.js)
    const favBtn = createFavoriteButton(item, type);
    card.appendChild(favBtn);

    card.appendChild(overlay);

    return card;
}

function showDetails(item, type) {
    const modal = document.getElementById('dettagli-modal');
    const modalTitle = modal.querySelector('.modal-content h2');
    const modalInfo = modal.querySelector('.modal-info');
    const titleText = item.titolo || item.band || 'Dettagli';

    if (modalTitle) modalTitle.textContent = titleText;

    if (modalInfo) {
        let htmlContent = '';
        const safeJoin = (val) => Array.isArray(val) ? val.join(', ') : val;

        if (type === 'film') {
            htmlContent += `<p><strong>Anno:</strong> ${item.anno}</p>`;
            htmlContent += `<p><strong>Durata:</strong> ${item.durata_min} min</p>`;
            htmlContent += `<p><strong>Regia:</strong> ${item.regia}</p>`;
        } else if (type === 'serie') {
            htmlContent += `<p><strong>Anni:</strong> ${item.anni}</p>`;
            htmlContent += `<p><strong>Stagioni:</strong> ${item.stagioni}</p>`;
            htmlContent += `<p><strong>Network:</strong> ${safeJoin(item.network_streaming)}</p>`;
        } else if (type === 'anime') {
            htmlContent += `<p><strong>Anni:</strong> ${item.anni}</p>`;
            htmlContent += `<p><strong>Stagioni:</strong> ${item.stagioni}</p>`;
            htmlContent += `<p><strong>Episodio più visto:</strong> ${item.episodio_piu_visto}</p>`;
        } else if (type === 'band') {
            htmlContent += `<p><strong>Anni:</strong> ${item.periodo_attivita}</p>`;
            htmlContent += `<p><strong>Paese:</strong> ${item.paese_origine}</p>`;
            htmlContent += `<p><strong>Etichette:</strong> ${safeJoin(item.etichette)}</p>`;
        }

        if (item.genere) htmlContent += `<p><strong>Genere:</strong> ${safeJoin(item.genere)}</p>`;
        if (item.cast) htmlContent += `<p><strong>Cast:</strong> ${safeJoin(item.cast)}</p>`;
        if (item.curiosita) htmlContent += `<p><strong>Curiosità:</strong> ${item.curiosita}</p>`;

        modalInfo.innerHTML = htmlContent;
    }

    modal.style.display = 'flex';
}
