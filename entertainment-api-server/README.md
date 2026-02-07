# 🎬 Entertainment API Server

API REST completa per gestire dati su film, serie TV e band musicali. Basata su JSON Server con funzionalità personalizzate.

## 📋 Contenuti

- **50 Film** (con dati su regia, incassi, durata, generi, cast, premi, curiosità)
- **50 Serie TV** (con stagioni, network, premi, cast, curiosità, episodio più visto)
- **50 Anime** (con stagioni, network, premi, cast, curiosità, episodio più visto)
- **50 Band Musicali** (con membri, discografia, premi)

## 🚀 Installazione e Avvio

### Prerequisiti
- Node.js (versione 14 o superiore)
- npm

### Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server
npm start

# Oppure in modalità sviluppo (con auto-reload)
npm run dev
```

Il server sarà disponibile su: **http://localhost:3000**

## 📖 Documentazione API

### Endpoint Principali

#### 🎬 Film (`/movies`)

**Lista tutti i film**
```
GET /movies
```

**Dettaglio singolo film**
```
GET /movies/:id
```

**Ricerca per titolo**
```
GET /movies?titolo_like=godfather
```

**Filtri disponibili**
```
GET /movies?anno=1972                          # Per anno
GET /movies?paese=US                           # Per paese
GET /movies?genere_like=drama                  # Per genere
GET /movies?is_anime=true                      # Solo anime
GET /movies?_sort=incasso_mondiale_eur&_order=desc  # Ordina per incasso
```

**Paginazione**
```
GET /movies?_page=1&_limit=10
```

#### 📺 Serie TV (`/tv_series`)

**Lista tutte le serie**
```
GET /tv_series
```

**Dettaglio singola serie**
```
GET /tv_series/:id
```

**Ricerca per titolo**
```
GET /tv_series?titolo_like=breaking
```

**Filtri disponibili**
```
GET /tv_series?paese=US                        # Per paese
GET /tv_series?genere_like=crime               # Per genere
GET /tv_series?network_streaming_like=HBO      # Per network
GET /tv_series?_sort=stagioni&_order=desc      # Ordina per numero stagioni
```

#### 🎌 Anime (`/anime`)

**Lista tutti gli anime**
```
GET /anime
```

**Dettaglio singolo anime**
```
GET /anime/:id
```

**Ricerca per titolo**
```
GET /anime?titolo_like=naruto
```

**Filtri disponibili**
```
GET /anime?paese=JP                            # Per paese
GET /anime?genere_like=azione                  # Per genere
GET /anime?network_streaming_like=Crunchyroll  # Per network
GET /anime?_sort=stagioni&_order=desc          # Ordina per numero stagioni
```

#### 🎵 Band (`/bands`)

**Lista tutte le band**
```
GET /bands
```

**Dettaglio singola band**
```
GET /bands/:id
```

**Ricerca per nome**
```
GET /bands?band_like=beatles
```

**Filtri disponibili**
```
GET /bands?paese_origine=UK                    # Per paese
GET /bands?genere_like=rock                    # Per genere
GET /bands?_sort=numero_album_pubblicati&_order=desc  # Ordina per album
```

### Endpoint Statistiche

#### Statistiche Generali
```
GET /stats
```
Ritorna statistiche aggregate su film, serie TV, anime e band.

#### Statistiche Film
```
GET /stats/movies
```
Ritorna:
- Totale film
- Film anime vs non-anime
- Top 10 per incasso
- Distribuzione per decade
- Distribuzione per paese
- Generi più popolari

#### Statistiche Serie TV
```
GET /stats/tv_series
```
Ritorna:
- Totale serie
- Numero totale e medio di stagioni
- Serie con più stagioni
- Distribuzione per paese
- Generi più popolari
- Network più utilizzati

#### Statistiche Anime
```
GET /stats/anime
```
Ritorna:
- Totale anime
- Numero totale e medio di stagioni
- Anime con più stagioni
- Distribuzione per paese
- Generi più popolari
- Network più utilizzati

#### Statistiche Band
```
GET /stats/bands
```
Ritorna:
- Totale band
- Band attive vs inattive
- Band con più album
- Distribuzione per paese
- Generi più popolari

### Ricerca Globale

```
GET /search?q=termine
```

Cerca simultaneamente in film, serie TV e band.

**Esempio:**
```
GET /search?q=godfather
```

## 🔍 Esempi di Query Complesse

### Combinare filtri multipli
```bash
# Film drammatici americani dopo il 2000, ordinati per incasso
GET /movies?genere_like=drama&paese=US&anno_gte=2000&_sort=incasso_mondiale_eur&_order=desc

# Serie crime di HBO con più di 5 stagioni
GET /tv_series?genere_like=crime&network_streaming_like=HBO&stagioni_gte=5

# Band rock britanniche ancora attive
GET /bands?genere_like=rock&paese_origine=UK
```

### Operatori di Query

JSON Server supporta vari operatori:

- `_gte` : maggiore o uguale
- `_lte` : minore o uguale
- `_ne` : diverso da
- `_like` : ricerca parziale (case insensitive)
- `_sort` : ordinamento
- `_order` : direzione (asc/desc)
- `_page` : numero pagina
- `_limit` : elementi per pagina

**Esempi:**
```
GET /movies?anno_gte=2010&anno_lte=2020           # Film dal 2010 al 2020
GET /tv_series?stagioni_gte=8                     # Serie con 8+ stagioni
GET /movies?durata_min_gte=180                    # Film lunghi (3h+)
```

## 📊 Struttura Dati

### Film
```json
{
  "id": 1,
  "titolo": "The Godfather",
  "anno": 1972,
  "paese": "US",
  "genere": ["drama", "crime"],
  "is_anime": false,
  "durata_min": 175,
  "regia": "Francis Ford Coppola",
  "incasso_mondiale_eur": 246120986,
  "fonte": "IMDb / Box Office Mojo"
}
```

### Serie TV
```json
{
  "id": 1,
  "titolo": "Breaking Bad",
  "genere": ["crime", "drama", "thriller"],
  "paese": "US",
  "anni": "2008–2013",
  "stagioni": 5,
  "network_streaming": ["AMC", "Netflix"],
  "episodio_piu_visto": "Felina (S05E16)",
  "premi_principali_vinti": "16 Primetime Emmy Awards",
  "fonte": "IMDb / Emmy Awards"
}
```

### Band
```json
{
  "id": 1,
  "band": "The Beatles",
  "genere": ["rock", "pop"],
  "paese_origine": "UK",
  "periodo_attivita": "1960–1970",
  "componenti": ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
  "etichette": ["Parlophone", "Capitol", "Apple"],
  "numero_album_pubblicati": 13,
  "premi_principali_vinti": "7 Grammy Awards, 15 Ivor Novello Awards",
  "curiosita": "Considerati la band più influente di tutti i tempi",
  "fonte": "Wikipedia / Grammy Awards"
}
```

## 🛠️ Operazioni CRUD

### Creare (POST)
```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "titolo": "Nuovo Film",
    "anno": 2024,
    "paese": "IT",
    "genere": ["commedia"]
  }'
```

### Aggiornare (PUT)
```bash
curl -X PUT http://localhost:3000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titolo": "The Godfather",
    "anno": 1972,
    "regia": "Francis Ford Coppola"
  }'
```

### Aggiornare parzialmente (PATCH)
```bash
curl -X PATCH http://localhost:3000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"durata_min": 175}'
```

### Eliminare (DELETE)
```bash
curl -X DELETE http://localhost:3000/movies/1
```

## 🌐 Uso da Browser / JavaScript

### Fetch API
```javascript
// Ottieni tutti i film
fetch('http://localhost:3000/movies')
  .then(response => response.json())
  .then(data => console.log(data));

// Cerca film per genere
fetch('http://localhost:3000/movies?genere_like=crime')
  .then(response => response.json())
  .then(data => console.log(data));

// Ricerca globale
fetch('http://localhost:3000/search?q=godfather')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Axios
```javascript
import axios from 'axios';

// Ottieni statistiche
const stats = await axios.get('http://localhost:3000/stats/movies');
console.log(stats.data);

// Cerca serie TV
const series = await axios.get('http://localhost:3000/tv_series', {
  params: {
    genere_like: 'drama',
    _sort: 'stagioni',
    _order: 'desc'
  }
});
console.log(series.data);
```

## 📁 File del Progetto

```
entertainment-api-server/
├── db.json                 # Database JSON
├── server.js               # Server Node.js con route personalizzate
├── create-db.js            # Script per generare il database
├── package.json            # Dipendenze del progetto
├── README.md              # Questa documentazione
├── movies_enriched.json   # Dati originali film
├── tv_series.json         # Dati originali serie TV
└── bands.json             # Dati originali band
```

## 🔧 Configurazione

### Cambiare Porta
Modifica la porta nel file `server.js` o usa una variabile d'ambiente:

```bash
PORT=4000 npm start
```

### CORS
Il server è configurato per accettare richieste da qualsiasi origine. Per modificare questo comportamento, edita la sezione CORS in `server.js`.

## 📝 Note

- I dati sono archiviati in `db.json` e vengono caricati all'avvio del server
- Le modifiche tramite POST/PUT/PATCH/DELETE sono persistite nel file
- Per resettare il database, rigenera `db.json` con `node create-db.js`

## 🤝 Contribuire

Per aggiungere nuovi dati:
1. Modifica i file JSON originali
2. Esegui `node create-db.js` per rigenerare il database
3. Riavvia il server

## 📄 Licenza

MIT

## 🆘 Supporto

Per problemi o domande:
- Controlla la documentazione API su http://localhost:3000/
- Verifica i log del server per eventuali errori
- Assicurati che tutte le dipendenze siano installate

---

**Buon divertimento con l'Entertainment API Server! 🎬📺🎵**
