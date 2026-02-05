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
                items.forEach(item => {
                    // Strictly check titolo or band based on type
                    const valueToSearch = (type === 'band' ? item.band : item.titolo) || '';

                    if (valueToSearch.toLowerCase().includes(query)) {
                        resultsFound = true;
                        const card = creaCardGlobale(item, type);
                        container.appendChild(card);
                    }
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

    card.appendChild(overlay);

    return card;
}

function apriDettagliGlobale(item, type) {
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
