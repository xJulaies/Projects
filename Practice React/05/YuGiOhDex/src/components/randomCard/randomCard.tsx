import { useState, useEffect } from "react";
import { getRandomCard } from "../../lib/api/getRandomCard";
import { DisplayRandomCard } from "./display.randomCard";
import type { TCard } from "../../types/card.types";

export function RandomCard() {
  const [card, setCard] = useState<TCard | null>(null);

  useEffect(() => {
    async function loadRandomCard() {
      const result = await getRandomCard();
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

  return <>{card && <DisplayRandomCard card={card} />}</>;
}
