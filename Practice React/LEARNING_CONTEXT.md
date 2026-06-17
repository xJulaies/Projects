# Learning Context

Ich lerne React mit TypeScript über kleine Praxisprojekte.

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
- `useEffect` für Side Effects wie API-Requests, Intervalle und Cleanup verwenden
- Custom Hooks bauen, um State- und Effect-Logik aus Komponenten auszulagern
- einfache Helper-Funktionen auslagern und in Komponenten verwenden
- API-Helper schreiben, die `fetch` kapseln
- Loading- und Error-States im Frontend unterscheiden
- Conditional Rendering mit `&&`, `if` und frühem `return` verstehen
- Tailwind/DaisyUI-Klassen für Layout und Design einsetzen
- clientseitiges Routing mit TanStack Router verwenden
- Generated Files wie `routeTree.gen.ts` einordnen
- pathless Route Groups mit Unterstrich-Ordnern in TanStack Router verstehen
- Splat-Routen wie `sign-in.$.tsx` für Catch-all-Unterpfade einordnen
- Authentifizierungsstatus über Clerk lesen und in der UI nutzen
- geschützte Routen mit TanStack Router `beforeLoad` und Router-Context aufbauen

## Aktuelles Hauptprojekt

### `06/Su4u`

Ich baue aktuell ein Sudoku-Lernprojekt mit React, TypeScript, Vite, Tailwind CSS, TanStack Router und Clerk.

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

Aktueller Stand von `06/Su4u`:

- `@clerk/clerk-react` wurde entfernt; das Projekt nutzt jetzt `@clerk/react`
- Build und Lint liefen nach der Entfernung erfolgreich
- Die README von Projekt 06 wurde projektspezifisch ergänzt
- Das Dashboard ist noch ein einfacher Platzhalter
- Der Auth-Redirect zur Splat-Route sollte weiter getestet werden
- Mögliche nächste Schritte: Dashboard ausbauen, Dashboard-Link nur für eingeloggte User anzeigen, Sudoku-Siegzustand und Schwierigkeitsgrade ergänzen

## Bisherige Projekte

- `01/vite-project`: erste React/Vite App mit Navbar, Hero, Cards und Footer
- `02/PropsAndStates`: Lernprojekt für Props, State und Events
- `03/Random Name Generator`: Zufallsnamen aus einer Liste anzeigen; übt `useState`, ausgelagerte Helper-Funktionen, Props, Event-Handler und typisierte Komponenten
- `04/Side effects`: Box per Button-Klick farblich ändern; übt Callback-Props mit Wertübergabe, Union Types für Farben, `useEffect` mit `[selectedColor]` und dynamische Tailwind/DaisyUI-Klassen
- `05/YuGiOhDex`: Fullstack-Projekt mit React, Express, MongoDB, Bild-Caching, Routing und Feature/Atomic-Struktur
- `06/Su4u`: Sudoku-Projekt mit React, TypeScript, TanStack Router, Clerk Auth, geschützten Routen und Sudoku-Generator

## Frühere Hauptprojekt-Notizen

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
