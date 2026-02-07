// ====================================
// ESEMPI DI UTILIZZO DELL'API
// ====================================

// Questo file contiene esempi pratici di come utilizzare l'API
// Puoi eseguire questi esempi in un browser console o in Node.js

const BASE_URL = 'http://localhost:3000';

// ====================================
// 1. FILM - Esempi
// ====================================

console.log('=== ESEMPI FILM ===\n');

// Tutti i film
fetch(`${BASE_URL}/movies`)
  .then(r => r.json())
  .then(data => console.log('Tutti i film:', data.length));

// Film per anno
fetch(`${BASE_URL}/movies?anno=1972`)
  .then(r => r.json())
  .then(data => console.log('Film del 1972:', data));

// Film per genere
fetch(`${BASE_URL}/movies?genere_like=crime`)
  .then(r => r.json())
  .then(data => console.log('Film crime:', data.length));

// Cerca nel titolo
fetch(`${BASE_URL}/movies?titolo_like=god`)
  .then(r => r.json())
  .then(data => console.log('Film con "god" nel titolo:', data));

// Top 10 per incasso
fetch(`${BASE_URL}/movies?_sort=incasso_mondiale_eur&_order=desc&_limit=10`)
  .then(r => r.json())
  .then(data => console.log('Top 10 incassi:', data));

// Solo anime
fetch(`${BASE_URL}/movies?is_anime=true`)
  .then(r => r.json())
  .then(data => console.log('Film anime:', data.length));

// Film lunghi (oltre 3 ore)
fetch(`${BASE_URL}/movies?durata_min_gte=180`)
  .then(r => r.json())
  .then(data => console.log('Film oltre 3 ore:', data));

// ====================================
// 2. SERIE TV - Esempi
// ====================================

console.log('\n=== ESEMPI SERIE TV ===\n');

// Tutte le serie
fetch(`${BASE_URL}/tv_series`)
  .then(r => r.json())
  .then(data => console.log('Tutte le serie TV:', data.length));

// Serie HBO
fetch(`${BASE_URL}/tv_series?network_streaming_like=HBO`)
  .then(r => r.json())
  .then(data => console.log('Serie HBO:', data));

// Serie con più di 5 stagioni
fetch(`${BASE_URL}/tv_series?stagioni_gte=5`)
  .then(r => r.json())
  .then(data => console.log('Serie 5+ stagioni:', data.length));

// Serie ordinate per numero di stagioni
fetch(`${BASE_URL}/tv_series?_sort=stagioni&_order=desc&_limit=5`)
  .then(r => r.json())
  .then(data => console.log('Top 5 serie per stagioni:', data));

// ====================================
// 3. BAND - Esempi
// ====================================

console.log('\n=== ESEMPI BAND ===\n');

// Tutte le band
fetch(`${BASE_URL}/bands`)
  .then(r => r.json())
  .then(data => console.log('Tutte le band:', data.length));

// Band britanniche
fetch(`${BASE_URL}/bands?paese_origine=UK`)
  .then(r => r.json())
  .then(data => console.log('Band UK:', data));

// Band rock
fetch(`${BASE_URL}/bands?genere_like=rock`)
  .then(r => r.json())
  .then(data => console.log('Band rock:', data.length));

// Band ordinate per numero di album
fetch(`${BASE_URL}/bands?_sort=numero_album_pubblicati&_order=desc&_limit=10`)
  .then(r => r.json())
  .then(data => console.log('Top 10 band per album:', data));

// ====================================
// 4. STATISTICHE - Esempi
// ====================================

console.log('\n=== ESEMPI STATISTICHE ===\n');

// Statistiche generali
fetch(`${BASE_URL}/stats`)
  .then(r => r.json())
  .then(data => console.log('Statistiche generali:', data));

// Statistiche film
fetch(`${BASE_URL}/stats/movies`)
  .then(r => r.json())
  .then(data => console.log('Statistiche film:', data));

// Statistiche serie TV
fetch(`${BASE_URL}/stats/tv_series`)
  .then(r => r.json())
  .then(data => console.log('Statistiche serie TV:', data));

// Statistiche band
fetch(`${BASE_URL}/stats/bands`)
  .then(r => r.json())
  .then(data => console.log('Statistiche band:', data));

// ====================================
// 5. RICERCA GLOBALE - Esempi
// ====================================

console.log('\n=== ESEMPI RICERCA GLOBALE ===\n');

// Cerca "godfather"
fetch(`${BASE_URL}/search?q=godfather`)
  .then(r => r.json())
  .then(data => console.log('Ricerca "godfather":', data));

// Cerca "breaking"
fetch(`${BASE_URL}/search?q=breaking`)
  .then(r => r.json())
  .then(data => console.log('Ricerca "breaking":', data));

// Cerca "beatles"
fetch(`${BASE_URL}/search?q=beatles`)
  .then(r => r.json())
  .then(data => console.log('Ricerca "beatles":', data));

// ====================================
// 6. QUERY COMPLESSE - Esempi
// ====================================

console.log('\n=== ESEMPI QUERY COMPLESSE ===\n');

// Film drammatici americani degli anni 2000
fetch(`${BASE_URL}/movies?genere_like=drama&paese=US&anno_gte=2000&anno_lte=2009`)
  .then(r => r.json())
  .then(data => console.log('Film drama US anni 2000:', data));

// Serie crime con molte stagioni
fetch(`${BASE_URL}/tv_series?genere_like=crime&stagioni_gte=5&_sort=stagioni&_order=desc`)
  .then(r => r.json())
  .then(data => console.log('Serie crime lunghe:', data));

// Band rock britanniche degli anni 60-70
fetch(`${BASE_URL}/bands?genere_like=rock&paese_origine=UK`)
  .then(r => r.json())
  .then(data => {
    const filtered = data.filter(b => 
      b.periodo_attivita.includes('196') || 
      b.periodo_attivita.includes('197')
    );
    console.log('Band rock UK anni 60-70:', filtered);
  });

// ====================================
// 7. PAGINAZIONE - Esempi
// ====================================

console.log('\n=== ESEMPI PAGINAZIONE ===\n');

// Prima pagina (10 elementi)
fetch(`${BASE_URL}/movies?_page=1&_limit=10`)
  .then(r => r.json())
  .then(data => console.log('Pagina 1 (10 film):', data));

// Seconda pagina
fetch(`${BASE_URL}/movies?_page=2&_limit=10`)
  .then(r => r.json())
  .then(data => console.log('Pagina 2 (10 film):', data));

// ====================================
// 8. OPERAZIONI CRUD (Commenti)
// ====================================

// POST - Aggiungi nuovo film
/*
fetch(`${BASE_URL}/movies`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    titolo: 'Nuovo Film',
    anno: 2024,
    paese: 'IT',
    genere: ['commedia'],
    is_anime: false
  })
})
.then(r => r.json())
.then(data => console.log('Film aggiunto:', data));
*/

// PUT - Sostituisci film
/*
fetch(`${BASE_URL}/movies/1`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    titolo: 'The Godfather',
    anno: 1972,
    paese: 'US',
    genere: ['drama', 'crime'],
    is_anime: false,
    durata_min: 175,
    regia: 'Francis Ford Coppola'
  })
})
.then(r => r.json())
.then(data => console.log('Film aggiornato:', data));
*/

// PATCH - Aggiorna solo alcuni campi
/*
fetch(`${BASE_URL}/movies/1`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    durata_min: 175,
    fonte: 'IMDb'
  })
})
.then(r => r.json())
.then(data => console.log('Film parzialmente aggiornato:', data));
*/

// DELETE - Elimina film
/*
fetch(`${BASE_URL}/movies/999`, {
  method: 'DELETE'
})
.then(r => r.json())
.then(data => console.log('Film eliminato:', data));
*/

// ====================================
// 9. ASYNC/AWAIT - Esempi
// ====================================

async function esempiAsync() {
  console.log('\n=== ESEMPI ASYNC/AWAIT ===\n');
  
  try {
    // Ottieni statistiche
    const statsResponse = await fetch(`${BASE_URL}/stats`);
    const stats = await statsResponse.json();
    console.log('Statistiche:', stats);
    
    // Cerca film drammatici
    const dramaResponse = await fetch(`${BASE_URL}/movies?genere_like=drama&_limit=5`);
    const dramaMovies = await dramaResponse.json();
    console.log('5 film drammatici:', dramaMovies);
    
    // Ricerca globale
    const searchResponse = await fetch(`${BASE_URL}/search?q=lord`);
    const searchResults = await searchResponse.json();
    console.log('Risultati ricerca "lord":', searchResults);
    
  } catch (error) {
    console.error('Errore:', error);
  }
}

// Decommenta per eseguire
// esempiAsync();

console.log('\n✅ Esempi caricati! Controlla la documentazione su http://localhost:3000/');
