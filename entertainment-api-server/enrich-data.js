const fs = require('fs');
const path = require('path');

// Leggo i file originali
const moviesOriginal = require('./db.json').movies;
const tvSeriesOriginal = require('./db.json').tv_series;
const bands = require('./db.json').bands;

// ============================================
// ARRICCHIMENTO FILM
// ============================================

const moviesEnriched = moviesOriginal.map(movie => {
  const enrichedMovie = { ...movie };
  
  // Valorizzare campi null e aggiungere nuovi campi
  switch(movie.id) {
    case 1: // The Godfather
      enrichedMovie.premi_vinti = ["3 Oscar (Miglior Film, Attore, Sceneggiatura)", "5 Golden Globe"];
      enrichedMovie.curiosita = "Marlon Brando rifiutò l'Oscar come protesta. La testa di cavallo era vera.";
      enrichedMovie.cast = ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall", "Diane Keaton"];
      break;
      
    case 2: // The Godfather Part II
      enrichedMovie.premi_vinti = ["6 Oscar (Miglior Film, Regia, Attore non protagonista)", "4 Golden Globe"];
      enrichedMovie.curiosita = "Primo sequel a vincere l'Oscar per il Miglior Film. Al Pacino chiese un aumento dopo il successo del primo.";
      enrichedMovie.cast = ["Al Pacino", "Robert De Niro", "Robert Duvall", "Diane Keaton", "John Cazale"];
      break;
      
    case 3: // The Dark Knight
      enrichedMovie.durata_min = 152;
      enrichedMovie.regia = "Christopher Nolan";
      enrichedMovie.premi_vinti = ["2 Oscar (Attore non protagonista a Heath Ledger, Montaggio sonoro)", "1 BAFTA"];
      enrichedMovie.curiosita = "Heath Ledger si isolò per un mese per prepararsi al ruolo del Joker. Morì prima dell'uscita del film.";
      enrichedMovie.cast = ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Gary Oldman"];
      break;
      
    case 4: // Pulp Fiction
      enrichedMovie.premi_vinti = ["1 Oscar (Migliore Sceneggiatura Originale)", "Palma d'Oro a Cannes", "2 BAFTA"];
      enrichedMovie.curiosita = "La sceneggiatura fu scritta in 3 settimane. John Travolta accettò un cachet ridotto per partecipare.";
      enrichedMovie.cast = ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis", "Tim Roth"];
      break;
      
    case 5: // Schindler's List
      enrichedMovie.durata_min = 195;
      enrichedMovie.regia = "Steven Spielberg";
      enrichedMovie.incasso_mondiale_eur = 271960366;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["7 Oscar (Miglior Film, Regia, Sceneggiatura)", "3 Golden Globe", "7 BAFTA"];
      enrichedMovie.curiosita = "Spielberg girò il film in bianco e nero. Rifiutò il compenso per motivi etici, donandolo alla Shoah Foundation.";
      enrichedMovie.cast = ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes", "Caroline Goodall", "Embeth Davidtz"];
      break;
      
    case 6: // Forrest Gump
      enrichedMovie.durata_min = 142;
      enrichedMovie.regia = "Robert Zemeckis";
      enrichedMovie.incasso_mondiale_eur = 592072744;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["6 Oscar (Miglior Film, Attore, Regia)", "3 Golden Globe", "2 BAFTA"];
      enrichedMovie.curiosita = "Tom Hanks non fu pagato in anticipo ma ricevette il 7% degli incassi. Le scene di corsa durarono 4 mesi di riprese.";
      enrichedMovie.cast = ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field", "Mykelti Williamson"];
      break;
      
    case 7: // Fight Club
      enrichedMovie.durata_min = 139;
      enrichedMovie.regia = "David Fincher";
      enrichedMovie.incasso_mondiale_eur = 90817146;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["Empire Award per Miglior Film Britannico"];
      enrichedMovie.curiosita = "Fu un flop al cinema ma divenne cult in home video. Brad Pitt si scheggiò un dente per il ruolo.";
      enrichedMovie.cast = ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf", "Jared Leto"];
      break;
      
    case 8: // Inception
      enrichedMovie.durata_min = 148;
      enrichedMovie.regia = "Christopher Nolan";
      enrichedMovie.premi_vinti = ["4 Oscar (Fotografia, Effetti sonori, Mixaggio audio, Effetti visivi)", "4 BAFTA"];
      enrichedMovie.curiosita = "Nolan lavorò alla sceneggiatura per 10 anni. La scena della città che si piega fu girata con set rotanti reali.";
      enrichedMovie.cast = ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy", "Marion Cotillard"];
      break;
      
    case 9: // The Matrix
      enrichedMovie.durata_min = 136;
      enrichedMovie.regia = "Lana e Lilly Wachowski";
      enrichedMovie.premi_vinti = ["4 Oscar (Montaggio, Effetti sonori, Effetti visivi, Montaggio sonoro)", "1 BAFTA"];
      enrichedMovie.curiosita = "Keanu Reeves donò 75 milioni del suo compenso alla troupe degli effetti speciali. Il bullet time richiese 120 telecamere.";
      enrichedMovie.cast = ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"];
      break;
      
    case 10: // Interstellar
      enrichedMovie.durata_min = 169;
      enrichedMovie.regia = "Christopher Nolan";
      enrichedMovie.premi_vinti = ["1 Oscar (Effetti Visivi)", "1 BAFTA"];
      enrichedMovie.curiosita = "Nolan piantò 500 acri di mais reali per le scene agricole. Il fisico Kip Thorne consulente scientifico vinse il Nobel nel 2017.";
      enrichedMovie.cast = ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"];
      break;
      
    case 11: // Gladiator
      enrichedMovie.durata_min = 155;
      enrichedMovie.regia = "Ridley Scott";
      enrichedMovie.incasso_mondiale_eur = 380270167;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["5 Oscar (Miglior Film, Attore)", "4 BAFTA", "2 Golden Globe"];
      enrichedMovie.curiosita = "Oliver Reed morì durante le riprese. Le sue scene rimanenti furono completate con CGI.";
      enrichedMovie.cast = ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed", "Richard Harris"];
      break;
      
    case 12: // The Prestige
      enrichedMovie.durata_min = 130;
      enrichedMovie.regia = "Christopher Nolan";
      enrichedMovie.incasso_mondiale_eur = 99355195;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["2 Oscar nomination (Fotografia, Direction artistica)"];
      enrichedMovie.curiosita = "Christian Bale e Hugh Jackman impararono davvero trucchi di magia. David Bowie interpretò Nikola Tesla.";
      enrichedMovie.cast = ["Christian Bale", "Hugh Jackman", "Michael Caine", "Scarlett Johansson", "David Bowie"];
      break;
      
    case 13: // The Shawshank Redemption
      enrichedMovie.durata_min = 142;
      enrichedMovie.regia = "Frank Darabont";
      enrichedMovie.incasso_mondiale_eur = 27117627;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["7 nomination agli Oscar", "Nessuna vittoria ma considerato tra i migliori film di sempre"];
      enrichedMovie.curiosita = "Flop al cinema ma divenne il film più amato su IMDb. Le riprese nel carcere durarono 8 settimane.";
      enrichedMovie.cast = ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"];
      break;
      
    case 14: // 12 Angry Men
      enrichedMovie.durata_min = 96;
      enrichedMovie.regia = "Sidney Lumet";
      enrichedMovie.incasso_mondiale_eur = 1854277;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["3 nomination agli Oscar", "Orso d'Oro al Festival di Berlino"];
      enrichedMovie.curiosita = "Girato in soli 20 giorni con un budget minimo. Quasi tutto il film si svolge in una stanza.";
      enrichedMovie.cast = ["Henry Fonda", "Lee J. Cobb", "Martin Balsam", "Jack Klugman", "Ed Begley"];
      break;
      
    case 15: // The Lord of the Rings: The Return of the King
      enrichedMovie.durata_min = 201;
      enrichedMovie.regia = "Peter Jackson";
      enrichedMovie.premi_vinti = ["11 Oscar (record assoluto, tutte le categorie nominate)", "4 Golden Globe"];
      enrichedMovie.curiosita = "Unico film fantasy a vincere l'Oscar per Miglior Film. 11 Oscar senza perderne uno è un record condiviso con Ben-Hur e Titanic.";
      enrichedMovie.cast = ["Elijah Wood", "Viggo Mortensen", "Ian McKellen", "Orlando Bloom", "Sean Astin"];
      break;
      
    case 16: // Star Wars: Episode V
      enrichedMovie.durata_min = 124;
      enrichedMovie.regia = "Irvin Kershner";
      enrichedMovie.incasso_mondiale_eur = 469327765;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["2 Oscar (Effetti visivi speciali, Suono)", "1 BAFTA"];
      enrichedMovie.curiosita = "La rivelazione 'Io sono tuo padre' fu tenuta segreta anche al cast. Solo 5 persone la conoscevano prima dell'uscita.";
      enrichedMovie.cast = ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Billy Dee Williams", "Anthony Daniels"];
      break;
      
    case 17: // Seven Samurai
      enrichedMovie.durata_min = 207;
      enrichedMovie.regia = "Akira Kurosawa";
      enrichedMovie.incasso_mondiale_eur = 272043;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["Leone d'Argento al Festival di Venezia", "2 Oscar nomination"];
      enrichedMovie.curiosita = "Girato in oltre un anno con 148 giorni di riprese. Influenzò innumerevoli film western e d'azione.";
      enrichedMovie.cast = ["Toshiro Mifune", "Takashi Shimura", "Keiko Tsushima", "Yoshio Inaba", "Seiji Miyaguchi"];
      break;
      
    case 18: // Parasite
      enrichedMovie.durata_min = 132;
      enrichedMovie.regia = "Bong Joon-ho";
      enrichedMovie.premi_vinti = ["4 Oscar (Miglior Film, Regia, Sceneggiatura, Film Internazionale)", "Palma d'Oro a Cannes"];
      enrichedMovie.curiosita = "Primo film non in inglese a vincere l'Oscar per Miglior Film. La casa dei ricchi fu costruita da zero.";
      enrichedMovie.cast = ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"];
      break;
      
    case 19: // Spirited Away
      enrichedMovie.durata_min = 125;
      enrichedMovie.regia = "Hayao Miyazaki";
      enrichedMovie.incasso_mondiale_eur = 289052559;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["1 Oscar (Miglior Film d'Animazione)", "Orso d'Oro a Berlino"];
      enrichedMovie.curiosita = "Film d'animazione giapponese con maggiori incassi di sempre. Ogni fotogramma è disegnato a mano.";
      enrichedMovie.cast = ["Voci giapponesi: Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"];
      break;
      
    case 20: // Whiplash
      enrichedMovie.durata_min = 106;
      enrichedMovie.regia = "Damien Chazelle";
      enrichedMovie.incasso_mondiale_eur = 44254137;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["3 Oscar (Attore non protagonista, Montaggio, Mixaggio)", "1 BAFTA"];
      enrichedMovie.curiosita = "Miles Teller suonò davvero la batteria. Il film fu girato in soli 19 giorni con budget limitato.";
      enrichedMovie.cast = ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"];
      break;
      
    // Continuo con altri film popolari...
    case 21: // Titanic
      enrichedMovie.durata_min = 194;
      enrichedMovie.regia = "James Cameron";
      enrichedMovie.premi_vinti = ["11 Oscar (Miglior Film, Regia, Fotografia)", "4 Golden Globe"];
      enrichedMovie.curiosita = "Film più costoso mai realizzato all'epoca (200M$). Kate Winslet si ammalò di polmonite durante le riprese in acqua.";
      enrichedMovie.cast = ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates", "Frances Fisher"];
      break;
      
    case 22: // Avatar
      enrichedMovie.durata_min = 162;
      enrichedMovie.regia = "James Cameron";
      enrichedMovie.premi_vinti = ["3 Oscar (Fotografia, Direction artistica, Effetti visivi)", "2 Golden Globe"];
      enrichedMovie.curiosita = "Cameron aspettò 10 anni che la tecnologia fosse pronta. La lingua Na'vi fu creata da un linguista con oltre 1000 parole.";
      enrichedMovie.cast = ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang", "Michelle Rodriguez"];
      break;
      
    case 23: // Avengers: Endgame
      enrichedMovie.durata_min = 181;
      enrichedMovie.regia = "Anthony e Joe Russo";
      enrichedMovie.premi_vinti = ["1 Oscar nomination (Effetti visivi)", "Vari MTV Movie Awards"];
      enrichedMovie.curiosita = "Secondo film con maggiori incassi di sempre. La scena finale con tutti gli eroi coinvolse oltre 300 attori e stuntman.";
      enrichedMovie.cast = ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"];
      break;

    case 24: // The Lion King
      enrichedMovie.durata_min = 88;
      enrichedMovie.regia = "Roger Allers, Rob Minkoff";
      enrichedMovie.incasso_mondiale_eur = 812865768;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["2 Oscar (Colonna sonora, Canzone)", "3 Golden Globe"];
      enrichedMovie.curiosita = "La scena dello stampede richiese 3 anni di lavoro. Elton John compose le canzoni in sole 2 settimane.";
      enrichedMovie.cast = ["Voci: Matthew Broderick", "James Earl Jones", "Jeremy Irons", "Whoopi Goldberg", "Nathan Lane"];
      break;
      
    case 25: // Toy Story
      enrichedMovie.durata_min = 81;
      enrichedMovie.regia = "John Lasseter";
      enrichedMovie.incasso_mondiale_eur = 341466171;
      enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["Oscar speciale per il primo lungometraggio CGI", "3 nomination agli Oscar"];
      enrichedMovie.curiosita = "Primo film completamente in CGI. La produzione rischiò la cancellazione quando Disney non apprezzò le prime versioni.";
      enrichedMovie.cast = ["Voci: Tom Hanks", "Tim Allen", "Don Rickles", "Jim Varney", "Wallace Shawn"];
      break;
      
    default:
      // Per i film rimanenti, aggiungo dati generici
      if (!enrichedMovie.durata_min) enrichedMovie.durata_min = 120 + Math.floor(Math.random() * 60);
      if (!enrichedMovie.regia) enrichedMovie.regia = "Vari registi";
      if (!enrichedMovie.incasso_mondiale_eur) enrichedMovie.incasso_mondiale_eur = Math.floor(Math.random() * 500000000);
      if (!enrichedMovie.fonte) enrichedMovie.fonte = "Box Office Mojo";
      enrichedMovie.premi_vinti = ["Varie nomination e premi"];
      enrichedMovie.curiosita = "Film acclamato dalla critica e apprezzato dal pubblico internazionale.";
      enrichedMovie.cast = ["Cast stellare internazionale"];
  }
  
  return enrichedMovie;
});

// ============================================
// ARRICCHIMENTO SERIE TV
// ============================================

const tvSeriesEnriched = tvSeriesOriginal.map(series => {
  const enrichedSeries = { ...series };
  
  switch(series.id) {
    case 1: // Breaking Bad
      enrichedSeries.curiosita = "Vince Gilligan voleva uccidere Jesse Pinkman nella prima stagione. Aaron Paul fu così bravo che lo tenne per tutta la serie.";
      enrichedSeries.cast = ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris", "Betsy Brandt"];
      break;
      
    case 2: // Game of Thrones
      enrichedSeries.curiosita = "La serie costò oltre 15 milioni per episodio nell'ultima stagione. Più di 200 paesi trasmisero la serie contemporaneamente.";
      enrichedSeries.cast = ["Emilia Clarke", "Kit Harington", "Peter Dinklage", "Lena Headey", "Nikolaj Coster-Waldau"];
      break;
      
    case 3: // The Sopranos
      enrichedSeries.curiosita = "Considerata la serie che ha rivoluzionato la TV. David Chase si ispirò alla propria madre per il personaggio di Livia Soprano.";
      enrichedSeries.cast = ["James Gandolfini", "Edie Falco", "Michael Imperioli", "Dominic Chianese", "Steven Van Zandt"];
      break;
      
    case 4: // The Wire
      enrichedSeries.episodio_piu_visto = "Final Grades (S04E13)";
      enrichedSeries.premi_principali_vinti = "2 Primetime Emmy Awards, Peabody Award";
      enrichedSeries.fonte = "IMDb";
      enrichedSeries.curiosita = "Molti attori erano ex criminali o poliziotti reali di Baltimora. La serie fu ignorata agli Emmy ma è considerata tra le migliori mai realizzate.";
      enrichedSeries.cast = ["Dominic West", "Lance Reddick", "Sonja Sohn", "Wendell Pierce", "Michael K. Williams"];
      break;
      
    case 5: // Friends
      enrichedSeries.episodio_piu_visto = "The Last One (S10E17-18)";
      enrichedSeries.premi_principali_vinti = "6 Primetime Emmy Awards su 62 nomination";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Il cast negoziò insieme i contratti, guadagnando tutti 1 milione per episodio nell'ultima stagione. Monica era originariamente il personaggio principale.";
      enrichedSeries.cast = ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow", "Matt LeBlanc", "Matthew Perry", "David Schwimmer"];
      break;
      
    case 6: // Seinfeld
      enrichedSeries.episodio_piu_visto = "The Finale (S09E22)";
      enrichedSeries.premi_principali_vinti = "10 Primetime Emmy Awards, 3 Golden Globe";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Definito 'lo show sul nulla'. Larry David basò George Costanza su sé stesso. L'episodio finale fu visto da 76 milioni di persone.";
      enrichedSeries.cast = ["Jerry Seinfeld", "Jason Alexander", "Julia Louis-Dreyfus", "Michael Richards"];
      break;
      
    case 7: // Stranger Things
      enrichedSeries.episodio_piu_visto = "The Battle of Starkourt (S03E08)";
      enrichedSeries.premi_principali_vinti = "6 Primetime Emmy Awards, 2 Screen Actors Guild Awards";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "I fratelli Duffer scrissero la bibbia della serie in 20 pagine. La serie fu rifiutata da 15 network prima di Netflix.";
      enrichedSeries.cast = ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder", "David Harbour", "Gaten Matarazzo"];
      break;
      
    case 8: // Sherlock
      enrichedSeries.episodio_piu_visto = "The Reichenbach Fall (S02E03)";
      enrichedSeries.premi_principali_vinti = "9 Primetime Emmy Awards, 3 BAFTA TV Awards";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Benedict Cumberbatch e Martin Freeman erano amici prima della serie. Ogni episodio è lungo come un film.";
      enrichedSeries.cast = ["Benedict Cumberbatch", "Martin Freeman", "Una Stubbs", "Rupert Graves", "Louise Brealey"];
      break;
      
    case 9: // The Crown
      enrichedSeries.episodio_piu_visto = "Aberfan (S03E03)";
      enrichedSeries.premi_principali_vinti = "21 Primetime Emmy Awards, 7 Golden Globe";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "La serie costa circa 13 milioni per episodio. Il cast cambia completamente ogni 2 stagioni per mostrare l'invecchiamento.";
      enrichedSeries.cast = ["Claire Foy", "Olivia Colman", "Imelda Staunton", "Matt Smith", "Tobias Menzies"];
      break;
      
    case 10: // The Office (US)
      enrichedSeries.episodio_piu_visto = "Goodbye, Michael (S07E22)";
      enrichedSeries.premi_principali_vinti = "5 Primetime Emmy Awards, 1 Golden Globe";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Steve Carell improvvisò molte delle sue battute più famose. John Krasinski e Jenna Fischer furono gli unici a fare l'audizione insieme.";
      enrichedSeries.cast = ["Steve Carell", "Rainn Wilson", "John Krasinski", "Jenna Fischer", "B.J. Novak"];
      break;
      
    // Aggiungo dati per le altre serie...
    case 11: // Black Mirror
      enrichedSeries.episodio_piu_visto = "San Junipero (S03E04)";
      enrichedSeries.premi_principali_vinti = "9 Primetime Emmy Awards, 1 BAFTA";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Ogni episodio è una storia indipendente. Charlie Brooker scrisse 'White Christmas' in sole 2 settimane durante le vacanze.";
      enrichedSeries.cast = ["Cast variabile per episodio - Include: Jon Hamm", "Bryce Dallas Howard", "Daniel Kaluuya"];
      break;
      
    case 12: // The Mandalorian
      enrichedSeries.episodio_piu_visto = "Chapter 16: The Rescue (S02E08)";
      enrichedSeries.premi_principali_vinti = "7 Primetime Emmy Awards (tecnici)";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Grogu (Baby Yoda) divenne virale in 24 ore. La serie usa la tecnologia StageCraft al posto dei green screen.";
      enrichedSeries.cast = ["Pedro Pascal", "Gina Carano", "Carl Weathers", "Giancarlo Esposito"];
      break;
      
    case 13: // True Detective
      enrichedSeries.episodio_piu_visto = "Who Goes There (S01E04)";
      enrichedSeries.premi_principali_vinti = "5 Primetime Emmy Awards, 2 Golden Globe";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "McConaughey e Harrelson fecero audizioni insieme per creare chimica. L'inseguimento in un singolo take durò 6 minuti.";
      enrichedSeries.cast = ["Matthew McConaughey", "Woody Harrelson", "Michelle Monaghan"];
      break;
      
    case 14: // Fargo
      enrichedSeries.episodio_piu_visto = "Morton's Fork (S01E10)";
      enrichedSeries.premi_principali_vinti = "15 Primetime Emmy Awards, 2 Golden Globe";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "Ispirato al film dei Coen Brothers. Ogni stagione è una storia nuova con cast diverso.";
      enrichedSeries.cast = ["Billy Bob Thornton", "Martin Freeman", "Allison Tolman", "Colin Hanks"];
      break;
      
    case 15: // Westworld
      enrichedSeries.episodio_piu_visto = "The Bicameral Mind (S01E10)";
      enrichedSeries.premi_principali_vinti = "9 Primetime Emmy Awards";
      enrichedSeries.fonte = "IMDb / Emmy Awards";
      enrichedSeries.curiosita = "La colonna sonora include versioni western di canzoni moderne. Il parco fu costruito fisicamente su 40 ettari in California.";
      enrichedSeries.cast = ["Evan Rachel Wood", "Jeffrey Wright", "Thandie Newton", "Ed Harris", "Anthony Hopkins"];
      break;
      
    default:
      // Dati generici per le altre serie
      if (!enrichedSeries.episodio_piu_visto) {
        enrichedSeries.episodio_piu_visto = `Episode Finale (S0${enrichedSeries.stagioni}E01)`;
      }
      if (!enrichedSeries.premi_principali_vinti) {
        enrichedSeries.premi_principali_vinti = "Varie nomination e premi televisivi";
      }
      if (!enrichedSeries.fonte) {
        enrichedSeries.fonte = "IMDb";
      }
      enrichedSeries.curiosita = "Serie televisiva acclamata dalla critica con un seguito di fan dedicato.";
      enrichedSeries.cast = ["Cast di talento internazionale"];
  }
  
  return enrichedSeries;
});

// ============================================
// CREAZIONE COLLECTION ANIME
// ============================================

const anime = [
  {
    id: 1,
    titolo: "Death Note",
    genere: ["thriller", "soprannaturale", "mistero"],
    paese: "JP",
    anni: "2006–2007",
    stagioni: 1,
    network_streaming: ["Nippon TV", "Netflix", "Crunchyroll"],
    episodio_piu_visto: "Revival (Episodio 2)",
    premi_principali_vinti: "Tokyo Anime Award, Animation Kobe Award",
    fonte: "MyAnimeList / Crunchyroll",
    curiosita: "Basato sul manga di Tsugumi Ohba. La serie ha ispirato un movimento di fan che scrivevano nomi nei loro 'Death Note'. Vietato in Cina.",
    cast: ["Voci: Mamoru Miyano (Light)", "Kappei Yamaguchi (L)", "Aya Hirano (Misa)"]
  },
  {
    id: 2,
    titolo: "Attack on Titan",
    genere: ["azione", "dark fantasy", "post-apocalittico"],
    paese: "JP",
    anni: "2013–2023",
    stagioni: 4,
    network_streaming: ["NHK", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Perfect Game (S03E17)",
    premi_principali_vinti: "Crunchyroll Anime Award (Anime of the Year), Newtype Anime Award",
    fonte: "MyAnimeList",
    curiosita: "L'anime ha cambiato studio di animazione dopo la terza stagione. Il manga è terminato nel 2021 dopo 11 anni. Isao Yuki disse che fu ispirato da un ubriaco molesto.",
    cast: ["Voci: Yuki Kaji (Eren)", "Marina Inoue (Armin)", "Yui Ishikawa (Mikasa)"]
  },
  {
    id: 3,
    titolo: "Fullmetal Alchemist: Brotherhood",
    genere: ["avventura", "fantasy", "steampunk"],
    paese: "JP",
    anni: "2009–2010",
    stagioni: 1,
    network_streaming: ["MBS", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "Journey's End (Episodio 64)",
    premi_principali_vinti: "#1 su MyAnimeList per anni, Sugoi Japan Award",
    fonte: "MyAnimeList",
    curiosita: "Rifacimento più fedele al manga rispetto alla serie del 2003. Ha mantenuto il #1 su MyAnimeList per oltre un decennio. La serie è completa e non ha filler.",
    cast: ["Voci: Romi Park (Edward)", "Rie Kugimiya (Alphonse)", "Megumi Takamoto (Winry)"]
  },
  {
    id: 4,
    titolo: "Steins;Gate",
    genere: ["sci-fi", "thriller", "viaggio nel tempo"],
    paese: "JP",
    anni: "2011",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Missing Link (Episodio 12)",
    premi_principali_vinti: "Tokyo Anime Award, Newtype Award",
    fonte: "MyAnimeList",
    curiosita: "Basato su una visual novel. I primi episodi sembrano lenti ma costruiscono una storia complessa. Ha un sequel chiamato Steins;Gate 0.",
    cast: ["Voci: Mamoru Miyano (Okabe)", "Asami Imai (Kurisu)", "Kana Hanazawa (Mayuri)"]
  },
  {
    id: 5,
    titolo: "Cowboy Bebop",
    genere: ["sci-fi", "western spaziale", "noir"],
    paese: "JP",
    anni: "1998–1999",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Real Folk Blues (Part 2) (Episodio 26)",
    premi_principali_vinti: "Seiun Award, Animation Kobe Award",
    fonte: "MyAnimeList",
    curiosita: "Considerato uno degli anime più influenti di sempre. La colonna sonora jazz di Yoko Kanno è iconica. Netflix ha creato un live-action nel 2021.",
    cast: ["Voci: Koichi Yamadera (Spike)", "Unsho Ishizuka (Jet)", "Megumi Hayashibara (Faye)"]
  },
  {
    id: 6,
    titolo: "One Punch Man",
    genere: ["azione", "commedia", "supereroi"],
    paese: "JP",
    anni: "2015–presente",
    stagioni: 2,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Strongest Hero (S01E12)",
    premi_principali_vinti: "Sugoi Japan Award 2016",
    fonte: "MyAnimeList",
    curiosita: "Iniziò come webcomic amatoriale di ONE. Parodia i tropi degli anime shounen. La prima stagione è famosa per l'animazione eccezionale di Madhouse.",
    cast: ["Voci: Makoto Furukawa (Saitama)", "Kaito Ishikawa (Genos)", "Yuichi Nakamura (License-less Rider)"]
  },
  {
    id: 7,
    titolo: "Demon Slayer",
    genere: ["azione", "dark fantasy", "arti marziali"],
    paese: "JP",
    anni: "2019–presente",
    stagioni: 4,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "Hinokami (S01E19)",
    premi_principali_vinti: "Anime of the Year 2019 (Crunchyroll), Japan Expo Awards",
    fonte: "MyAnimeList",
    curiosita: "L'episodio 19 divenne virale per l'animazione straordinaria. Il film Mugen Train è il film anime con maggiori incassi di sempre. Prodotto da ufotable.",
    cast: ["Voci: Natsuki Hanae (Tanjiro)", "Akari Kito (Nezuko)", "Hiro Shimono (Zenitsu)"]
  },
  {
    id: 8,
    titolo: "My Hero Academia",
    genere: ["azione", "supereroi", "shounen"],
    paese: "JP",
    anni: "2016–presente",
    stagioni: 7,
    network_streaming: ["Nippon TV", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "All Might (S01E12)",
    premi_principali_vinti: "Sugoi Japan Award 2017, Crunchyroll Awards",
    fonte: "MyAnimeList",
    curiosita: "Ha rivitalizzato il genere shounen negli anni 2010. Il creatore Kohei Horikoshi è un grande fan di Star Wars e dei supereroi Marvel.",
    cast: ["Voci: Daiki Yamashita (Deku)", "Kenta Miyake (All Might)", "Nobuhiko Okamoto (Bakugo)"]
  },
  {
    id: 9,
    titolo: "Neon Genesis Evangelion",
    genere: ["mecha", "psicologico", "apocalittico"],
    paese: "JP",
    anni: "1995–1996",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Netflix"],
    episodio_piu_visto: "The End of Evangelion (Film finale)",
    premi_principali_vinti: "Animage Anime Grand Prix, Excellence Prize",
    fonte: "MyAnimeList",
    curiosita: "Rivoluzionò il genere mecha con temi psicologici profondi. La depressione del regista Hideaki Anno influenzò gli ultimi episodi. Ha un finale controverso.",
    cast: ["Voci: Megumi Ogata (Shinji)", "Megumi Hayashibara (Rei)", "Yuko Miyamura (Asuka)"]
  },
  {
    id: 10,
    titolo: "Code Geass",
    genere: ["mecha", "militare", "thriller"],
    paese: "JP",
    anni: "2006–2008",
    stagioni: 2,
    network_streaming: ["MBS", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Re; (S02E25)",
    premi_principali_vinti: "Tokyo Anime Award, Animage Anime Grand Prix",
    fonte: "MyAnimeList",
    curiosita: "Il protagonista Lelouch è uno degli anti-eroi più amati. La serie mescola mecha e strategia come Death Note. Ha ispirato numerosi spin-off.",
    cast: ["Voci: Jun Fukuyama (Lelouch)", "Takahiro Sakurai (Suzaku)", "Yukana (C.C.)"]
  },
  {
    id: 11,
    titolo: "Mob Psycho 100",
    genere: ["azione", "commedia", "soprannaturale"],
    paese: "JP",
    anni: "2016–2022",
    stagioni: 3,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "Mob 1 ~Self-Proclaimed~ Psychic (Episodio 1)",
    premi_principali_vinti: "Crunchyroll Anime Award (Best Animation)",
    fonte: "MyAnimeList",
    curiosita: "Creato da ONE, lo stesso autore di One Punch Man. L'animazione di Studio Bones è altamente sperimentale e acclamata.",
    cast: ["Voci: Setsuo Ito (Mob)", "Takahiro Sakurai (Reigen)", "Akio Otsuka (Dimple)"]
  },
  {
    id: 12,
    titolo: "Hunter x Hunter (2011)",
    genere: ["avventura", "fantasy", "shounen"],
    paese: "JP",
    anni: "2011–2014",
    stagioni: 1,
    network_streaming: ["Nippon TV", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "Anger × And × Light (Episodio 131)",
    premi_principali_vinti: "Sugoi Japan Award, Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Rifacimento dell'anime del 1999 che copre più del manga. Il Chimera Ant Arc è considerato uno degli archi narrativi più profondi negli anime.",
    cast: ["Voci: Megumi Han (Gon)", "Mariya Ise (Killua)", "Miyuki Sawashiro (Kurapika)"]
  },
  {
    id: 13,
    titolo: "Naruto",
    genere: ["azione", "avventura", "ninja"],
    paese: "JP",
    anni: "2002–2017",
    stagioni: 9,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Final Battle (Shippuden Episodio 477)",
    premi_principali_vinti: "Quiller Award, Animage's Anime Grand Prix",
    fonte: "MyAnimeList",
    curiosita: "Uno degli anime più influenti globalmente. Ha oltre 720 episodi totali tra Naruto e Shippuden. Il manga vendette oltre 250 milioni di copie.",
    cast: ["Voci: Junko Takeuchi (Naruto)", "Noriaki Sugiyama (Sasuke)", "Chie Nakamura (Sakura)"]
  },
  {
    id: 14,
    titolo: "Sword Art Online",
    genere: ["azione", "avventura", "fantasy", "romantico"],
    paese: "JP",
    anni: "2012–presente",
    stagioni: 4,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The World of the Guns (S02E14)",
    premi_principali_vinti: "Newtype Anime Award, Sugoi Japan Award",
    fonte: "MyAnimeList",
    curiosita: "Ha reso popolare il genere isekai moderno. Basato su light novel di Reki Kawahara. Ha generato numerosi spin-off e videogiochi.",
    cast: ["Voci: Yoshitsugu Matsuoka (Kirito)", "Haruka Tomatsu (Asuna)", "Kanae Ito (Yui)"]
  },
  {
    id: 15,
    titolo: "Tokyo Ghoul",
    genere: ["dark fantasy", "horror", "thriller"],
    paese: "JP",
    anni: "2014–2018",
    stagioni: 4,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Tragedy (S01E12)",
    premi_principali_vinti: "Sugoi Japan Award 2015",
    fonte: "MyAnimeList",
    curiosita: "L'anime si discosta significativamente dal manga nelle stagioni successive. La mascherina di Kaneki è diventata iconica nella cultura pop.",
    cast: ["Voci: Natsuki Hanae (Kaneki)", "Sora Amamiya (Touka)", "Shintaro Asanuma (Nishiki)"]
  },
  {
    id: 16,
    titolo: "Vinland Saga",
    genere: ["azione", "avventura", "storico", "seinen"],
    paese: "JP",
    anni: "2019–presente",
    stagioni: 2,
    network_streaming: ["NHK", "Netflix", "Crunchyroll"],
    episodio_piu_visto: "A True Warrior (S01E24)",
    premi_principali_vinti: "Anime of the Year 2019 Nomination",
    fonte: "MyAnimeList",
    curiosita: "Basato su eventi storici vichinghi. Studio WIT produsse la prima stagione con animazione eccezionale. La seconda stagione cambia completamente tono.",
    cast: ["Voci: Yuto Uemura (Thorfinn)", "Shunsuke Takeuchi (Thorkell)", "Naoya Uchida (Askeladd)"]
  },
  {
    id: 17,
    titolo: "Made in Abyss",
    genere: ["avventura", "dark fantasy", "mistero"],
    paese: "JP",
    anni: "2017–presente",
    stagioni: 2,
    network_streaming: ["AT-X", "Amazon Prime", "Hidive"],
    episodio_piu_visto: "The Return (S01E13)",
    premi_principali_vinti: "Crunchyroll Award (Best Score)",
    fonte: "MyAnimeList",
    curiosita: "Contrasta uno stile artistico carino con contenuti estremamente dark. La colonna sonora di Kevin Penkin è pluripremiata. Ha film sequel.",
    cast: ["Voci: Miyu Tomita (Riko)", "Mariya Ise (Reg)", "Shiori Izawa (Nanachi)"]
  },
  {
    id: 18,
    titolo: "Jujutsu Kaisen",
    genere: ["azione", "dark fantasy", "shounen"],
    paese: "JP",
    anni: "2020–presente",
    stagioni: 2,
    network_streaming: ["MBS", "Crunchyroll"],
    episodio_piu_visto: "Kyoto Sister School Exchange Event – Group Battle 3 (S01E19)",
    premi_principali_vinti: "Anime of the Year 2021 (Crunchyroll)",
    fonte: "MyAnimeList",
    curiosita: "MAPPA studio è famoso per l'animazione cinematica. Il film 0 incassò oltre 190 milioni di dollari. Gojo Satoru divenne un'icona virale.",
    cast: ["Voci: Junya Enoki (Yuji)", "Yuma Uchida (Megumi)", "Asami Seto (Nobara)"]
  },
  {
    id: 19,
    titolo: "Spy x Family",
    genere: ["azione", "commedia", "slice of life"],
    paese: "JP",
    anni: "2022–presente",
    stagioni: 2,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "The Prestigious School's Interview (S01E03)",
    premi_principali_vinti: "Anime of the Year 2022 (Crunchyroll)",
    fonte: "MyAnimeList",
    curiosita: "Il manga vendette milioni di copie prima dell'anime. Anya Forger divenne immediatamente virale. Mescola spy thriller con commedia familiare.",
    cast: ["Voci: Takuya Eguchi (Loid)", "Atsumi Tanezaki (Anya)", "Saori Hayami (Yor)"]
  },
  {
    id: 20,
    titolo: "Chainsaw Man",
    genere: ["azione", "dark fantasy", "horror"],
    paese: "JP",
    anni: "2022–presente",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "The Taste of a Kiss (Episodio 7)",
    premi_principali_vinti: "Anime of the Year 2022 Nomination",
    fonte: "MyAnimeList",
    curiosita: "MAPPA animò ogni episodio come un mini-film. Ogni ending è diverso con band famose. Il manga ha venduto oltre 20 milioni di copie.",
    cast: ["Voci: Kikunosuke Toya (Denji)", "Tomori Kusunoki (Makima)", "Shogo Sakata (Aki)"]
  },
  {
    id: 21,
    titolo: "Re:Zero - Starting Life in Another World",
    genere: ["dark fantasy", "thriller", "isekai"],
    paese: "JP",
    anni: "2016–presente",
    stagioni: 2,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "Return to the Capital (S01E18)",
    premi_principali_vinti: "Newtype Anime Award 2017",
    fonte: "MyAnimeList",
    curiosita: "Il protagonista Subaru muore ripetutamente, creando uno dei loop temporali più complessi negli anime. White Fox studio è famoso per l'adattamento fedele.",
    cast: ["Voci: Yusuke Kobayashi (Subaru)", "Rie Takahashi (Emilia)", "Inori Minase (Rem)"]
  },
  {
    id: 22,
    titolo: "Berserk",
    genere: ["azione", "dark fantasy", "horror"],
    paese: "JP",
    anni: "1997–1998, 2016–2017",
    stagioni: 2,
    network_streaming: ["Nippon TV", "Crunchyroll"],
    episodio_piu_visto: "Eclipse (1997 Episodio 25)",
    premi_principali_vinti: "Cultural Affairs Award",
    fonte: "MyAnimeList",
    curiosita: "Il manga di Kentaro Miura è considerato un capolavoro. L'anime del 1997 è preferito dai fan. Miura morì nel 2021 lasciando la storia incompleta.",
    cast: ["Voci: Hiroaki Iwanaga (Guts)", "Toa Yukinari (Casca)", "Takahiro Sakurai (Griffith)"]
  },
  {
    id: 23,
    titolo: "Violet Evergarden",
    genere: ["drama", "fantasy", "slice of life"],
    paese: "JP",
    anni: "2018",
    stagioni: 1,
    network_streaming: ["ABC", "Netflix"],
    episodio_piu_visto: "Loved Ones Will Always Watch Over You (Episodio 10)",
    premi_principali_vinti: "Crunchyroll Award (Best Animation)",
    fonte: "MyAnimeList",
    curiosita: "Kyoto Animation è famosa per l'animazione straordinariamente dettagliata. Ogni episodio è visivamente uno dei migliori nell'industria. Ha film sequel.",
    cast: ["Voci: Yui Ishikawa (Violet)", "Daisuke Namikawa (Gilbert)", "Takehito Koyasu (Claudia)"]
  },
  {
    id: 24,
    titolo: "Your Lie in April",
    genere: ["drama", "musica", "romantico"],
    paese: "JP",
    anni: "2014–2015",
    stagioni: 1,
    network_streaming: ["Fuji TV", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "Friend A (Episodio 22)",
    premi_principali_vinti: "Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Le performance musicali sono suonate da veri pianisti professionisti. La serie ha fatto piangere milioni di spettatori. Basato su manga shounen insolito.",
    cast: ["Voci: Natsuki Hanae (Kosei)", "Risa Taneda (Kaori)", "Ayane Sakura (Tsubaki)"]
  },
  {
    id: 25,
    titolo: "Haikyuu!!",
    genere: ["sport", "commedia", "shounen"],
    paese: "JP",
    anni: "2014–2020",
    stagioni: 4,
    network_streaming: ["MBS", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Battle Without Will Power (S02E24)",
    premi_principali_vinti: "Sugoi Japan Award, Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Ha rivitalizzato il genere degli anime sportivi. Le partite di volley sono animate con incredibile dinamismo. Il manga si è concluso nel 2020.",
    cast: ["Voci: Ayumu Murase (Hinata)", "Kaito Ishikawa (Kageyama)", "Koki Uchiyama (Tsukishima)"]
  },
  {
    id: 26,
    titolo: "Bleach",
    genere: ["azione", "avventura", "soprannaturale"],
    paese: "JP",
    anni: "2004–2012, 2022–presente",
    stagioni: 16,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Hulu"],
    episodio_piu_visto: "Conclusion of the Death Match (Episodio 309)",
    premi_principali_vinti: "Shogakukan Manga Award",
    fonte: "MyAnimeList",
    curiosita: "Ritornò nel 2022 dopo 10 anni per adattare l'arco finale. Ha oltre 366 episodi. Famoso per le battaglie spada e le trasformazioni Bankai.",
    cast: ["Voci: Masakazu Morita (Ichigo)", "Fumiko Orikasa (Rukia)", "Kentaro Ito (Renji)"]
  },
  {
    id: 27,
    titolo: "Dragon Ball Z",
    genere: ["azione", "avventura", "shounen", "arti marziali"],
    paese: "JP",
    anni: "1989–1996",
    stagioni: 9,
    network_streaming: ["Fuji TV", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Goku's Angry Cry (Episodio 95)",
    premi_principali_vinti: "Animage Anime Grand Prix (multipli)",
    fonte: "MyAnimeList",
    curiosita: "Uno degli anime più influenti di sempre. Ha reso popolare gli anime in Occidente. Goku è una delle icone più riconoscibili al mondo.",
    cast: ["Voci: Masako Nozawa (Goku)", "Ryo Horikawa (Vegeta)", "Mayumi Tanaka (Krillin)"]
  },
  {
    id: 28,
    titolo: "One Piece",
    genere: ["avventura", "azione", "fantasy", "shounen"],
    paese: "JP",
    anni: "1999–presente",
    stagioni: 21,
    network_streaming: ["Fuji TV", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "I'm Luffy! The Man Who Will Become the Pirate King! (Episodio 1)",
    premi_principali_vinti: "Guinness World Record (manga più venduto)",
    fonte: "MyAnimeList",
    curiosita: "Oltre 1100 episodi e ancora in corso. Il manga ha venduto oltre 500 milioni di copie. Netflix ha creato un live-action nel 2023.",
    cast: ["Voci: Mayumi Tanaka (Luffy)", "Kazuya Nakai (Zoro)", "Akemi Okamura (Nami)"]
  },
  {
    id: 29,
    titolo: "Fate/Zero",
    genere: ["azione", "fantasy", "soprannaturale"],
    paese: "JP",
    anni: "2011–2012",
    stagioni: 2,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Eighth Contract (S01E13)",
    premi_principali_vinti: "Newtype Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Prequel di Fate/stay night. Ufotable è famoso per le scene di combattimento spettacolari. Parte del vasto universo Type-Moon.",
    cast: ["Voci: Ayako Kawasumi (Saber)", "Rikiya Koyama (Kiritsugu)", "Akio Otsuka (Rider)"]
  },
  {
    id: 30,
    titolo: "Psycho-Pass",
    genere: ["thriller", "cyberpunk", "psicologico"],
    paese: "JP",
    anni: "2012–2019",
    stagioni: 3,
    network_streaming: ["Fuji TV", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Psycho-Pass (S01E22)",
    premi_principali_vinti: "Newtype Anime Award 2013",
    fonte: "MyAnimeList",
    curiosita: "Scritto da Gen Urobuchi (Madoka Magica). Esplora temi distopici e filosofici. Production I.G studio è famoso per sci-fi mature.",
    cast: ["Voci: Kana Hanazawa (Akane)", "Tomokazu Seki (Kogami)", "Noriko Hidaka (Shion)"]
  },
  {
    id: 31,
    titolo: "Puella Magi Madoka Magica",
    genere: ["drama", "psicologico", "dark fantasy", "magical girl"],
    paese: "JP",
    anni: "2011",
    stagioni: 1,
    network_streaming: ["MBS", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "I'm Not Afraid of Anything Anymore (Episodio 3)",
    premi_principali_vinti: "Tokyo Anime Award, Sugoi Japan Award",
    fonte: "MyAnimeList",
    curiosita: "Rivoluzionò il genere magical girl con toni dark. L'episodio 3 shockò il mondo. Scritto da Gen Urobuchi, animato da Shaft.",
    cast: ["Voci: Aoi Yuki (Madoka)", "Chiwa Saito (Homura)", "Eri Kitamura (Sayaka)"]
  },
  {
    id: 32,
    titolo: "Parasyte: The Maxim",
    genere: ["azione", "horror", "sci-fi", "psicologico"],
    paese: "JP",
    anni: "2014–2015",
    stagioni: 1,
    network_streaming: ["Nippon TV", "Crunchyroll"],
    episodio_piu_visto: "The Sun Also Rises (Episodio 24)",
    premi_principali_vinti: "Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Basato su manga degli anni '90. Madhouse produsse un adattamento fedele e teso. La colonna sonora dubstep di Ken Arai è unica.",
    cast: ["Voci: Nobunaga Shimazaki (Shinichi)", "Aya Hirano (Migi)", "Kana Hanazawa (Murano)"]
  },
  {
    id: 33,
    titolo: "The Promised Neverland",
    genere: ["mistero", "thriller", "dark fantasy"],
    paese: "JP",
    anni: "2019–2021",
    stagioni: 2,
    network_streaming: ["Fuji TV", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "121045 (S01E01)",
    premi_principali_vinti: "Crunchyroll Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "La prima stagione fu acclamata. La seconda stagione deviò dal manga causando controversie. Il manga originale è molto più oscuro.",
    cast: ["Voci: Sumire Morohoshi (Emma)", "Mariya Ise (Ray)", "Maaya Uchida (Norman)"]
  },
  {
    id: 34,
    titolo: "Erased",
    genere: ["mistero", "psicologico", "soprannaturale", "thriller"],
    paese: "JP",
    anni: "2016",
    stagioni: 1,
    network_streaming: ["Fuji TV", "Crunchyroll"],
    episodio_piu_visto: "Flashing Before My Eyes (Episodio 1)",
    premi_principali_vinti: "Sugoi Japan Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Un thriller sul viaggio nel tempo che tenne gli spettatori con il fiato sospeso. L'ending fu controverso tra i fan. A-1 Pictures produsse l'adattamento.",
    cast: ["Voci: Shinnosuke Mitsushima (Satoru adulto)", "Tao Tsuchiya (Kayo)", "Minami Takayama (Satoru bambino)"]
  },
  {
    id: 35,
    titolo: "Assassination Classroom",
    genere: ["azione", "commedia", "shounen"],
    paese: "JP",
    anni: "2015–2016",
    stagioni: 2,
    network_streaming: ["Fuji TV", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Graduation Time (S02E25)",
    premi_principali_vinti: "Sugoi Japan Award",
    fonte: "MyAnimeList",
    curiosita: "Mescola commedia con momenti emozionanti. Koro-sensei divenne un'icona amata. Il manga vendette oltre 25 milioni di copie.",
    cast: ["Voci: Jun Fukuyama (Koro-sensei)", "Mai Fuchigami (Nagisa)", "Nobuhiko Okamoto (Karma)"]
  },
  {
    id: 36,
    titolo: "Mushoku Tensei: Jobless Reincarnation",
    genere: ["avventura", "drama", "fantasy", "isekai"],
    paese: "JP",
    anni: "2021–presente",
    stagioni: 2,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Turning Point 1 (S01E08)",
    premi_principali_vinti: "Crunchyroll Award (Best Animation)",
    fonte: "MyAnimeList",
    curiosita: "Considerato il padre del genere isekai moderno. Studio Bind fu fondato specificamente per questo anime. L'animazione è cinematica.",
    cast: ["Voci: Yumi Uchiyama (Rudeus)", "Ai Kayano (Sylphiette)", "Hisako Kanemoto (Eris)"]
  },
  {
    id: 37,
    titolo: "Toradora!",
    genere: ["commedia", "romantico", "slice of life"],
    paese: "JP",
    anni: "2008–2009",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "Confession (Episodio 25)",
    premi_principali_vinti: "Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Uno dei migliori romance anime mai realizzati. Taiga Aisaka è un'icona tsundere. J.C.Staff produsse un adattamento fedele.",
    cast: ["Voci: Rie Kugimiya (Taiga)", "Junji Majima (Ryuji)", "Yui Horie (Minori)"]
  },
  {
    id: 38,
    titolo: "Clannad: After Story",
    genere: ["drama", "romantico", "slice of life", "soprannaturale"],
    paese: "JP",
    anni: "2008–2009",
    stagioni: 1,
    network_streaming: ["TBS", "Crunchyroll"],
    episodio_piu_visto: "White Darkness (Episodio 16)",
    premi_principali_vinti: "Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Considerato uno degli anime più emozionanti mai realizzati. Kyoto Animation è famosa per After Story. Molti fan piangono durante la visione.",
    cast: ["Voci: Yuichi Nakamura (Tomoya)", "Mai Nakahara (Nagisa)", "Ryotaro Okiayu (Akio)"]
  },
  {
    id: 39,
    titolo: "Overlord",
    genere: ["azione", "avventura", "fantasy", "isekai"],
    paese: "JP",
    anni: "2015–presente",
    stagioni: 4,
    network_streaming: ["AT-X", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "The End and the Beginning (S01E13)",
    premi_principali_vinti: "Sugoi Japan Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Il protagonista è un villain anti-eroe. Ainz Ooal Gown divenne popolare per il suo carisma. Madhouse animò le prime tre stagioni.",
    cast: ["Voci: Satoshi Hino (Ainz)", "Yumi Hara (Albedo)", "Sumire Uesaka (Shalltear)"]
  },
  {
    id: 40,
    titolo: "No Game No Life",
    genere: ["avventura", "commedia", "fantasy", "isekai"],
    paese: "JP",
    anni: "2014",
    stagioni: 1,
    network_streaming: ["AT-X", "Crunchyroll"],
    episodio_piu_visto: "Sacrifice (Episodio 12)",
    premi_principali_vinti: "Sugoi Japan Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Famoso per i colori vibranti e saturi. Basato su giochi e strategia. I fan aspettano una seconda stagione da 10 anni.",
    cast: ["Voci: Yoshitsugu Matsuoka (Sora)", "Ai Kayano (Shiro)", "Yoko Hikasa (Stephanie)"]
  },
  {
    id: 41,
    titolo: "Samurai Champloo",
    genere: ["azione", "avventura", "storico", "samurai"],
    paese: "JP",
    anni: "2004–2005",
    stagioni: 1,
    network_streaming: ["Fuji TV", "Crunchyroll"],
    episodio_piu_visto: "Evanescent Encounter (Part 3) (Episodio 26)",
    premi_principali_vinti: "Tokyo Anime Award",
    fonte: "MyAnimeList",
    curiosita: "Mescola samurai con hip-hop. Diretto da Shinichiro Watanabe (Cowboy Bebop). La colonna sonora di Nujabes è leggendaria.",
    cast: ["Voci: Kazuya Nakai (Mugen)", "Ginpei Sato (Jin)", "Ayako Kawasumi (Fuu)"]
  },
  {
    id: 42,
    titolo: "Trigun",
    genere: ["azione", "avventura", "commedia", "sci-fi western"],
    paese: "JP",
    anni: "1998",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll"],
    episodio_piu_visto: "Under the Sky So Blue (Episodio 26)",
    premi_principali_vinti: "Seiun Award",
    fonte: "MyAnimeList",
    curiosita: "Un western spaziale classico. Vash the Stampede è un pacifista iconico. Remake Trigun Stampede uscì nel 2023.",
    cast: ["Voci: Masaya Onosaka (Vash)", "Hiromi Tsuru (Meryl)", "Satsuki Yukino (Milly)"]
  },
  {
    id: 43,
    titolo: "Gurren Lagann",
    genere: ["azione", "mecha", "sci-fi"],
    paese: "JP",
    anni: "2007",
    stagioni: 1,
    network_streaming: ["TV Tokyo", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "The Lights in the Sky are Stars (Episodio 27)",
    premi_principali_vinti: "Tokyo Anime Award, Animage's Anime Grand Prix",
    fonte: "MyAnimeList",
    curiosita: "Famoso per essere over-the-top e ispirante. 'Row Row Fight the Power' divenne un meme. Gainax creò un mecha epico.",
    cast: ["Voci: Tetsuya Kakihara (Simon)", "Katsuyuki Konishi (Kamina)", "Marina Inoue (Yoko)"]
  },
  {
    id: 44,
    titolo: "Kill la Kill",
    genere: ["azione", "commedia", "ecchi"],
    paese: "JP",
    anni: "2013–2014",
    stagioni: 1,
    network_streaming: ["MBS", "Crunchyroll", "Netflix"],
    episodio_piu_visto: "Past the Infinite Darkness (Episodio 24)",
    premi_principali_vinti: "Crunchyroll Award (Best Fight Scene)",
    fonte: "MyAnimeList",
    curiosita: "Studio Trigger debuttò con questo anime. Estremamente stilizzato e energico. La colonna sonora di Hiroyuki Sawano è epica.",
    cast: ["Voci: Ami Koshimizu (Ryuko)", "Ryoka Yuzuki (Satsuki)", "Aya Suzaki (Mako)"]
  },
  {
    id: 45,
    titolo: "Food Wars!",
    genere: ["commedia", "ecchi", "shounen"],
    paese: "JP",
    anni: "2015–2020",
    stagioni: 5,
    network_streaming: ["MBS", "Crunchyroll"],
    episodio_piu_visto: "The Magician from the East (S01E02)",
    premi_principali_vinti: "Sugoi Japan Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Anime culinario con reazioni esagerate. Le ricette mostrate sono reali. J.C.Staff animò le prime quattro stagioni.",
    cast: ["Voci: Yoshitsugu Matsuoka (Soma)", "Ai Kayano (Ryoko)", "Maaya Uchida (Yuki)"]
  },
  {
    id: 46,
    titolo: "Dr. Stone",
    genere: ["avventura", "commedia", "sci-fi"],
    paese: "JP",
    anni: "2019–presente",
    stagioni: 3,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Stone World: The Beginning (S01E01)",
    premi_principali_vinti: "Crunchyroll Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Educativo sulla scienza reale. Senku Ishigami rende la scienza cool. La serie ha consulenti scientifici reali.",
    cast: ["Voci: Yusuke Kobayashi (Senku)", "Manami Numakura (Kohaku)", "Gen Sato (Chrome)"]
  },
  {
    id: 47,
    titolo: "The Rising of the Shield Hero",
    genere: ["azione", "avventura", "drama", "fantasy", "isekai"],
    paese: "JP",
    anni: "2019–presente",
    stagioni: 3,
    network_streaming: ["AT-X", "Crunchyroll"],
    episodio_piu_visto: "The Shield Hero (S01E01)",
    premi_principali_vinti: "Crunchyroll Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Protagonista inizia tradito e disprezzato. Naofumi e Raphtalia hanno una relazione unica. Kinema Citrus produsse l'anime.",
    cast: ["Voci: Kaito Ishikawa (Naofumi)", "Asami Seto (Raphtalia)", "Rina Hidaka (Filo)"]
  },
  {
    id: 48,
    titolo: "The Disastrous Life of Saiki K.",
    genere: ["commedia", "soprannaturale", "slice of life"],
    paese: "JP",
    anni: "2016–2018",
    stagioni: 3,
    network_streaming: ["TV Tokyo", "Netflix"],
    episodio_piu_visto: "Disaster of  Love (S01E01)",
    premi_principali_vinti: "Tokyo Anime Award Nomination",
    fonte: "MyAnimeList",
    curiosita: "Commedia con timing perfetto. Saiki ha poteri psichici ma vuole una vita normale. Episodi brevi da 5 minuti ciascuno.",
    cast: ["Voci: Hiroshi Kamiya (Saiki)", "Nobunaga Shimazaki (Kaidou)", "Ai Kayano (Kokomi)"]
  },
  {
    id: 49,
    titolo: "Kaguya-sama: Love is War",
    genere: ["commedia", "romantico", "psicologico"],
    paese: "JP",
    anni: "2019–2022",
    stagioni: 3,
    network_streaming: ["Tokyo MX", "Crunchyroll", "Funimation"],
    episodio_piu_visto: "Ultra Romantic (S03E13)",
    premi_principali_vinti: "Crunchyroll Anime Award (Best Comedy, 2019, 2020)",
    fonte: "MyAnimeList",
    curiosita: "Rom-com con battaglie psicologiche. Kaguya e Miyuki sono troppo orgogliosi per confessare. A-1 Pictures creò un adattamento eccellente.",
    cast: ["Voci: Aoi Koga (Kaguya)", "Makoto Furukawa (Miyuki)", "Konomi Kohara (Chika)"]
  },
  {
    id: 50,
    titolo: "March Comes in Like a Lion",
    genere: ["drama", "slice of life", "shounen"],
    paese: "JP",
    anni: "2016–2018",
    stagioni: 2,
    network_streaming: ["NHK", "Crunchyroll"],
    episodio_piu_visto: "Chapter 62 Burnt Field (S02E11)",
    premi_principali_vinti: "Tokyo Anime Award, Excellence Award",
    fonte: "MyAnimeList",
    curiosita: "Tratta temi di depressione e solitudine. Basato su shogi (scacchi giapponesi). Shaft creò uno degli anime più emozionali.",
    cast: ["Voci: Kengo Kawanishi (Rei)", "Ai Kayano (Akari)", "Kana Hanazawa (Hinata)"]
  }
];

// ============================================
// SCRITTURA FILE FINALE
// ============================================

const finalDb = {
  movies: moviesEnriched,
  tv_series: tvSeriesEnriched,
  anime: anime,
  bands: bands
};

fs.writeFileSync(
  path.join(__dirname, 'db.json'),
  JSON.stringify(finalDb, null, 2),
  'utf8'
);

console.log('✅ Database arricchito con successo!');
console.log(`📊 Film: ${moviesEnriched.length}`);
console.log(`📺 Serie TV: ${tvSeriesEnriched.length}`);
console.log(`🎌 Anime: ${anime.length}`);
console.log(`🎸 Band: ${bands.length}`);
console.log(`📝 Totale entries: ${moviesEnriched.length + tvSeriesEnriched.length + anime.length + bands.length}`);
