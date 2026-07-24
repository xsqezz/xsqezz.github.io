# Orbit profiles

Lekka platforma profili link-in-bio dzialajaca jako statyczna strona na GitHub Pages. Profile sa dostepne pod adresem `https://xsqezz.github.io/nazwa`.

## Lokalny start

```bash
python -m http.server 8000
```

Otworz `http://localhost:8000`. Projekt nie wymaga bundlera ani frameworka.

## Konfiguracja Supabase

1. Utworz projekt na [supabase.com](https://supabase.com).
2. W SQL Editorze uruchom caly plik [`supabase/schema.sql`](supabase/schema.sql).
3. W Authentication > Sign In / Providers wlacz Email. Magic link nie wymaga wlasnego backendu.
4. Opcjonalnie skonfiguruj GitHub OAuth. Callback dla aplikacji GitHub to `https://<PROJECT-REF>.supabase.co/auth/v1/callback`.
5. W Authentication > URL Configuration ustaw Site URL na `https://xsqezz.github.io`.
6. Skopiuj [`config.example.js`](config.example.js) jako `config.js` i wpisz URL projektu oraz publiczny klucz publishable/anon.

`config.js` jest publikowany razem ze strona, bo klucz publishable/anon jest publicznym kluczem klienta chronionym przez RLS. Nigdy nie publikuj klucza `service_role`.

## Edycja

- Teksty, linki i dane demonstracyjne sa w obiekcie `APP_CONFIG` w `script.js`.
- Kolory i fonty mozna zmienic w `style.css` oraz w opcjach kreatora.
- Avatar, banner i muzyke ustawia sie przez URL w kreatorze.
- Profil testowy `xsqezz` ma lokalny fallback i dziala przed utworzeniem rekordu w bazie.

## Routing

- `/` - landing page
- `/create` - kreator profilu
- `/login` - logowanie
- `/dashboard` - panel uzytkownika
- `/<username>` - publiczny profil

`404.html` przekazuje sciezke do aplikacji SPA, dzieki czemu bezposrednie wejscie i odswiezanie profili dziala na GitHub Pages.

## GitHub Pages

W Settings > Pages ustaw `Deploy from a branch`, branch `main`, folder `/ (root)`.

## Bezpieczenstwo

Username jest ograniczony do malych liter, cyfr, myslnika i podkreslenia. Formularz waliduje URL-e, ogranicza opis do 180 znakow, a dane uzytkownika renderuje przez bezpieczny DOM/textContent. RLS pozwala edytowac i usuwac tylko wlasny profil.
