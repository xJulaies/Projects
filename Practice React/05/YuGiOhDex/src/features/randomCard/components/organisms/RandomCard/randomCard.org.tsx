import { DisplayRandomCard } from "../../molecules/DisplayRandomCard/displayRandomCard.mol";
import { useRandomCard } from "../../../hooks/useRandomCard";

export function RandomCard() {
  const { card } = useRandomCard();

  return <>{card && <DisplayRandomCard card={card} />}</>;
}
