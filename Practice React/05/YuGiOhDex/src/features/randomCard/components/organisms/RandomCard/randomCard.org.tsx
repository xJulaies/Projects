import { DisplayRandomCard } from "../../molecules/DisplayRandomCard/displayRandomCard.mol";
import { useRandomCard } from "../../../hooks/useRandomCard";
import { RandomCardError } from "../../atoms/RandomCardError/randomCardError.atm";
import { RandomCardSkeleton } from "../../atoms/RandomCardSkeleton/randomCardSkeleton.atm";

export function RandomCard() {
  const { card, isLoading, error } = useRandomCard();

  if (isLoading) {
    return <RandomCardSkeleton />;
  }

  if (error) {
    return <RandomCardError />;
  }

  if (!card) {
    return null;
  }

  return <DisplayRandomCard card={card} />;
}
