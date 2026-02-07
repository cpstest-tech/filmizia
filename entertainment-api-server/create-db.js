const fs = require('fs');

// Leggi i file JSON
const moviesData = JSON.parse(fs.readFileSync('./movies_enriched.json', 'utf8'));
const tvSeriesData = JSON.parse(fs.readFileSync('./tv_series.json', 'utf8'));
const bandsData = JSON.parse(fs.readFileSync('./bands.json', 'utf8'));

// Aggiungi informazioni di esempio per alcuni film
const moviesWithInfo = moviesData.movies.map(movie => {
  const enriched = { ...movie };
  
  // Aggiungi info specifiche per alcuni film
  switch(movie.id) {
    case 1: // The Godfather
      enriched.durata_min = 175;
      enriched.regia = "Francis Ford Coppola";
      if (!enriched.incasso_mondiale_eur) {
        enriched.incasso_mondiale_eur = 246120986;
      }
      enriched.fonte = "IMDb / Box Office Mojo";
      break;
    case 2: // The Godfather Part II
      enriched.durata_min = 202;
      enriched.regia = "Francis Ford Coppola";
      enriched.incasso_mondiale_eur = 88870220;
      enriched.fonte = "IMDb / Box Office Mojo";
      break;
    case 11: // The Shawshank Redemption
      enriched.durata_min = 142;
      enriched.regia = "Frank Darabont";
      enriched.incasso_mondiale_eur = 28341469;
      enriched.fonte = "IMDb / Box Office Mojo";
      break;
    case 7: // Fight Club
      enriched.durata_min = 139;
      enriched.regia = "David Fincher";
      enriched.incasso_mondiale_eur = 100853753;
      enriched.fonte = "IMDb / Box Office Mojo";
      break;
    case 4: // Pulp Fiction
      enriched.durata_min = 154;
      enriched.regia = "Quentin Tarantino";
      enriched.incasso_mondiale_eur = 107928762;
      enriched.fonte = "IMDb / Box Office Mojo";
      break;
  }
  
  return enriched;
});

// Aggiungi informazioni per alcune serie TV
const tvSeriesWithInfo = tvSeriesData.tv_series.map(series => {
  const enriched = { ...series };
  
  switch(series.id) {
    case 1: // Breaking Bad
      enriched.episodio_piu_visto = "Felina (S05E16)";
      enriched.premi_principali_vinti = "16 Primetime Emmy Awards";
      enriched.fonte = "IMDb / Emmy Awards";
      break;
    case 2: // Game of Thrones
      enriched.episodio_piu_visto = "The Long Night (S08E03)";
      enriched.premi_principali_vinti = "59 Primetime Emmy Awards";
      enriched.fonte = "IMDb / Emmy Awards";
      break;
    case 3: // The Sopranos
      enriched.episodio_piu_visto = "Made in America (S06E21)";
      enriched.premi_principali_vinti = "21 Primetime Emmy Awards, 5 Golden Globes";
      enriched.fonte = "IMDb / Emmy Awards";
      break;
  }
  
  return enriched;
});

// Aggiungi informazioni per alcune band
const bandsWithInfo = bandsData.bands.map(band => {
  const enriched = { ...band };
  
  switch(band.id) {
    case 1: // The Beatles
      enriched.componenti = ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"];
      enriched.etichette = ["Parlophone", "Capitol", "Apple"];
      enriched.numero_album_pubblicati = 13;
      enriched.premi_principali_vinti = "7 Grammy Awards, 15 Ivor Novello Awards";
      enriched.curiosita = "Considerati la band più influente di tutti i tempi";
      enriched.fonte = "Wikipedia / Grammy Awards";
      break;
    case 2: // The Rolling Stones
      enriched.componenti = ["Mick Jagger", "Keith Richards", "Ronnie Wood", "Charlie Watts (†)"];
      enriched.etichette = ["Decca", "Rolling Stones Records", "Virgin"];
      enriched.numero_album_pubblicati = 30;
      enriched.premi_principali_vinti = "3 Grammy Awards, Grammy Lifetime Achievement Award";
      enriched.curiosita = "Una delle band rock più longeve e di successo";
      enriched.fonte = "Wikipedia / Grammy Awards";
      break;
    case 5: // Queen
      enriched.componenti = ["Freddie Mercury (†)", "Brian May", "Roger Taylor", "John Deacon"];
      enriched.etichette = ["EMI", "Parlophone", "Hollywood"];
      enriched.numero_album_pubblicati = 15;
      enriched.premi_principali_vinti = "4 Brit Awards, Grammy Lifetime Achievement Award";
      enriched.curiosita = "Bohemian Rhapsody è considerata una delle canzoni più iconiche della storia";
      enriched.fonte = "Wikipedia / Brit Awards";
      break;
  }
  
  return enriched;
});

// Crea il database completo
const db = {
  movies: moviesWithInfo,
  tv_series: tvSeriesWithInfo,
  bands: bandsWithInfo
};

// Salva il database
fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

console.log('Database creato con successo!');
console.log(`- ${db.movies.length} film`);
console.log(`- ${db.tv_series.length} serie TV`);
console.log(`- ${db.bands.length} band`);
