
/**
 * Gestione dei Preferiti (localStorage)
 */

const FAVORITES_KEY = 'filmizia_favoriti';

// Ottieni tutti i preferiti
function getFavorites() {
    const favs = localStorage.getItem(FAVORITES_KEY);
    return favs ? JSON.parse(favs) : [];
}

// Salva i preferiti
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Controlla se un elemento è nei preferiti
function isFavorite(id, type) {
    const favorites = getFavorites();
    return favorites.some(f => f.id === id && f.type === type);
}

// Aggiungi o Rimuovi dai preferiti
function toggleFavorite(item, type) {
    let favorites = getFavorites();
    const index = favorites.findIndex(f => f.id === item.id && f.type === type);

    if (index === -1) {
        // Aggiungi
        // Salviamo l'intero oggetto item per poterlo renderizzare nella pagina preferiti
        favorites.push({
            id: item.id,
            type: type,
            data: item,
            addedAt: new Date().toISOString()
        });
        saveFavorites(favorites);
        return true; // Aggiunto
    } else {
        // Rimuovi
        favorites.splice(index, 1);
        saveFavorites(favorites);
        return false; // Rimosso
    }
}

// Crea il pulsante cuore per la card
function createFavoriteButton(item, type) {
    const btn = document.createElement('button');
    btn.className = 'favorite-btn';
    btn.innerHTML = '&#10084;'; // Cuore HTML entity

    // Stato iniziale
    if (isFavorite(item.id, type)) {
        btn.classList.add('active');
    }

    // Gestione click (evita propagazione al click della card)
    btn.onclick = (e) => {
        e.stopPropagation();
        const isAdded = toggleFavorite(item, type);
        if (isAdded) {
            btn.classList.add('active');
            showToast('Aggiunto ai preferiti!');
        } else {
            btn.classList.remove('active');
            showToast('Rimosso dai preferiti');
        }

        // Se siamo nella pagina preferiti, potremmo voler ricaricare o rimuovere la card
        if (window.location.pathname.includes('preferiti.html')) {
            // Ricarica la lista se esiste la funzione apposita (definita in preferiti.js)
            if (typeof loadFavoritesPage === 'function') {
                loadFavoritesPage();
            }
        }
    };

    return btn;
}

// Piccola notifica toast
function showToast(message) {
    let toast = document.getElementById('fav-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'fav-toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = 'show';

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
