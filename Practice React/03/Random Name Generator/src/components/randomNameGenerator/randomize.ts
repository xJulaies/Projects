import type { TNames } from "../../types/names.types";
export function getRandomName(names: TNames) {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
