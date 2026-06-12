import type { TCardSearch } from "../types/search.types";
import { getApiUrl } from "../../../shared/lib/api.config";

export async function getCard({ cardName, page }: TCardSearch) {
  try {
    const response = await fetch(
      getApiUrl(`/api/cards/search/${encodeURIComponent(cardName)}?page=${page}`),
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
