document.addEventListener('DOMContentLoaded', () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        if (slides.length === 0) return;

        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    }

    window.changeSlide = function (step) {
        currentSlideIndex += step;
        showSlide(currentSlideIndex);
    }

    window.currentSlide = function (index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    if (slides.length > 0) {
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                cercaGlobale();
            }
        });
    }
});

async function cercaGlobale() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const container = document.querySelector('.contenitori');
    const carousel = document.querySelector('.carousel-container');

    if (!query) {
        container.innerHTML = '';
        if (carousel) carousel.style.display = 'block';
        return;
    }

    if (carousel) carousel.style.display = 'none';

    try {
        const risposta = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        if (!risposta.ok) throw new Error('Errore nella ricerca');

        const data = await risposta.json();
        container.innerHTML = '';

        let resultsFound = false;

        const processResults = (items, type) => {
            if (items && Array.isArray(items) && items.length > 0) {
                resultsFound = true;
                items.forEach(item => {
                    const card = creaCardGlobale(item, type);
                    container.appendChild(card);
                });
            }
        };

        if (data.results) {
            processResults(data.results.movies, 'film');
            processResults(data.results.tv_series, 'serie');
            processResults(data.results.anime, 'anime');
            processResults(data.results.bands, 'band');
        }

        if (!resultsFound) {
            container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Nessun risultato trovato che corrisponda al titolo/nome cercato.</p>';
        }

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color: red; text-align: center; width: 100%;">Errore durante la ricerca.</p>';
    }
}

function creaCardGlobale(item, type) {
    const card = document.createElement('div');
    card.className = 'item';

    const img = document.createElement('img');
    img.src = 'img/hero_film.png';
    if (type === 'anime') img.src = 'img/hero_anime.png';
    if (type === 'serie') img.src = 'img/hero_serie.png';
    if (type === 'band') img.src = 'img/hero_band.png';

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
    btn.onclick = () => apriDettagliGlobale(item, type);
    overlay.appendChild(btn);

    const favBtn = createFavoriteButton(item, type);
    card.appendChild(favBtn);

    card.appendChild(overlay);

    return card;
}

function apriDettagliGlobale(item, type) {
    const modal = document.getElementById('dettagli-modal');
    const modalTitle = modal.querySelector('.modal-content h2');
    const modalInfo = modal.querySelector('.modal-info');

    let displayType = '';
    if (type === 'film') displayType = 'Film';
    else if (type === 'serie') displayType = 'Serie TV';
    else if (type === 'anime') displayType = 'Anime';
    else if (type === 'band') displayType = 'Band';

    const baseTitle = item.titolo || item.band || 'Dettagli';
    const titleText = displayType ? `${baseTitle} - ${displayType}` : baseTitle;

    if (modalTitle) modalTitle.textContent = titleText;

    if (modalInfo) {
        let htmlContent = '';
        const safeJoin = (val) => Array.isArray(val) ? val.join(', ') : val;

        if (type === 'film') {
            htmlContent += `<p><strong>Paese:</strong> ${item.paese || 'N/D'}</p>`;
            htmlContent += `<p><strong>Anno:</strong> ${item.anno}</p>`;
            htmlContent += `<p><strong>Durata:</strong> ${item.durata_min} min</p>`;
            htmlContent += `<p><strong>Regia:</strong> ${item.regia}</p>`;
            if (item.incasso_mondiale_eur) htmlContent += `<p><strong>Incasso Mondiale:</strong> ${item.incasso_mondiale_eur}</p>`;
            if (item.premi_vinti) htmlContent += `<p><strong>Premi vinti:</strong> ${safeJoin(item.premi_vinti)}</p>`;
            if (item.fonte) htmlContent += `<p><strong>Fonte:</strong> ${item.fonte}</p>`;
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

async function sorprendimi() {
    const endpoints = [
        { url: 'movies', type: 'film' },
        { url: 'tv_series', type: 'serie' },
        { url: 'anime', type: 'anime' },
        { url: 'bands', type: 'band' }
    ];

    const randomCategory = endpoints[Math.floor(Math.random() * endpoints.length)];

    try {
        const risposta = await fetch(`http://localhost:3000/${randomCategory.url}`);
        if (!risposta.ok) throw new Error(`Errore nel caricamento di ${randomCategory.url}`);

        const items = await risposta.json();

        if (items.length === 0) {
            alert('Nessun risultato trovato!');
            return;
        }

        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];

        apriDettagliGlobale(randomItem, randomCategory.type);

    } catch (error) {
        console.error("Errore sorprendimi:", error);
        alert('Impossibile caricare un elemento a caso.');
    }
}
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
}
