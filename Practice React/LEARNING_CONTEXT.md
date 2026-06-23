# Learning Context

Ich lerne React mit TypeScript über kleine Praxisprojekte. Dieses Dokument ist
mein gemeinsamer Kontext mit Codex, damit Erklärungen, Reviews und Änderungen zu
meinem aktuellen Lernstand passen.

## Arbeitsweise mit Codex

Codex soll:

- als Senior Developer und Mentor agieren
- meinen Code analysieren und mir Konzepte erklären
- keine Dateien ändern, außer ich bitte ausdrücklich darum
- bei Fragen erst erklären, bevor Code vorgeschlagen wird
- Feedback anfängerfreundlich geben, aber mit professioneller Perspektive
- auf bestehende Projektstruktur und lokale Patterns achten
- meine Lernabsicht respektieren: lieber Schritt für Schritt erklären als direkt große fertige Lösungen liefern
- bei Reviews konkret sagen, was korrekt ist, was riskant ist und was der nächste sinnvolle Schritt wäre
- bei Implementierungen danach sinnvoll prüfen, ob Build und/oder Lint laufen
- wenn ich nach dem Erstellen eines neuen Projekts `bereinigen` sage: SVG-Dateien in `public` löschen, `assets` leeren, `App.css` und `index.css` leeren, `App.tsx` von vorgefertigtem HTML befreien und alle überflüssigen Imports/Exports entfernen
- wenn ich Tailwind/DaisyUI einrichten lassen möchte: `npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest` ausführen, `tailwindcss()` in `vite.config` vor `react()` eintragen, `App.css` mit `@import "tailwindcss";` und `@plugin "daisyui";` befüllen und sicherstellen, dass `App.css` importiert wird

## Mein aktueller Lernstand

Ich arbeite an React- und TypeScript-Grundlagen wie:

- Vite React Projekte erstellen
- Komponenten auslagern und importieren
- Props zwischen Parent- und Child-Komponenten übergeben
- Props mit TypeScript typisieren
- Event Handler wie `onClick`, `onChange` und `onSubmit` typisieren und weitergeben
- Callback-Funktionen nutzen, um Werte aus Child-Komponenten an Parent-Komponenten zurückzugeben
- Unterschied zwischen JavaScript-Werten und TypeScript-Types verstehen
- Union Types für erlaubte Werte nutzen
- State als Zustand der UI verstehen
- State mit `useState` setzen und daraus UI neu rendern lassen
- `useEffect` für Side Effects wie API-Requests, Intervalle, localStorage und Cleanup verwenden
- `useContext` und eigene Provider verwenden, um gemeinsamen State durch die App zu teilen
- Custom Hooks bauen, um State-, Context- und Effect-Logik aus Komponenten auszulagern
- einfache Helper-Funktionen auslagern und in Komponenten verwenden
- API-Helper schreiben, die `fetch` kapseln
- Loading- und Error-States im Frontend unterscheiden
- Formulare als controlled components aufbauen
- Formularfehler speichern, anzeigen und nach Korrektur wieder zurücksetzen
- Validierung mit Zod durchführen und Field Errors in UI übersetzen
- Conditional Rendering mit `&&`, `if` und frühem `return` verstehen
- Tailwind/DaisyUI/HeroUI-Klassen für Layout und Design einsetzen
- clientseitiges Routing mit TanStack Router verwenden
- Generated Files wie `routeTree.gen.ts` einordnen
- pathless Route Groups mit Unterstrich-Ordnern in TanStack Router verstehen
- Splat-Routen wie `sign-in.$.tsx` für Catch-all-Unterpfade einordnen
- Authentifizierungsstatus über Clerk lesen und in der UI nutzen
- geschützte Routen mit TanStack Router `beforeLoad` und Router-Context aufbauen

## Aktuelles Hauptprojekt

### `07/Rock-mein-Ding`

Ich baue aktuell ein Festival-Projekt mit React, TypeScript, Vite, Tailwind CSS,
HeroUI, TanStack Router und Clerk.

Das Projekt besteht aus:

- React Frontend mit TypeScript und Vite
- Tailwind CSS 4 über `@tailwindcss/vite`
- HeroUI 3 mit eigenem Light-/Dark-Theme
- TanStack Router mit file-based routing
- Clerk Auth über `@clerk/react`
- Public Pages für Home, Lineup, Calendar, Tickets, About und Impressum
- Sign-in und Sign-up Seiten mit Clerk-Komponenten
- geschütztem Dashboard unter einer `_authenticated` Route Group
- Feature-based Architecture kombiniert mit Atomic Design
- gemeinsamem `PublicLayout` mit Navbar und Footer
- zentralem Text-Content in `textContent.settings.ts`
- gemeinsamem Band-State über React Context
- localStorage Persistenz für Bandänderungen

Wichtige Lernkonzepte in diesem Projekt:

- `BandProvider` besitzt den echten Band-State und stellt `bands`, `addBand`, `updateBand` und `deleteBand` über Context bereit
- `useBands()` kapselt `useContext(BandContext)` und schützt vor Nutzung außerhalb des Providers
- `setBands` im Provider löst Re-renders bei allen Komponenten aus, die `useBands()` verwenden
- public Lineup, public Calendar und Dashboard greifen auf dieselbe Banddatenquelle zu, zeigen sie aber unterschiedlich an
- `ClerkProvider` sitzt in `main.tsx` und umschließt die App
- `BandProvider` sitzt ebenfalls in `main.tsx`, damit öffentliche Seiten und Dashboard denselben Band-State lesen können
- `Toast.Provider` sitzt global in `main.tsx`, damit Create/Edit/Delete Aktionen überall Toasts anzeigen können
- `_authenticated.tsx` ist eine pathless geschützte Layout-Route
- `/dashboard` liegt als Kind unter `_authenticated`, bleibt aber als URL `/dashboard`
- `sign-in` und `sign-up` müssen öffentliche Routen bleiben, nicht unter `_authenticated`
- `routeTree.gen.ts` ist generiert und zeigt, welche URLs TanStack wirklich kennt
- HeroUI `AlertDialog` ersetzt `window.confirm`, wenn ein Dialog stylbar und komponentenbasiert sein soll
- HeroUI `Calendar` ist eher für Datumsauswahl gedacht; für den Festival-Zeitplan passt eine eigene Tabs-/Tabellenstruktur besser
- Zod prüft das neue Bandformular, inklusive Regel: `endTime` muss nach `startTime` liegen
- Formularfehler bleiben sichtbar, bis sie aktiv gelöscht oder durch einen erfolgreichen Submit ersetzt werden
- Bei dynamischen Objekt-Keys bedeutet `{ [field]: value }`: nutze den Wert der Variable als Property-Name

Aktueller Stand von `07/Rock-mein-Ding`:

- öffentliche Startseite ist vorhanden
- öffentliches Lineup zeigt bestätigte Bands und Banddetails
- öffentlicher Calendar zeigt bestätigte Bands in drei Tabs: Friday, Saturday und Sunday
- jeder Calendar-Tab zeigt eine Tabelle nach Uhrzeit und Stage
- Dashboard ist geschützt und hat Navigation
- Dashboard-Bandliste zeigt Bands mit Status, Stage, Day, Time und Member-Anzahl
- Bands können im Dashboard erstellt werden
- Bands können im Dashboard bearbeitet werden, aktuell vor allem Status und Stage
- Bands können im Dashboard gelöscht werden
- Delete nutzt einen eigenen HeroUI `AlertDialog` statt `window.confirm`
- Create, Edit und Delete zeigen Success-Toasts
- Banddaten werden im localStorage gespeichert
- Build und Lint sollten nach größeren Änderungen geprüft werden

Mögliche nächste Schritte für `07/Rock-mein-Ding`:

- Kalender-Konflikte beim Erstellen und Bearbeiten von Bands verhindern
- belegte Uhrzeiten abhängig von Day und Stage ausgrauen
- Konfliktlogik als Helper auslagern, z. B. `newStart < existingEnd && newEnd > existingStart`
- Editformular um Day, Startzeit, Endzeit, Name, Genre, Members und Description erweitern
- Dashboard-Statistiken weiter ausbauen
- Such- und Filterlogik weiter verbessern
- Daten später über Backend oder Datenbank persistieren

## Bisherige Projekte

- `01/vite-project`: erste React/Vite App mit Navbar, Hero, Cards und Footer
- `02/PropsAndStates`: Lernprojekt für Props, State und Events
- `03/Random Name Generator`: Zufallsnamen aus einer Liste anzeigen; übt `useState`, ausgelagerte Helper-Funktionen, Props, Event-Handler und typisierte Komponenten
- `04/Side effects`: Box per Button-Klick farblich ändern; übt Callback-Props mit Wertübergabe, Union Types für Farben, `useEffect` mit `[selectedColor]` und dynamische Tailwind/DaisyUI-Klassen
- `05/YuGiOhDex`: Fullstack-Projekt mit React, Express, MongoDB, Bild-Caching, Routing und Feature/Atomic-Struktur
- `06/Su4u`: Sudoku-Projekt mit React, TypeScript, TanStack Router, Clerk Auth, geschützten Routen und Sudoku-Generator
- `07/Rock-mein-Ding`: Festival-Projekt mit Public Pages, Dashboard, Clerk Auth, HeroUI, Context-State, Formularvalidierung, Toasts und Calendar

## Frühere Hauptprojekt-Notizen

### `06/Su4u`

`06/Su4u` war ein Sudoku-Lernprojekt mit React, TypeScript, Vite, Tailwind CSS,
TanStack Router und Clerk.

Das Projekt besteht aus:

- React Frontend mit TypeScript und Vite
- Tailwind CSS 4 über `@tailwindcss/vite`
- TanStack Router mit file-based routing
- Clerk Auth über `@clerk/react`
- Public Pages für Home, Rules, History, About und Impressum
- Sign-in und Sign-up Seiten mit Clerk-Komponenten
- geschütztem Dashboard unter einer `_authenticated` Route Group
- Sudoku-Spiel mit generiertem Board, Notizenmodus und Fehleranzeige
- Sudoku-Generator mit Backtracking und Unique-Solution-Check
- Feature-based Architecture kombiniert mit Atomic Design
- gemeinsamem `PublicLayout` mit Navbar und Footer
- zentralem Text-Content in `textContent.settings.ts`

Wichtige Lernkonzepte in diesem Projekt:

- Clerk muss konsistent aus einem Paket importiert werden; aktuell soll nur `@clerk/react` verwendet werden
- `ClerkProvider` sitzt in `main.tsx` und umschließt die App
- `useAuth()` wird in `App.tsx` gelesen und als Router-Context an TanStack Router übergeben
- `createRootRouteWithContext<RouterContext>()` verbindet den Root-Router mit dem eigenen Context-Typ
- `_authenticated.tsx` ist eine pathless geschützte Layout-Route
- `/dashboard` liegt als Kind unter `_authenticated`, bleibt aber als URL `/dashboard`
- `sign-in` und `sign-up` müssen öffentliche Routen bleiben, nicht unter `_authenticated`
- Die Navbar nutzt Clerk `Show` und `UserButton`, um je nach Auth-Status Sign-in oder User-Menü anzuzeigen
- Splat-Routen wie `/sign-in/$` sind nützlich für Clerk-Unterpfade, brauchen aber bei Links/Redirects besondere Aufmerksamkeit
- `routeTree.gen.ts` ist generiert und zeigt, welche URLs TanStack wirklich kennt
- Der Sudoku-Generator trennt fachliche Logik von UI-State
- `useSudokuGame` bündelt Board-State, Zellauswahl, Notizenmodus, neue Boards und Zahleneingabe

### `05/YuGiOhDex`

`05/YuGiOhDex` war ein Fullstack-Lernprojekt für Yu-Gi-Oh Karten.

Das Projekt besteht aus:

- React Frontend mit TypeScript, Vite, Tailwind CSS, DaisyUI und TanStack Router
- Express Backend mit TypeScript, MongoDB und Mongoose
- eigener Backend-API als Zwischenschicht zur YGOPRODeck API
- lokalem Lazy-Caching von Kartenbildern
- Kartensuche mit Pagination und `Show more`
- Hero Section mit automatisch wechselnden Random Cards
- Feature-based Architecture kombiniert mit Atomic Design

Wichtige Lernkonzepte in diesem Projekt:

- Backend und Frontend getrennt entwickeln
- eigene API-Routen statt direkter externer API-Zugriffe aus dem Frontend
- MongoDB-Dokumente mit Mongoose speichern und aktualisieren
- Bilder nur bei Bedarf herunterladen und lokal ausliefern
- Suchergebnisse im State speichern und weitere Ergebnisse anhängen
- `useEffect` mit `setInterval` und Cleanup verwenden
- API-Base-URL zentral in einer Config verwalten
- Routen mit TanStack Router aufbauen
- Komponenten nach Feature und Atomic-Level strukturieren

## Bevorzugter Erklärstil

Bitte erkläre Konzepte in einfachen Worten und mit kleinen Beispielen.
Wenn Code nötig ist, zeige ihn knapp und erkläre danach den Datenfluss.

Wichtig: Keine eigenständigen Codeänderungen ohne ausdrückliche Aufforderung.
