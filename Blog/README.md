# Blog

Ein Fullstack-Blog-Projekt mit `Express`, `Prisma`, `PostgreSQL`, `Clerk`, `Vite` und `Tailwind CSS`.

Das Projekt bildet die Kernfunktionen einer modernen Blog-Anwendung ab: Nutzer können sich über Clerk registrieren und anmelden, Beiträge erstellen, Beiträge anderer Nutzer lesen, Kommentare verfassen und öffentliche Profilseiten aufrufen. Das Backend stellt dafür eine validierte REST-API mit Authentifizierung, Ownership-Prüfungen und sauber getrennten Routen für Posts, Comments und User-Content bereit. Das Frontend konsumiert diese API direkt, zeigt Feed, Detailseiten und Profilansichten an und verbindet die Authentifizierung mit den schreibenden Aktionen.

## Was das Projekt erfüllt

- Öffentliche Feed-Ansicht für alle Posts
- Detailseiten für einzelne Posts
- Kommentare pro Post
- Öffentliche User-Profile mit Posts und Kommentaren eines Users
- Geschützte Create-, Update- und Delete-Aktionen für authentifizierte Nutzer
- Validierung von `body`, `params` und `headers` über `Zod`
- Authentifizierung und User-Handling über `Clerk`
- Persistenz über `Prisma` und `PostgreSQL`
- Responsives Frontend mit `Vite` und `Tailwind CSS`

## Tech Stack

- Backend: `Node.js`, `Express`, `Prisma`, `PostgreSQL`, `Zod`, `Clerk`
- Frontend: `Vite`, Vanilla JavaScript, `Tailwind CSS`, `Clerk`

## Hinweis zu Agentic Coding

Dieses Projekt wurde teilweise mit agentic coding entwickelt. Darunter fällt vor allem die strukturierte Zusammenarbeit mit einem Coding-Agenten für Architekturentscheidungen, API-Aufbau, Validierung, UI-Iteration, Debugging und Refactoring. Konzeption, Entscheidungen, Anpassungen und Tests wurden dabei bewusst begleitet und überprüft, statt Code nur blind generieren zu lassen.

## Projektziel

Ziel des Projekts ist es, ein kleines, aber vollständiges Blog-System aufzubauen, das sowohl im Backend als auch im Frontend reale Produktanforderungen abbildet: Auth, Datenmodellierung, saubere API-Struktur, Ownership-Checks, Profilansichten und eine benutzbare Oberfläche für Desktop und Mobile.
