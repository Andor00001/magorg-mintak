# magorg-mintak – projektmemória

## Cél
Oldal: Magorg.hu – üzleti ötlet-előszűrés magyar adatok és 3000 szintetikus (modellezett) felnőttprofil alapján.
LOCK: empirikus validáció nélkül soha nem nevezhető reprezentatívnak. Az élő oldal ezt jelenleg helyesen kommunikálja („nem reprezentatív felmérés”).

## Mi van ebben a repóban?
- Csak statikus mockupok (5 mintaoldal-változat: 1, 2, 3, 4, 4a–4h, 5), generátorok (gen*.py, fetch.py), képek (CREDITS.md szerint).
- GitHub Pages: https://andor00001.github.io/magorg-mintak/ (noindex, jó).
- Minden szám mintaadat, az árak példák.
- FONTOS: az élő magorg.hu NEM ebből a repóból fut (Next/vinext alkalmazás, belépés „Sign in with ChatGPT”, Stripe-fizetés előkészítés alatt). Az élő oldal forrásrepója ismeretlen – tisztázandó.

## Élő oldal állapota (2026-10-29 ellenőrzés)
- Főoldal 200, /modszertan 200, /jogi 200, /elallas 200, belépés 302 (rendben).
- Ár: 4 990 Ft egyszeri bruttó díj; a fizetés „előkészítés alatt”.
- Hiányzik: robots.txt (404), sitemap.xml (404), llms.txt (404); nincs strukturált adat (JSON-LD), nincs og:image; analitika/Sentry nem látszik a HTML-ben.
- Titokkeresés a repóban (kulcs/token/jelszó): nincs találat.

## Döntések / LOCK-ok (közös)
- Szerkesztés csak GitHubon; a Lovable csak Publish-ra való.
- Éles lépés, publikálás, merge, adatbázis-módosítás, e-mail, fizetés csak Andor jóváhagyásával. Fizetés: két megerősítés, csak a Pénzügy bot.
- Titok (API kulcs) soha nem kerül a repóba (a repó publikus!).
- Csendes órák: hétköznap 10:00 előtt és 22:00 után, hétvégén 11:00 előtt nincs értesítés.
- Napi ellenőrzés (hétköznap 10:15, hétvégén 11:15): technikai hibák, Sentry, tartalom, regisztráció – csak hiba esetén szól.
- Heti teljes audit: péntek 12:00.

## Javaslatok (pontszám 0–10, project-director képlet)
1. robots.txt + sitemap.xml az élő oldalra – 8,2 (gyors, SEO-alap)
2. Az élő oldal forrásrepójának azonosítása és bekötése a bothoz – 7,9 (enélkül nem lehet PR-t nyitni az élő oldalra)
3. JSON-LD (Organization + Product/Offer + FAQ) és og:image – 7,1 (Google és AI-válaszmotorok számára)

## Nyitott feladatok
- [ ] Andor: melyik repóból fut az élő magorg.hu?
- [ ] robots.txt, sitemap.xml, llms.txt PR (az élő oldal repójában)
- [ ] JSON-LD + og:image PR
- [ ] Analitika/Sentry megléte ellenőrizve
- [ ] Projektmemória átnézése (Andor)
