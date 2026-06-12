import type { TDisplayRandomCardProps } from "../../../types/randomCard.types";
import { getApiUrl } from "../../../../../shared/lib/api.config";

export function DisplayRandomCard({ card }: TDisplayRandomCardProps) {
  return (
    <>
      <div className="card w-104 p-4 m-4">
        <figure className="px-6 pt-6 flex items-start justify-center">
          <img
            src={getApiUrl(card.imagePath)}
            alt={`An image of the yugioh card ${card.name}`}
            className="rounded-xl w-80"
          />
        </figure>
      </div>
    </>
  );
}
