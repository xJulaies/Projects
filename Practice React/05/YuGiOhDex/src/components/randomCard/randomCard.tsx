import { DisplayRandomCard } from "./display.randomCard";
import { useRandomCard } from "../../hooks/useRandomCard";

export function RandomCard() {
  const { card } = useRandomCard();

  return <>{card && <DisplayRandomCard card={card} />}</>;
}
