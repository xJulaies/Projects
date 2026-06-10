import type { TCardSearch } from "../types/search.types";

export async function getCard({ cardName, page }: TCardSearch) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/cards/search/${cardName}?page=${page}`,
    );
    if (!response.ok) {
      throw new Error("Could not fetch Data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
