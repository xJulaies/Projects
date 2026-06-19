# Rock mein Ding

`Rock mein Ding` ist ein React-Lernprojekt fuer eine mehrtaegige
Konzertveranstaltung. Die Anwendung stellt das bestaetigte Lineup oeffentlich
dar und bereitet einen geschuetzten Dashboard-Bereich zur Verwaltung der Bands
vor.

Das Projekt befindet sich aktiv in Entwicklung. Die Banddaten sind aktuell
lokale Dummy-Daten und werden noch nicht ueber ein Backend gespeichert.

## Tech Stack

- React 19 mit TypeScript
- Vite 8
- Tailwind CSS 4
- HeroUI 3 mit eigenem Light-/Dark-Theme
- TanStack Router mit file-based routing
- Clerk fuer Authentifizierung
- React Compiler ueber Babel
- ESLint

## Vorhandene Funktionen

### Oeffentlicher Bereich

- Responsive Startseite mit Konzert-Hero, Hintergrundbild und Ticket-CTA
- Gemeinsames `PublicLayout` mit Navbar und Footer
- Light-/Dark-Theme mit Speicherung in `localStorage`
- Angepasstes HeroUI-Theme mit semantischen Farb-Tokens
- New-Rocker-Schrift fuer ausgewaehlte Display-Ueberschriften
- Oeffentliche Lineup-Seite mit drei Festivaltagen
- Anzeige ausschliesslich bestaetigter Bands im oeffentlichen Lineup
- Dynamische Band-Detailseiten ueber `/lineup/$bandId`
- 404-Verhalten bei unbekannten oder nicht bestaetigten Bands
- Sign-in- und Sign-up-Seiten mit Clerk

### Geschuetzter Dashboard-Bereich

- Auth-Guard ueber die pathless Route `_authenticated`
- Redirect zu Sign-in fuer nicht angemeldete Benutzer
- Gemeinsames Dashboard-Layout mit Navigation und verschachteltem `Outlet`
- Dashboard-Navigation zu Uebersicht, Bands und neuer Band
- Statistik-Grundlage fuer:
  - Gesamtzahl der Bands
  - Bands am Freitag
  - Bands am Samstag
  - Bands am Sonntag
- Admin-Bandliste mit kompakten Banddaten und Edit-Link
- Verschachtelte Routen fuer Banddetails und Bearbeitung

Die Formulare fuer neue Bands und zum Bearbeiten bestehender Bands sind noch
nicht implementiert. Statusaenderungen werden ebenfalls noch nicht dauerhaft
gespeichert.

## Routen

| Route | Zugriff | Stand |
| --- | --- | --- |
| `/` | Oeffentlich | Hero-Startseite |
| `/lineup` | Oeffentlich | Bestaetigte Bands nach Tagen |
| `/lineup/$bandId` | Oeffentlich | Band-Detailseite |
| `/calendar` | Oeffentlich | Platzhalter |
| `/tickets` | Oeffentlich | Platzhalter |
| `/about` | Oeffentlich | Platzhalter |
| `/impressum` | Oeffentlich | Platzhalter |
| `/sign-in/$` | Oeffentlich | Clerk Sign-in |
| `/sign-up/$` | Oeffentlich | Clerk Sign-up |
| `/dashboard` | Geschuetzt | Dashboard-Statistiken |
| `/dashboard/bands` | Geschuetzt | Admin-Bandliste |
| `/dashboard/bands/new` | Geschuetzt | Platzhalter fuer neues Bandformular |
| `/dashboard/bands/$bandId` | Geschuetzt | Platzhalter fuer Admin-Details |
| `/dashboard/bands/$bandId/edit` | Geschuetzt | Platzhalter fuer Editformular |

## Band-Datenmodell

Eine Band besitzt aktuell folgende Daten:

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

Die gemeinsamen Banddaten und Typen liegen unter `src/features/bands`. Das
oeffentliche Lineup und das Admin-Dashboard greifen auf dieselbe Datenquelle
zu, stellen sie aber unterschiedlich dar.

## Projektstruktur

```text
src/
|-- features/
|   |-- auth/          Clerk Sign-in und Sign-up
|   |-- bands/         Gemeinsame Banddaten und Typen
|   |-- dashboard/     Dashboard, Statistiken und Admin-Bandverwaltung
|   |-- hero/          Hero der Startseite
|   `-- lineup/        Oeffentliches Lineup und Banddetails
|-- routes/            TanStack File Routes
|-- shared/            Wiederverwendbare UI, Layouts, Hooks und Typen
|-- App.tsx            Router und Clerk-Router-Context
|-- App.css            Tailwind, HeroUI-Theme und globale Styles
`-- routeTree.gen.ts   Automatisch generierter Route Tree
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

## Naechste Schritte

- Dashboard-Bandliste gestalten
- Suche und Filter fuer Name, Status, Tag und Buehne ergaenzen
- Gemeinsamen editierbaren Band-State einfuehren
- Formular zum Erstellen einer Band bauen
- Formular zum Bearbeiten und Aendern des Status bauen
- Dashboard-Statistiken weiter ausbauen
- Calendar als Zeitplan nach Tag, Uhrzeit und Buehne umsetzen
- Persistenz ueber ein Backend oder eine Datenbank ergaenzen
