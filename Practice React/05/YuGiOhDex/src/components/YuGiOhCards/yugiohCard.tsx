import type { TCard } from "../../types/card.types";
import { hasValue } from "../../lib/cards/getCardDetails.helper";

export function YuGiOhCard({
  name,
  type,
  description,
  imagePath,
  atk,
  def,
  level,
  attribute,
  race,
}: TCard) {
  return (
    <>
      <div className="card bg-base-200 w-72 shadow-sm">
        <figure className="px-6 pt-6 flex items-start justify-center">
          <img
            src={`http://localhost:3000${imagePath}`}
            alt={`An image of the yugioh card ${name}`}
            className="rounded-xl w-52"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-center min-h-8 text-2xl">{name}</h2>
          <p className="text-sm h-32 overflow-y-auto px-2 text-left">
            {description}
          </p>
          <ul className="mt-auto text-sm">
            <li>Type: {type}</li>
            {hasValue(race) && <li>Race: {race}</li>}
            {hasValue(attribute) && <li>Attribute: {attribute}</li>}
            {hasValue(level) && <li>Level: {level}</li>}
            {hasValue(atk) && <li>ATK: {atk}</li>}
            {hasValue(def) && <li>DEF: {def}</li>}
          </ul>
        </div>
      </div>
    </>
  );
}
