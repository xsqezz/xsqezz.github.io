# xsqezz.github.io

Lekka, statyczna strona link-in-bio dla GitHub Pages. Nie wymaga frameworka ani backendu.

## Szybka edycja

Wszystkie teksty, linki, avatar i ustawienia muzyki są w obiekcie `SITE_CONFIG` na początku pliku [`script.js`](script.js).

- `links` - edytuj `title`, `subtitle`, `href` i typ `icon` (`discord`, `github`, `tiktok`, `youtube`, `spark`).
- `avatar` - podmień ścieżkę na plik w `assets/`; pamiętaj też o aktualizacji `og:image` w `index.html`.
- `bio`, `status`, `location`, `since`, `footer` - teksty profilu.
- `music.enabled` - ustaw `true`, dodaj plik audio do `assets/` i zmień `source`.

## Kolory

Kolory są zebrane w `:root` w `style.css`: `--accent`, `--accent-2`, `--bg`, `--surface` i `--text`.

## Lokalny podgląd

Uruchom dowolny prosty serwer statyczny, na przykład:

```bash
python -m http.server 8000
```

Potem otwórz `http://localhost:8000`. Strona jest gotowa do publikacji z głównego katalogu repozytorium GitHub Pages.

## Licznik wyświetleń

Licznik jest lokalnym efektem wizualnym zapisującym wartość w `localStorage`. Nie wysyła danych do żadnego zewnętrznego API i nie wymaga backendu.
