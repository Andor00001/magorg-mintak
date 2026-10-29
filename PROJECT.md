# magorg-mintak – projektmemória

## Cél
 Oldal: Magorg.hu – 3000 avataros szintetikus közvélemény-kutatás. LOCK: empirikus validáció nélkül nem nevezhető reprezentatívnak.
README kivonat: magorg.hu – 5 mintaoldal Statikus mockupok. Minden szám mintaadat, árak példák. Képek: CREDITS.md

## Döntések / LOCK-ok (közös)
- Szerkesztés csak GitHubon; a Lovable csak Publish-ra való.
- Éles lépés, publikálás, adatbázis-módosítás, e-mail, fizetés csak Andor jóváhagyásával. Fizetés: két megerősítés, csak a Pénzügy bot.
- Titok (API kulcs) soha nem kerül a repóba.
- Csendes órák: hétköznap 10:00 előtt és 22:00 után, hétvégén 11:00 előtt nincs értesítés.
- Napi ellenőrzés (hétköznap 10:15, hétvégén 11:15): technikai hibák, Sentry, tartalom, regisztráció – csak hiba esetén szól.

## Szerkezet
Fő fájlok: .nojekyll, 1, 2, 3, 4, 4a, 4b, 4c, 4d, 4e, 4f, 4g, 4h, 5, CREDITS.md, README.md, assets, fetch.py, gen.py, gen4.py, gen5.py, hu.geojson, img, index.html, shots

## Nyitott feladatok
- [ ] Projektmemória átnézése, kiegészítése (Andor / oldalbot)
- [ ] Napi ellenőrző rutin működik
