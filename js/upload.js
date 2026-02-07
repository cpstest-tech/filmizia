document.addEventListener('DOMContentLoaded', () => {
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('admin-password');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordError = document.getElementById('password-error');

    if (sessionStorage.getItem('admin_password')) {
        passwordOverlay.style.display = 'none';
    }

    const verifyPassword = async () => {
        const password = passwordInput.value;

        try {
            const response = await fetch('http://localhost:3000/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: password })
            });

            if (response.ok) {
                sessionStorage.setItem('admin_password', password);

                passwordOverlay.style.opacity = '0';
                passwordOverlay.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    passwordOverlay.style.display = 'none';
                }, 500);
            } else {
                throw new Error();
            }
        } catch (error) {
            passwordError.style.display = 'block';
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
            passwordInput.value = '';
        }
    };

    unlockBtn.addEventListener('click', verifyPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyPassword();
    });

    const categorySelect = document.getElementById('category-select');
    const form = document.getElementById('upload-form');
    const feedback = document.getElementById('feedback-message');

    // Section containers
    const movieFields = document.querySelector('.movie-fields');
    const seriesAnimeFields = document.querySelector('.series-anime-fields');
    const bandFields = document.querySelector('.band-fields');
    const animeOnlyFields = document.querySelector('.anime-only');

    // Labels that change
    const labelTitolo = document.getElementById('label-titolo');
    const labelPaese = document.getElementById('label-paese');
    const labelCast = document.getElementById('label-cast');
    const labelAwards = document.getElementById('label-awards');

    categorySelect.addEventListener('change', (e) => {
        const type = e.target.value;

        [movieFields, seriesAnimeFields, bandFields, animeOnlyFields].forEach(el => el.style.display = 'none');

        if (type === 'movies') {
            movieFields.style.display = 'block';
            labelTitolo.textContent = "TITOLO DEL FILM";
            labelPaese.textContent = "PAESE DI PRODUZIONE";
            labelCast.textContent = "CAST (ATTORI PRINCIPALI)";
            labelAwards.textContent = "PREMI VINTI (OSCAR, ETC)";
        } else if (type === 'tv_series') {
            seriesAnimeFields.style.display = 'block';
            labelTitolo.textContent = "TITOLO DELLA SERIE";
            labelPaese.textContent = "PAESE D'ORIGINE";
            labelCast.textContent = "CAST / ATTORI";
            labelAwards.textContent = "PREMI PRINCIPALI";
        } else if (type === 'anime') {
            seriesAnimeFields.style.display = 'block';
            animeOnlyFields.style.display = 'block';
            labelTitolo.textContent = "TITOLO ANIME";
            labelPaese.textContent = "PAESE D'ORIGINE (ES. JP)";
            labelCast.textContent = "VOCI / DOPPIATORI";
            labelAwards.textContent = "PREMI VINTI";
        } else if (type === 'bands') {
            bandFields.style.display = 'block';
            labelTitolo.textContent = "NOME DELLA BAND";
            labelPaese.textContent = "PAESE D'ORIGINE";
            labelCast.textContent = "COMPONENTI DELLA BAND";
            labelAwards.textContent = "PREMI PRINCIPALI VINTI";
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        feedback.textContent = 'TRASMISSIONE DATI IN CORSO...';
        feedback.className = 'feedback info';

        const formData = new FormData(event.target);
        const type = categorySelect.value;
        const toArray = (str) => str ? str.split(',').map(s => s.trim()).filter(s => s !== '') : [];

        let payload = {
            curiosita: formData.get('curiosita'),
            fonte: formData.get('fonte') || null
        };

        if (type === 'movies') {
            payload = {
                ...payload,
                titolo: formData.get('titolo'),
                anno: parseInt(formData.get('anno')),
                paese: formData.get('paese'),
                genere: toArray(formData.get('genere')),
                is_anime: formData.get('is_anime') === 'true',
                durata_min: parseInt(formData.get('durata_min')),
                regia: formData.get('regia'),
                incasso_mondiale_eur: formData.get('incasso') ? parseFloat(formData.get('incasso')) : null,
                premi_vinti: toArray(formData.get('awards')),
                cast: toArray(formData.get('cast_members'))
            };
        } else if (type === 'tv_series' || type === 'anime') {
            payload = {
                ...payload,
                titolo: formData.get('titolo'),
                paese: formData.get('paese'),
                genere: toArray(formData.get('genere')),
                anni: formData.get('anni_attivi'),
                stagioni: parseInt(formData.get('stagioni')),
                network_streaming: toArray(formData.get('network')),
                cast: toArray(formData.get('cast_members'))
            };
            if (type === 'tv_series') {
                payload.premi_principali_vinti = formData.get('awards');
            } else {
                payload.episodio_piu_visto = formData.get('episodio_visto');
            }
        } else if (type === 'bands') {
            payload = {
                ...payload,
                band: formData.get('titolo'),
                paese_origine: formData.get('paese'),
                periodo_attivita: formData.get('periodo_attivita'),
                genere: toArray(formData.get('genere')),
                etichette: toArray(formData.get('etichette')),
                componenti: toArray(formData.get('cast_members')),
                numero_album_pubblicati: formData.get('album') ? parseInt(formData.get('album')) : null,
                premi_principali_vinti: toArray(formData.get('awards'))
            };
        }

        try {
            const response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Password': sessionStorage.getItem('admin_password') // Securely send password with each write
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                feedback.textContent = 'DATA SYNC COMPLETE! OPERA SALVATA CON SUCCESSO.';
                feedback.className = 'feedback success';
                form.reset();
            } else if (response.status === 403) {
                feedback.textContent = 'ERRORE DI AUTORIZZAZIONE. SESSIONE SCADUTA.';
                feedback.className = 'feedback error';
                sessionStorage.removeItem('admin_password');
                location.reload(); // Reload to show login again
            } else {
                throw new Error();
            }
        } catch (error) {
            feedback.textContent = 'ERRORE DI TRASMISSIONE. CONTROLLA IL SERVER.';
            feedback.className = 'feedback error';
        }
    });
});
