# Yu-Gi-Oh Dex

## Disclaimer

Dieses Projekt ist ein privates Lernprojekt und dient ausschließlich zum Üben von React, TypeScript, Express und MongoDB. Yu-Gi-Oh!, die Kartennamen, Kartendaten, Kartenbilder und zugehörige Markenrechte gehören ihren jeweiligen Rechteinhabern, insbesondere Konami. Dieses Projekt steht in keiner Verbindung zu Konami und verfolgt keinen kommerziellen Zweck.

Yu-Gi-Oh Dex ist ein Fullstack-Übungsprojekt mit React, TypeScript, Express und MongoDB. Die App sucht Yu-Gi-Oh Karten, zeigt passende Ergebnisse als Karten-Grid an und speichert Kartendaten sowie lokal gecachte Kartenbilder über ein eigenes Backend.

Das Projekt ist bewusst als Lernprojekt aufgebaut: Frontend und Backend sind getrennt, die externe API wird nicht direkt aus dem Frontend angesprochen, und Kartenbilder werden erst dann lokal gespeichert, wenn sie wirklich angezeigt werden.

## Live Preview

Die Frontend-App kann hier angesehen werden:

https://xjulaies.github.io/Projects/Practice%20React/05/YuGiOhDex/docs/

Hinweis: Die Live Preview zeigt nur das statisch gehostete Frontend. Die Backend-Funktionalität, also Suche, Random Cards, Datenbankzugriff und lokales Bild-Caching, läuft aktuell lokal auf meinem Rechner und ist in der GitHub-Pages-Version nicht verfügbar.

## Vorschau

### Desktop

![Desktop Preview](YuGiOhDex/public/img/preview.full.png)

### Mobile

![Mobile Preview](YuGiOhDex/public/img/preview.mobile.png)

### Show More

![Show More Preview](YuGiOhDex/public/img/showMore.png)

## Features

- Suche nach Yu-Gi-Oh Karten über eine React-Suchleiste
- Anzeige mehrerer Suchergebnisse als responsives Karten-Grid
- Pagination mit `Show more` Button
- Backend-Suche über MongoDB
- Import der Kartendaten aus der YGOPRODeck API
- Lokales Lazy-Caching von Kartenbildern
- Statische Auslieferung gespeicherter Bilder über Express
- Zufällige Karte über eine eigene Backend-Route
- Hero Section mit automatisch wechselnden Random Cards
- Loading- und Error-State für Random Cards
- Frontend-Routing mit TanStack Router
- Startseite `/` mit Hero Section und Button zur Suche
- Suchseite `/search` für Kartensuche und Suchergebnisse
- Zentrale API-Konfiguration im Frontend über `shared/lib/api.config.ts`
- Dark/Light Theme Toggle mit DaisyUI
- Custom Hook `useRandomCard` für automatische Random-Card-Logik
- Typisierte Props, Events und API-Parameter mit TypeScript
- Feature-based Architecture kombiniert mit Atomic Design

## Geplante Features

- Weitere Design-Verbesserungen für Karten, Hero Section, Layout, Abstände und responsive Darstellung
- Deckbuilder, mit dem eigene Kartendecks zusammengestellt werden können
- Login-System, damit Benutzer eigene Decks speichern und später wieder laden können
- Detailansicht für einzelne Karten
- Verbesserte Fehler- und Ladezustände für die Kartensuche
- Tolerantere Suche, zum Beispiel `Blue eyes` für `Blue-Eyes`
- API-Errorhandling im Frontend weiter vereinheitlichen

## Grundidee

Das Frontend fragt nicht direkt die externe Yu-Gi-Oh API ab. Stattdessen spricht es das eigene Backend an.

Der Ablauf der Suche:

1. Das Frontend sendet eine Suche an das Backend.
2. Das Backend sucht passende Karten in MongoDB.
3. Für die gefundenen Karten prüft das Backend, ob bereits ein lokales Bild gespeichert ist.
4. Falls kein lokales Bild vorhanden ist, wird es einmalig heruntergeladen und lokal gespeichert.
5. Das Backend gibt die Karten inklusive lokalem `imagePath` ans Frontend zurück.
6. Das Frontend zeigt die Karten mit Bild, Beschreibung und Details an.

Der Ablauf der Random Cards:

1. Das Frontend ruft eine eigene Random-Route im Backend auf.
2. Das Backend wählt eine zufällige Karte aus MongoDB aus.
3. Auch diese Karte durchläuft das lokale Bild-Caching.
4. Im Frontend lädt der Custom Hook `useRandomCard` automatisch eine Karte.
5. Nach einem Intervall wird eine neue zufällige Karte geladen.
6. Die Hero Section zeigt links und rechts jeweils eine Random Card an.

Dadurch werden Bilder nicht bei jedem Suchvorgang erneut von der externen API geladen.

## Projektstruktur

```txt
05/
+-- Backend/
|   +-- src/
|   |   +-- config/
|   |   |   +-- settings.ts
|   |   +-- features/
|   |   |   +-- cards/
|   |   |       +-- cards.controller.ts
|   |   |       +-- cards.model.ts
|   |   |       +-- cards.routes.ts
|   |   |       +-- image.service.ts
|   |   +-- lib/
|   |   |   +-- handleError/
|   |   |       +-- createAnswer.ts
|   |   |       +-- createError.ts
|   |   +-- types/
|   |   +-- db.ts
|   |   +-- index.ts
|   +-- public/
|       +-- card-images/
|
+-- YuGiOhDex/
    +-- public/
    |   +-- img/
    +-- src/
        +-- features/
        |   +-- cards/
        |   |   +-- components/
        |   |   |   +-- molecules/
        |   |   +-- lib/
        |   +-- hero/
        |   |   +-- components/
        |   |       +-- atoms/
        |   |       +-- organisms/
        |   +-- randomCard/
        |   |   +-- api/
        |   |   +-- components/
        |   |   |   +-- atoms/
        |   |   |   +-- molecules/
        |   |   |   +-- organisms/
        |   |   +-- hooks/
        |   |   +-- types/
        |   +-- search/
        |       +-- api/
        |       +-- components/
        |       |   +-- atoms/
        |       |   +-- molecules/
        |       +-- types/
        +-- layouts/
        |   +-- organisms/
        |   +-- templates/
        +-- routes/
        |   +-- __root.tsx
        |   +-- index.tsx
        |   +-- _search/
        |       +-- search.tsx
        +-- shared/
        |   +-- components/
        |   +-- lib/
        |       +-- api.config.ts
        +-- types/
        +-- routeTree.gen.ts
```

## Backend

Das Backend basiert auf Express, TypeScript und Mongoose.

### Wichtige Dateien

- `src/index.ts`: Startet Express, aktiviert CORS, JSON-Parsing, Static Files und Error Handling.
- `src/db.ts`: Baut die Verbindung zu MongoDB auf.
- `src/features/cards/cards.routes.ts`: Definiert die Cards-Routen.
- `src/features/cards/cards.controller.ts`: Enthält Import-, Such- und Random-Card-Logik.
- `src/features/cards/cards.model.ts`: Definiert das Mongoose Card Model.
- `src/features/cards/image.service.ts`: Lädt Kartenbilder bei Bedarf herunter und speichert sie lokal.
- `src/lib/handleError/createAnswer.ts`: Erstellt einheitliche API-Antworten.
- `src/lib/handleError/createError.ts`: Erstellt Fehlerobjekte für das Error Handling.

### API-Routen

#### Karten importieren

```http
POST http://localhost:3000/api/cards/import
```

Diese Route lädt die Kartendaten von der YGOPRODeck API und speichert oder aktualisiert sie in MongoDB. Bilder werden dabei noch nicht heruntergeladen.

Die Route nutzt `upsert`, damit Karten beim erneuten Import aktualisiert werden können, ohne doppelt angelegt zu werden.

#### Karten suchen

```http
GET http://localhost:3000/api/cards/search/:cardName?page=1
```

Beispiel:

```http
GET http://localhost:3000/api/cards/search/Dark%20Magician?page=1
```

Die Route sucht Karten nach Namen, gibt maximal 10 Ergebnisse pro Seite zurück und liefert Metadaten für `Show more`.

Beispielhafte Antwortstruktur:

```json
{
  "status": 200,
  "message": "All card data by name",
  "data": [
    {
      "cards": [],
      "page": 1,
      "limit": 10,
      "totalCards": 25,
      "hasMore": true
    }
  ]
}
```

#### Zufällige Karte laden

```http
GET http://localhost:3000/api/cards/random
```

Diese Route wählt eine zufällige Karte aus MongoDB aus und gibt genau eine Karte zurück. Falls das Bild dieser Karte noch nicht lokal gespeichert ist, wird es zuerst heruntergeladen und anschließend über den lokalen `imagePath` bereitgestellt.

Beispielhafte Antwortstruktur:

```json
{
  "status": 200,
  "message": "Random card successfully loaded",
  "data": [
    {
      "ygoId": 46986414,
      "name": "Dark Magician",
      "type": "Normal Monster",
      "description": "The ultimate wizard in terms of attack and defense.",
      "imagePath": "/card-images/46986414.jpg"
    }
  ]
}
```

### Bild-Caching

Die Bilder werden lazy gespeichert:

- Beim Import wird nur die externe Bild-URL in MongoDB gespeichert.
- Beim Suchen oder Laden einer zufälligen Karte prüft `image.service.ts`, ob `imagePath` vorhanden ist.
- Falls nicht, wird das Bild heruntergeladen.
- Das Bild wird in `Backend/public/card-images/` gespeichert.
- Danach wird der lokale Pfad in MongoDB gespeichert.

Dadurch werden externe Bildanfragen reduziert.

## Frontend

Das Frontend basiert auf React, TypeScript, Vite, Tailwind CSS, DaisyUI und TanStack Router.

Die Frontend-Struktur kombiniert Feature-based Architecture mit Atomic Design. Fachliche Bereiche wie `cards`, `search`, `randomCard` und `hero` liegen unter `src/features`. Innerhalb dieser Features werden UI-Komponenten nach Atomic Design in `atoms`, `molecules` und `organisms` sortiert. Wiederverwendbare, feature-unabhängige Komponenten und Hilfsfunktionen liegen unter `src/shared`.

### Datei-Flags

Zur besseren Suche in VS Code werden Dateisuffixe als kleine Flags genutzt:

```txt
.atm.tsx    Atom-Komponente
.mol.tsx    Molecule-Komponente
.org.tsx    Organism-Komponente
.tpl.tsx    Template-Komponente
.types.ts   TypeScript Types
.helper.ts  Helper-Funktion
```

Beispiele:

```txt
showMore.btn.atm.tsx
cardSearchBar.mol.tsx
public.hero.org.tsx
cardLayout.tpl.tsx
header.types.ts
getCardDetails.helper.ts
```

### Wichtige Dateien

- `src/App.tsx`: Erstellt den TanStack Router und rendert den `RouterProvider`.
- `src/routeTree.gen.ts`: Automatisch generierter TanStack Route Tree. Diese Datei gehört ins Git-Repository und sollte nicht manuell bearbeitet werden.
- `src/routes/__root.tsx`: Root Route mit `Outlet` für untergeordnete Seiten.
- `src/routes/index.tsx`: Startseite `/` mit Public Layout und Hero Section.
- `src/routes/_search/search.tsx`: Suchseite `/search` mit Public Layout und Card Layout.
- `src/shared/lib/api.config.ts`: Zentrale API-Base-URL für Frontend-Requests.
- `src/layouts/templates/PublicLayout/public.layout.tpl.tsx`: Basislayout mit Navbar, Main-Bereich und Footer.
- `src/layouts/templates/CardLayout/cardLayout.tpl.tsx`: Steuert Suche, Karten-State, Pagination und Rendering.
- `src/layouts/organisms/PublicNavbar/public.navbar.org.tsx`: Öffentliche Navbar mit Theme Toggle.
- `src/layouts/organisms/PublicFooter/public.footer.org.tsx`: Footer des Public Layouts.
- `src/features/hero/components/organisms/PublicHero/public.hero.org.tsx`: Hero Section mit zentralem Text und zwei automatisch wechselnden Random Cards.
- `src/features/hero/components/atoms/public.hero.btn.atm.tsx`: Hero Button, der per TanStack `Link` auf `/search` navigiert.
- `src/features/search/components/molecules/CardSearchBar/cardSearchBar.mol.tsx`: Suchformular mit Input.
- `src/features/search/components/atoms/ShowMoreButton/showMore.btn.atm.tsx`: Button für weitere Suchergebnisse.
- `src/features/cards/components/molecules/YuGiOhCard/yugiohCard.mol.tsx`: Einzelne Kartenanzeige.
- `src/features/randomCard/components/organisms/RandomCard/randomCard.org.tsx`: Container-Komponente für die zufällige Karte.
- `src/features/randomCard/components/molecules/DisplayRandomCard/displayRandomCard.mol.tsx`: Reine Anzeige-Komponente für eine zufällige Karte.
- `src/features/randomCard/components/atoms/RandomCardSkeleton/randomCardSkeleton.atm.tsx`: Ladezustand für Random Cards.
- `src/features/randomCard/components/atoms/RandomCardError/randomCardError.atm.tsx`: Fehlerzustand für Random Cards.
- `src/features/randomCard/hooks/useRandomCard.ts`: Custom Hook, der eine zufällige Karte lädt und regelmäßig aktualisiert.
- `src/features/search/api/getCard.ts`: API-Helper für die Kartensuche.
- `src/features/randomCard/api/getRandomCard.ts`: API-Helper für die Random-Card-Route.
- `src/features/cards/lib/getCardDetails.helper.ts`: Helper für optionale Kartendetails.
- `src/shared/components/molecules/Header/header.mol.tsx`: Wiederverwendbare Header-Komponente.
- `src/types/card.types.ts`: Globaler Domain-Type für Karten.

### Routing

Aktuell gibt es zwei sichtbare Frontend-Routen:

```txt
/       Startseite mit Hero Section und Random Cards
/search Kartensuche mit Searchbar, Grid und Show-more-Button
```

TanStack Router arbeitet mit einer einzigen `index.html`. Die Route entscheidet im React-Code, welche Seite gerendert wird.

Der Button in der Hero Section verwendet TanStack Router `Link`:

```txt
Get started -> /search
```

### Datenfluss der Kartensuche

1. User gibt einen Kartennamen in die Searchbar ein.
2. `CardSearchBar` gibt den Suchwert an `CardLayout` weiter.
3. `CardLayout` ruft `getCard` auf.
4. `getCard` baut die URL über `getApiUrl` aus `shared/lib/api.config.ts`.
5. Das Backend sucht in MongoDB und prüft die Bilder.
6. `CardLayout` speichert die erhaltenen Karten im State.
7. Das Grid rendert für jede Karte eine `YuGiOhCard`.
8. Wenn `hasMore` true ist, wird der `ShowMoreBtn` angezeigt.
9. Beim Klick auf `Show more` wird die nächste Seite geladen und an die bestehenden Karten angehängt.

### Datenfluss der Random Cards

1. `PublicHero` rendert links und rechts je eine `RandomCard`.
2. `RandomCard` nutzt den Custom Hook `useRandomCard`.
3. `useRandomCard` ruft `getRandomCard` auf.
4. `getRandomCard` fragt `GET /api/cards/random` im Backend an.
5. Während des ersten Ladens wird `RandomCardSkeleton` angezeigt.
6. Bei einem Fehler wird `RandomCardError` angezeigt.
7. Bei Erfolg wird die Karte an `DisplayRandomCard` übergeben.
8. Nach 10 Sekunden lädt der Hook automatisch eine neue zufällige Karte.

## Technologien

### Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- DaisyUI

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB
- Mongoose
- CORS
- dotenv
- nodemon
- ts-node

## Setup

### Voraussetzungen

- Node.js
- MongoDB lokal oder eine MongoDB-Verbindung
- Zwei Terminals: eins für Backend, eins für Frontend

### Backend starten

```bash
cd Backend
npm install
npm run dev
```

Die `.env` im Backend sollte ungefähr so aussehen:

```env
PORT=3000
BASE_URL=/api
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>/yugiohdex
```

Wenn der Server läuft, sollte in der Konsole stehen:

```txt
Connected to MongoDB
Server Booted at Port 3000
```

### Frontend starten

```bash
cd YuGiOhDex
npm install
npm run dev
```

Das Frontend läuft normalerweise unter:

```txt
http://localhost:5173
```

Optional kann die Backend-URL im Frontend über eine Vite-Variable gesetzt werden:

```env
VITE_API_URL=http://localhost:3000
```

Ohne diese Variable nutzt das Frontend automatisch:

```txt
http://localhost:3000
```

## Erste Nutzung

Vor der Suche sollten die Kartendaten einmal importiert werden:

```http
POST http://localhost:3000/api/cards/import
```

Danach kann im Frontend gesucht werden, zum Beispiel nach:

```txt
Dark Magician
Blue-Eyes
Kuriboh
```

## Aktueller Funktionsstand

Funktioniert bereits:

- Backend startet und verbindet sich mit MongoDB.
- Kartendaten können importiert werden.
- Kartensuche funktioniert über das Backend.
- Zufällige Karten können über `/api/cards/random` geladen werden.
- Bilder werden beim ersten Anzeigen lokal gespeichert.
- Bereits gespeicherte Bilder werden wiederverwendet.
- Die Hero Section zeigt automatisch wechselnde Random Cards.
- Random Cards haben Loading- und Error-Zustände.
- TanStack Router steuert die Startseite `/` und die Suchseite `/search`.
- Der Hero Button navigiert ohne vollständigen Page Reload zur Suchseite.
- Frontend rendert Suchergebnisse als Karten.
- `Show more` lädt weitere Ergebnisse.
- Theme Toggle funktioniert.
- Footer bleibt unten im Layout.
- API-URLs werden zentral über `getApiUrl` gebaut.

Noch mögliche nächste Schritte:

- Errorhandling der Such-API im Frontend verbessern, damit `getCard` nicht still `undefined` zurückgibt.
- Fehlerzustand anzeigen, wenn keine Karten gefunden werden.
- Loading-State während der Suche anzeigen.
- Suche toleranter machen, zum Beispiel `Blue eyes` auch für `Blue-Eyes`.
- Detailansicht für einzelne Karten bauen.
- Hero Section und Random Cards optisch weiter verfeinern.
- Weitere Routen für Deckbuilder, Login und Kartendetails ergänzen.
- Button/Links in Navbar mit echten Funktionen verbinden.
- Geplanten Deckbuilder vorbereiten.
- Login und benutzerbezogene Datenstruktur planen.

## Review-Notizen

Der aktuelle Stand ist fachlich sinnvoll aufgebaut:

- Die Trennung zwischen Backend, API-Helpern, Hooks und UI-Komponenten ist nachvollziehbar.
- Die Kombination aus Feature-Struktur und Atomic Design passt zur wachsenden App.
- Das Backend kapselt die externe API sauber und schützt das Frontend vor direkten Bild-Requests.
- Das Lazy-Caching der Bilder ist für dieses Lernprojekt eine gute Lösung.
- Die zentrale `api.config.ts` ist ein guter Schritt, weil die API-URL nicht mehr überall fest im Code stehen muss.

Ein paar technische Punkte bleiben bewusst als nächste Lernschritte offen:

- `getCard` sollte langfristig ähnlich wie `getRandomCard` Fehler weiterwerfen oder einen klar typisierten Fehlerzustand zurückgeben.
- `CardLayout` sollte auf Fehler und leere Ergebnisse reagieren können.
- Die API-Antworten könnten im Frontend noch stärker typisiert werden.
- Der Random-Card-Hook könnte später zwischen initialem Laden und Hintergrund-Refresh unterscheiden.

## Lernfokus

Dieses Projekt übt besonders:

- Komponenten sinnvoll aufteilen
- Props und Callback-Funktionen einsetzen
- State für Suchergebnisse und Pagination verwenden
- Custom Hooks einsetzen, um State- und Effect-Logik aus Komponenten auszulagern
- Clientseitiges Routing mit TanStack Router verwenden
- Generated Files wie `routeTree.gen.ts` verstehen und korrekt versionieren
- TypeScript Types für Props, Events und API-Parameter auslagern
- Express-Routen strukturieren
- MongoDB-Dokumente mit Mongoose speichern und aktualisieren
- Zufällige Dokumente aus MongoDB laden
- Externe APIs über ein eigenes Backend kapseln
- Lokale Dateien aus dem Backend statisch ausliefern
