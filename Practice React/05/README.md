# Yu-Gi-Oh Dex

Yu-Gi-Oh Dex ist ein Fullstack-Übungsprojekt mit React, TypeScript, Express und MongoDB. Die App sucht Yu-Gi-Oh Karten, zeigt passende Ergebnisse als Karten-Grid an und speichert Kartendaten sowie lokal gecachte Kartenbilder über ein eigenes Backend.

Das Projekt ist bewusst als Lernprojekt aufgebaut: Frontend und Backend sind getrennt, die API-Kommunikation läuft über eigene Routen, und externe Bilder werden nicht dauerhaft direkt vom Frontend geladen.

## Vorschau

### Desktop

![Desktop Preview](YuGiOhDex/public/img/preview.full.png)

### Mobile

![Mobile Preview](YuGiOhDex/public/img/preview.mobile.png)

### Show More

![Show More Preview](YuGiOhDex/public/img/showMore.png)

## Features

- Suche nach Yu-Gi-Oh Karten über eine React-Suchleiste
- Anzeige mehrerer Suchergebnisse als responsive Karten
- Pagination mit `Show more` Button
- Backend-Suche über MongoDB
- Import der Kartendaten aus der YGOPRODeck API
- Lokales Lazy-Caching von Kartenbildern
- Statische Auslieferung gespeicherter Bilder über Express
- Dark/Light Theme Toggle mit DaisyUI
- Getrennte Komponenten für Layout, Navbar, Footer, Searchbar, Cards und Show-More-Button
- Typisierte Props und Events mit TypeScript

## Geplante Features

- Weitere Design-Verbesserungen für Karten, Layout, Abstände und responsive Darstellung
- Deckbuilder, mit dem eigene Kartendecks zusammengestellt werden können
- Login-System, damit Benutzer eigene Decks speichern und später wieder laden können
- Detailansicht für einzelne Karten
- Fehler- und Ladezustände im Frontend, zum Beispiel bei leeren Suchergebnissen

## Grundidee

Das Frontend fragt nicht direkt die externe Yu-Gi-Oh API ab. Stattdessen spricht es das eigene Backend an.

Der Ablauf:

1. Das Frontend sendet eine Suche an das Backend.
2. Das Backend sucht passende Karten in MongoDB.
3. Für die gefundenen Karten prüft das Backend, ob bereits ein lokales Bild gespeichert ist.
4. Falls kein lokales Bild vorhanden ist, wird es einmalig von der externen API geladen und lokal gespeichert.
5. Das Backend gibt die Karten inklusive lokalem `imagePath` ans Frontend zurück.
6. Das Frontend zeigt die Karten mit Bildern, Beschreibung und Details an.

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
        +-- components/
        |   +-- cardSearch/
        |   +-- footer/
        |   +-- header/
        |   +-- layouts/
        |   +-- navbars/
        |   +-- YuGiOhCards/
        +-- lib/
        |   +-- api/
        |   +-- cards/
        +-- types/
```

## Backend

Das Backend basiert auf Express, TypeScript und Mongoose.

### Wichtige Dateien

- `src/index.ts`: Startet Express, aktiviert CORS, JSON-Parsing, Static Files und Error Handling.
- `src/db.ts`: Baut die Verbindung zu MongoDB auf.
- `src/features/cards/cards.routes.ts`: Definiert die Cards-Routen.
- `src/features/cards/cards.controller.ts`: Enthält Import- und Suchlogik.
- `src/features/cards/cards.model.ts`: Definiert das Mongoose Card Model.
- `src/features/cards/image.service.ts`: Lädt Kartenbilder bei Bedarf herunter und speichert sie lokal.

### API-Routen

#### Karten importieren

```http
POST http://localhost:3000/api/cards/import
```

Diese Route lädt die Kartendaten von der YGOPRODeck API und speichert oder aktualisiert sie in MongoDB. Bilder werden dabei noch nicht heruntergeladen.

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

### Bild-Caching

Die Bilder werden lazy gespeichert:

- Beim Import wird nur die externe Bild-URL in MongoDB gespeichert.
- Beim Suchen prüft `image.service.ts`, ob `imagePath` vorhanden ist.
- Falls nicht, wird das Bild heruntergeladen.
- Das Bild wird in `Backend/public/card-images/` gespeichert.
- Danach wird der lokale Pfad in MongoDB gespeichert.

Dadurch werden externe Bildanfragen reduziert.

## Frontend

Das Frontend basiert auf React, TypeScript, Vite, Tailwind CSS und DaisyUI.

### Wichtige Dateien

- `src/App.tsx`: Bindet das Public Layout und den Hauptinhalt ein.
- `src/components/layouts/public.layout.tsx`: Basislayout mit Navbar, Main-Bereich und Footer.
- `src/components/layouts/card.layout.tsx`: Steuert Suche, Karten-State, Pagination und Rendering.
- `src/components/cardSearch/cardSearchBar.tsx`: Suchformular mit Input.
- `src/components/cardSearch/showMore.tsx`: Button für weitere Suchergebnisse.
- `src/components/YuGiOhCards/yugiohCard.tsx`: Einzelne Kartenanzeige.
- `src/lib/api/getCard.ts`: API-Helper für Backend-Anfragen.
- `src/lib/cards/getCardDetails.helper.ts`: Helper für optionale Kartendetails.
- `src/types/`: Ausgelagerte TypeScript Types.

### Datenfluss im Frontend

1. User gibt einen Kartennamen in die Searchbar ein.
2. `CardSearchBar` gibt den Suchwert an `CardLayout` weiter.
3. `CardLayout` ruft `getCard` auf.
4. `getCard` fragt das Backend an.
5. `CardLayout` speichert die erhaltenen Karten im State.
6. Das Grid rendert für jede Karte eine `YuGiOhCard`.
7. Wenn `hasMore` true ist, wird der `ShowMoreBtn` angezeigt.
8. Beim Klick auf `Show more` wird die nächste Seite geladen und an die bestehenden Karten angehängt.

## Technologien

### Frontend

- React 19
- TypeScript
- Vite
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
MONGODB_URL=mongodb://localhost:27017/yugiohdex
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
- Bilder werden beim ersten Anzeigen lokal gespeichert.
- Bereits gespeicherte Bilder werden wiederverwendet.
- Frontend rendert Suchergebnisse als Karten.
- `Show more` lädt weitere Ergebnisse.
- Theme Toggle funktioniert.
- Footer bleibt unten im Layout.

Noch mögliche nächste Schritte:

- Fehlerzustand im Frontend anzeigen, wenn keine Karten gefunden werden.
- Loading-State während der Suche anzeigen.
- Suche toleranter machen, z.B. `Blue eyes` auch für `Blue-Eyes`.
- Detailansicht für einzelne Karten bauen.
- Button/Links in Navbar mit echten Funktionen verbinden.
- API-URL im Frontend in eine Config oder `.env` auslagern.
- Geplanten Deckbuilder vorbereiten.
- Login und benutzerbezogene Datenstruktur planen.

## Lernfokus

Dieses Projekt übt besonders:

- Komponenten sinnvoll aufteilen
- Props und Callback-Funktionen einsetzen
- State für Suchergebnisse und Pagination verwenden
- TypeScript Types für Props, Events und API-Parameter auslagern
- Express-Routen strukturieren
- MongoDB-Dokumente mit Mongoose speichern und aktualisieren
- Externe APIs über ein eigenes Backend kapseln
- Lokale Dateien aus dem Backend statisch ausliefern
