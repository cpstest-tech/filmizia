const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware personalizzati
server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS permissivo
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Admin-Password');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const ADMIN_PASSWORD = 'filmizia2026';

server.post('/auth/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true, message: 'Accesso autorizzato' });
  } else {
    res.status(401).json({ success: false, message: 'Password errata' });
  }
});

// Middleware di protezione per operazioni di scrittura
server.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'OPTIONS' && !req.path.startsWith('/auth')) {
    const providedPassword = req.header('X-Admin-Password');
    if (providedPassword !== ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Operazione non autorizzata. Password richiesta.' });
    }
  }
  next();
});

// ====================
// ROUTE PERSONALIZZATE
// ====================

// Home page con documentazione API
server.get('/', (req, res) => {
  res.json({
    message: 'Entertainment API Server',
    version: '1.0.0',
    endpoints: {
      movies: {
        list: 'GET /movies',
        detail: 'GET /movies/:id',
        search: 'GET /movies?titolo_like=:query',
        filterByYear: 'GET /movies?anno=:year',
        filterByCountry: 'GET /movies?paese=:country',
        filterByGenre: 'GET /movies?genere_like=:genre',
        filterByAnime: 'GET /movies?is_anime=:boolean',
        sortByBoxOffice: 'GET /movies?_sort=incasso_mondiale_eur&_order=desc',
        pagination: 'GET /movies?_page=:page&_limit=:limit'
      },
      tv_series: {
        list: 'GET /tv_series',
        detail: 'GET /tv_series/:id',
        search: 'GET /tv_series?titolo_like=:query',
        filterByNetwork: 'GET /tv_series?network_streaming_like=:network',
        filterByGenre: 'GET /tv_series?genere_like=:genre',
        filterByCountry: 'GET /tv_series?paese=:country',
        sortBySeasons: 'GET /tv_series?_sort=stagioni&_order=desc'
      },
      anime: {
        list: 'GET /anime',
        detail: 'GET /anime/:id',
        search: 'GET /anime?titolo_like=:query',
        filterByNetwork: 'GET /anime?network_streaming_like=:network',
        filterByGenre: 'GET /anime?genere_like=:genre',
        filterByCountry: 'GET /anime?paese=:country',
        sortBySeasons: 'GET /anime?_sort=stagioni&_order=desc'
      },
      bands: {
        list: 'GET /bands',
        detail: 'GET /bands/:id',
        search: 'GET /bands?band_like=:query',
        filterByGenre: 'GET /bands?genere_like=:genre',
        filterByCountry: 'GET /bands?paese_origine=:country',
        sortByAlbums: 'GET /bands?_sort=numero_album_pubblicati&_order=desc'
      },
      statistics: {
        movies: 'GET /stats/movies',
        tv_series: 'GET /stats/tv_series',
        anime: 'GET /stats/anime',
        bands: 'GET /stats/bands',
        all: 'GET /stats'
      },
      search: 'GET /search?q=:query'
    },
    examples: [
      '/movies?genere_like=drama&_sort=anno&_order=desc',
      '/tv_series?network_streaming_like=HBO',
      '/anime?genere_like=azione&_sort=stagioni&_order=desc',
      '/bands?paese_origine=UK&genere_like=rock',
      '/search?q=godfather'
    ]
  });
});

// Statistiche generali
server.get('/stats', (req, res) => {
  const db = router.db;
  const movies = db.get('movies').value();
  const tvSeries = db.get('tv_series').value();
  const anime = db.get('anime').value();
  const bands = db.get('bands').value();

  res.json({
    movies: {
      total: movies.length,
      with_box_office: movies.filter(m => m.incasso_mondiale_eur).length,
      anime: movies.filter(m => m.is_anime).length,
      by_country: getCountsByField(movies, 'paese'),
      top_genres: getTopGenres(movies)
    },
    tv_series: {
      total: tvSeries.length,
      total_seasons: tvSeries.reduce((sum, s) => sum + (s.stagioni || 0), 0),
      by_country: getCountsByField(tvSeries, 'paese'),
      top_genres: getTopGenres(tvSeries)
    },
    anime: {
      total: anime.length,
      total_seasons: anime.reduce((sum, a) => sum + (a.stagioni || 0), 0),
      by_country: getCountsByField(anime, 'paese'),
      top_genres: getTopGenres(anime)
    },
    bands: {
      total: bands.length,
      by_country: getCountsByField(bands, 'paese_origine'),
      top_genres: getTopGenres(bands),
      active: bands.filter(b => b.periodo_attivita.includes('presente')).length
    }
  });
});

// Statistiche film
server.get('/stats/movies', (req, res) => {
  const db = router.db;
  const movies = db.get('movies').value();

  const moviesWithBoxOffice = movies.filter(m => m.incasso_mondiale_eur);
  const topGrossing = moviesWithBoxOffice
    .sort((a, b) => b.incasso_mondiale_eur - a.incasso_mondiale_eur)
    .slice(0, 10)
    .map(m => ({ id: m.id, titolo: m.titolo, incasso_mondiale_eur: m.incasso_mondiale_eur }));

  res.json({
    total: movies.length,
    anime: movies.filter(m => m.is_anime).length,
    non_anime: movies.filter(m => !m.is_anime).length,
    with_box_office_data: moviesWithBoxOffice.length,
    top_grossing: topGrossing,
    by_decade: getMoviesByDecade(movies),
    by_country: getCountsByField(movies, 'paese'),
    top_genres: getTopGenres(movies)
  });
});

// Statistiche serie TV
server.get('/stats/tv_series', (req, res) => {
  const db = router.db;
  const tvSeries = db.get('tv_series').value();

  const mostSeasons = tvSeries
    .filter(s => s.stagioni)
    .sort((a, b) => b.stagioni - a.stagioni)
    .slice(0, 10)
    .map(s => ({ id: s.id, titolo: s.titolo, stagioni: s.stagioni }));

  res.json({
    total: tvSeries.length,
    total_seasons: tvSeries.reduce((sum, s) => sum + (s.stagioni || 0), 0),
    average_seasons: (tvSeries.reduce((sum, s) => sum + (s.stagioni || 0), 0) / tvSeries.length).toFixed(2),
    most_seasons: mostSeasons,
    by_country: getCountsByField(tvSeries, 'paese'),
    top_genres: getTopGenres(tvSeries),
    top_networks: getTopNetworks(tvSeries)
  });
});

// Statistiche anime
server.get('/stats/anime', (req, res) => {
  const db = router.db;
  const anime = db.get('anime').value();

  const mostSeasons = anime
    .filter(a => a.stagioni)
    .sort((a, b) => b.stagioni - a.stagioni)
    .slice(0, 10)
    .map(a => ({ id: a.id, titolo: a.titolo, stagioni: a.stagioni }));

  res.json({
    total: anime.length,
    total_seasons: anime.reduce((sum, a) => sum + (a.stagioni || 0), 0),
    average_seasons: (anime.reduce((sum, a) => sum + (a.stagioni || 0), 0) / anime.length).toFixed(2),
    most_seasons: mostSeasons,
    by_country: getCountsByField(anime, 'paese'),
    top_genres: getTopGenres(anime),
    top_networks: getTopNetworks(anime)
  });
});

// Statistiche band
server.get('/stats/bands', (req, res) => {
  const db = router.db;
  const bands = db.get('bands').value();

  const mostAlbums = bands
    .filter(b => b.numero_album_pubblicati)
    .sort((a, b) => b.numero_album_pubblicati - a.numero_album_pubblicati)
    .slice(0, 10)
    .map(b => ({ id: b.id, band: b.band, numero_album_pubblicati: b.numero_album_pubblicati }));

  res.json({
    total: bands.length,
    active: bands.filter(b => b.periodo_attivita.includes('presente')).length,
    inactive: bands.filter(b => !b.periodo_attivita.includes('presente')).length,
    most_albums: mostAlbums,
    by_country: getCountsByField(bands, 'paese_origine'),
    top_genres: getTopGenres(bands)
  });
});

// Ricerca globale
server.get('/search', (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const db = router.db;
  const searchTerm = query.toLowerCase();

  const movies = db.get('movies').value().filter(m =>
    m.titolo.toLowerCase().includes(searchTerm) ||
    (m.regia && m.regia.toLowerCase().includes(searchTerm)) ||
    m.genere.some(g => g.toLowerCase().includes(searchTerm))
  );

  const tvSeries = db.get('tv_series').value().filter(s =>
    s.titolo.toLowerCase().includes(searchTerm) ||
    s.genere.some(g => g.toLowerCase().includes(searchTerm))
  );

  const anime = db.get('anime').value().filter(a =>
    a.titolo.toLowerCase().includes(searchTerm) ||
    a.genere.some(g => g.toLowerCase().includes(searchTerm))
  );

  const bands = db.get('bands').value().filter(b =>
    b.band.toLowerCase().includes(searchTerm) ||
    b.genere.some(g => g.toLowerCase().includes(searchTerm)) ||
    b.componenti.some(c => c.toLowerCase().includes(searchTerm))
  );

  res.json({
    query: query,
    results: {
      movies: movies,
      tv_series: tvSeries,
      anime: anime,
      bands: bands,
      total: movies.length + tvSeries.length + anime.length + bands.length
    }
  });
});

// ====================
// FUNZIONI HELPER
// ====================

function getCountsByField(items, field) {
  const counts = {};
  items.forEach(item => {
    const value = item[field];
    if (value) {
      counts[value] = (counts[value] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

function getTopGenres(items) {
  const genreCounts = {};
  items.forEach(item => {
    if (item.genere && Array.isArray(item.genere)) {
      item.genere.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  });
  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

function getTopNetworks(tvSeries) {
  const networkCounts = {};
  tvSeries.forEach(series => {
    if (series.network_streaming && Array.isArray(series.network_streaming)) {
      series.network_streaming.forEach(network => {
        networkCounts[network] = (networkCounts[network] || 0) + 1;
      });
    }
  });
  return Object.entries(networkCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

function getMoviesByDecade(movies) {
  const decades = {};
  movies.forEach(movie => {
    if (movie.anno) {
      const decade = Math.floor(movie.anno / 10) * 10;
      decades[`${decade}s`] = (decades[`${decade}s`] || 0) + 1;
    }
  });
  return decades;
}

// Usa il router JSON Server per le route standard
server.use(router);

// Avvia il server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         🎬 Entertainment API Server Running 🎵            ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  Server:      http://localhost:${PORT}                        ║`);
  console.log(`║  Docs:        http://localhost:${PORT}/                       ║`);
  console.log(`║  Movies:      http://localhost:${PORT}/movies                 ║`);
  console.log(`║  TV Series:   http://localhost:${PORT}/tv_series              ║`);
  console.log(`║  Bands:       http://localhost:${PORT}/bands                  ║`);
  console.log(`║  Statistics:  http://localhost:${PORT}/stats                  ║`);
  console.log(`║  Search:      http://localhost:${PORT}/search?q=query         ║`);
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📚 Dati caricati:');
  const db = router.db;
  console.log(`   - ${db.get('movies').value().length} film`);
  console.log(`   - ${db.get('tv_series').value().length} serie TV`);
  console.log(`   - ${db.get('bands').value().length} band musicali`);
  console.log('');
  console.log('🛑 Premi CTRL+C per fermare il server');
});
