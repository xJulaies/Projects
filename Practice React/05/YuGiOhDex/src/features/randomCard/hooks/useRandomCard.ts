import { useState, useEffect } from "react";
import { getRandomCard } from "../api/getRandomCard";
import type { TCard } from "../../../types/card.types";

export function useRandomCard() {
  const [card, setCard] = useState<TCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRandomCard() {
      try {
        setError(false);

        const result = await getRandomCard();
        setCard(result.data[0]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadRandomCard();

    const intervalId = setInterval(() => {
      loadRandomCard();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return { card, isLoading, error };
}
