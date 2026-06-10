import { useState, useEffect } from "react";
import { getRandomCard } from "../api/getRandomCard";
import type { TCard } from "../../../types/card.types";

export function useRandomCard() {
  const [card, setCard] = useState<TCard | null>(null);

  useEffect(() => {
    async function loadRandomCard() {
      const result = await getRandomCard();

      if (!result) return;

      setCard(result.data[0]);
    }
    loadRandomCard();

    const intervalId = setInterval(() => {
      loadRandomCard();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return { card };
}
