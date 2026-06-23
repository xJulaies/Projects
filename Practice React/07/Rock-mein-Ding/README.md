# Rock mein Ding

`Rock mein Ding` ist ein React-Lernprojekt für eine mehrtägige
Konzertveranstaltung. Die Anwendung kombiniert eine öffentliche Festival-Webseite
mit einem geschützten Dashboard zur Verwaltung von Bands.

Das Projekt befindet sich aktiv in Entwicklung. Die Banddaten werden aktuell im
Frontend verwaltet und über `localStorage` gespeichert. Ein Backend oder eine
Datenbank ist noch nicht angebunden.

## Tech Stack

- React 19 mit TypeScript
- Vite 8
- Tailwind CSS 4
- HeroUI 3 mit eigenem Light-/Dark-Theme
- TanStack Router mit file-based routing
- Clerk für Authentifizierung
- Zod für Formularvalidierung
- React Compiler über Babel
- ESLint

## Vorhandene Funktionen

### Öffentlicher Bereich

- responsive Startseite mit Konzert-Hero, Hintergrundbild und Ticket-CTA
- gemeinsames `PublicLayout` mit Navbar und Footer
- Light-/Dark-Theme mit Speicherung in `localStorage`
- angepasstes HeroUI-Theme mit semantischen Farb-Tokens
- New-Rocker-Schrift für ausgewählte Display-Überschriften
- öffentliche Lineup-Seite mit bestätigten Bands
- dynamische Band-Detailseiten über `/lineup/$bandId`
- 404-Verhalten bei unbekannten oder nicht bestätigten Bands
- öffentliche Calendar-Seite mit drei Tabs: Friday, Saturday und Sunday
- Calendar-Ansicht als Tabelle nach Uhrzeit und Stage
- Sign-in- und Sign-up-Seiten mit Clerk

### Geschützter Dashboard-Bereich

- Auth-Guard über die pathless Route `_authenticated`
- Redirect zu Sign-in für nicht angemeldete Benutzer
- gemeinsames Dashboard-Layout mit Navigation und verschachteltem `Outlet`
- Dashboard-Navigation zu Übersicht, Bands und neuer Band
- Statistik-Grundlage für Gesamtzahl und Festivaltage
- Admin-Bandliste mit kompakten Banddaten
- Suche nach Bandname und Genre
- Filter nach Status und Stage
- Formular zum Erstellen neuer Bands
- Zod-Validierung für Pflichtfelder und Zeitlogik
- Formular zum Bearbeiten bestehender Bands
- Delete-Funktion mit eigenem HeroUI `AlertDialog`
- Success-Toasts nach Create, Edit und Delete
- Banddaten werden über React Context geteilt und im `localStorage` persistiert

## Routen

| Route | Zugriff | Stand |
| --- | --- | --- |
| `/` | Öffentlich | Hero-Startseite |
| `/lineup` | Öffentlich | bestätigte Bands |
| `/lineup/$bandId` | Öffentlich | Band-Detailseite |
| `/calendar` | Öffentlich | Festival-Zeitplan nach Tag, Uhrzeit und Stage |
| `/tickets` | Öffentlich | Platzhalter |
| `/about` | Öffentlich | Platzhalter |
| `/impressum` | Öffentlich | Platzhalter |
| `/sign-in/$` | Öffentlich | Clerk Sign-in |
| `/sign-up/$` | Öffentlich | Clerk Sign-up |
| `/dashboard` | Geschützt | Dashboard-Statistiken |
| `/dashboard/bands` | Geschützt | Admin-Bandliste mit Suche, Filter und Delete |
| `/dashboard/bands/new` | Geschützt | Formular zum Erstellen einer Band |
| `/dashboard/bands/$bandId` | Geschützt | Admin-Banddetails |
| `/dashboard/bands/$bandId/edit` | Geschützt | Formular zum Bearbeiten einer Band |

## Band-State

Die gemeinsamen Banddaten liegen unter `src/features/bands`.

Der zentrale State wird über einen eigenen Context bereitgestellt:

- `BandProvider` besitzt den echten `bands` State
- `useBands()` liest den Context
- `addBand()` fügt neue Bands hinzu
- `updateBand()` aktualisiert bestehende Bands
- `deleteBand()` entfernt Bands
- Änderungen werden im `localStorage` unter `rock-mein-ding:bands` gespeichert

Dadurch verwenden öffentliche Seiten und Dashboard dieselbe Datenquelle, können
sie aber unterschiedlich darstellen.

## Band-Datenmodell

```ts
interface IBand {
  id: string;
  name: string;
  genre: string;
  members: string[];
  stage: "Apollo North" | "Grand X" | "Side West";
  day: "Friday" | "Saturday" | "Sunday";
  startTime: string;
  endTime: string;
  description: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled";
}
```

## Projektstruktur

```text
src/
|-- features/
|   |-- auth/          Clerk Sign-in und Sign-up
|   |-- bands/         gemeinsame Banddaten, Context und Typen
|   |-- calendar/      öffentlicher Festival-Zeitplan
|   |-- dashboard/     Dashboard, Statistiken und Admin-Bandverwaltung
|   |-- hero/          Hero der Startseite
|   `-- lineup/        öffentliches Lineup und Banddetails
|-- routes/            TanStack File Routes
|-- shared/            wiederverwendbare UI, Layouts, Hooks und Typen
|-- App.tsx            Router und Clerk-Router-Context
|-- App.css            Tailwind, HeroUI-Theme und globale Styles
`-- routeTree.gen.ts   automatisch generierter Route Tree
```

`routeTree.gen.ts` wird von TanStack Router erzeugt und darf nicht manuell
bearbeitet werden.

## Lokale Einrichtung

### Voraussetzungen

- Node.js
- npm
- Clerk Publishable Key

### Installation

```bash
npm install
```

Lege im Projekt eine `.env.local` an:

```env
VITE_CLERK_PUBLISHABLE_KEY=dein_clerk_publishable_key
```

Ohne diesen Key beendet die Anwendung den Start mit `Missing Publishable Key`.

### Entwicklung

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Produktions-Build

```bash
npm run build
```

### Build lokal testen

```bash
npm run preview
```

## Nächste Schritte

- belegte Uhrzeiten beim Erstellen und Bearbeiten von Bands erkennen
- Uhrzeiten abhängig von Day und Stage ausgrauen
- Konfliktprüfung beim Submit ergänzen
- Editformular um weitere Felder erweitern
- Dashboard-Statistiken weiter ausbauen
- Platzhalterseiten für Tickets und About ausarbeiten
- Persistenz später über ein Backend oder eine Datenbank umsetzen
