# Orbit profiles

Lekka, responsywna platforma profili pod GitHub Pages. Użytkownik może stworzyć własną stronę pod adresem `https://xsqezz.github.io/nazwa`, ustawić wygląd, linki, badge, status i muzykę, a następnie edytować profil z dashboardu.

## Lokalny start

```bash
python -m http.server 8000
```

Otwórz `http://localhost:8000`. Aplikacja działa bez bundlera i frameworka. Supabase jest ładowane dynamicznie tylko wtedy, gdy istnieje poprawny `config.js`.

## Supabase krok po kroku

1. Utwórz projekt na [supabase.com](https://supabase.com).
2. W SQL Editorze uruchom cały plik [`supabase/schema.sql`](supabase/schema.sql).
3. W Authentication > Providers włącz GitHub i/lub Email. Dla GitHub dodaj OAuth app z callbackiem `https://<PROJECT-REF>.supabase.co/auth/v1/callback`.
4. W Authentication > URL Configuration ustaw Site URL na `https://xsqezz.github.io` i dodaj redirect URL `https://xsqezz.github.io/dashboard`.
5. Skopiuj [`config.example.js`](config.example.js) jako `config.js`.
6. Wpisz w `config.js` `url` projektu oraz publiczny `anonKey` z Project Settings > API.
7. Nie dodawaj `config.js` do repozytorium. Jest w `.gitignore`. Nigdy nie używaj `service_role` key w frontendzie.

Po konfiguracji logowanie przez GitHub lub magic link email otwiera dashboard. RLS w schemacie ogranicza insert/update/delete do właściciela profilu. Publiczny odczyt jest potrzebny, aby profile działały bez logowania.

## Routing GitHub Pages

- `/` - landing page
- `/create` - kreator z podglądem na żywo
- `/login` - logowanie
- `/dashboard` - prywatny panel
- `/<username>` - publiczny profil

`404.html` zapisuje pierwotną ścieżkę w `sessionStorage`, wraca do `index.html`, a router odtwarza adres przez `history.replaceState`. Dzięki temu bezpośrednie wejście i odświeżenie profilu działają na GitHub Pages.

## GitHub Pages

W Settings > Pages ustaw Source na `Deploy from a branch`, branch `main`, folder `/ (root)`. Po pierwszym włączeniu publikacja może potrwać kilka minut.

## Walidacja i bezpieczeństwo

Username jest ograniczony do małych liter, cyfr, myślnika i podkreślenia; zablokowane są `create`, `login`, `dashboard`, `settings`, `api`, `admin`, `assets` i `index`. Formularz ogranicza opis do 180 znaków, sprawdza URL-e i renderuje dane profilu przez `textContent`/DOM zamiast ufać HTML użytkownika.

Profil `xsqezz` ma lokalny fallback demonstracyjny, więc `/xsqezz` działa także przed podłączeniem Supabase. Po podłączeniu Supabase możesz utworzyć rekord o tym username, aby zastąpić dane demonstracyjne.
