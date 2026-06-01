# Random Name Generator

Kleine React- und TypeScript-Übungsapp zum Arbeiten mit Komponenten, Props, State und einfachen Utility-Funktionen.

## Projektidee

Die App zeigt eine Liste von Namen an und kann per Button einen zufälligen Namen aus dieser Liste auswählen. Der aktuell ausgewählte Name wird im Generator-Bereich angezeigt.

## Umgesetzte Inhalte

- Vite React App mit TypeScript
- Styling mit Tailwind CSS und DaisyUI
- Namensliste als ausgelagerte Datenquelle
- Utility-Funktion `getRandomName` für die Zufallsauswahl
- State in `RandomizeName` für den aktuell angezeigten Namen
- Ausgelagerte Komponenten für Button, Namensanzeige und alle Namen
- Grid-Layout für die komplette Namensliste

## Wichtige Dateien

- `src/components/randomNameGenerator/names.ts`: Liste aller Namen
- `src/components/randomNameGenerator/randomize.ts`: Zufallslogik
- `src/components/randomNameGenerator/randomNameGenerator.tsx`: Generator mit State
- `src/components/randomNameGenerator/randomize.button.tsx`: Button-Komponente
- `src/components/randomNameGenerator/display.name.tsx`: Anzeige des ausgewählten Namens
- `src/components/DisplayAllNames/all.names.tsx`: Grid mit allen Namen

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```
