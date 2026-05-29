import type { TCurrencyProductCards } from "../../types/product.types";
import { Counter } from "./counter";

import { useState } from "react";

export function CurrencyProductCards({
  name,
  description,
  price,
  category,
  initialStock,
  imageURL,
  alt,
}: TCurrencyProductCards) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleBuyButton() {
    console.log("Buy button clicked");
  }

  function handleFavoriteOnClick() {
    setIsFavorite((currentValue) => !currentValue);
    console.log("Favorite button clicked");
  }
  return (
    <>
      <div className="card relative bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={imageURL} alt={alt} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <button
            onClick={handleFavoriteOnClick}
            type="button"
            className={`btn btn-xs btn-circle absolute right-3 top-3 z-10 ${isFavorite ? "btn-warning" : "btn-ghost"}`}
          >
            ★
          </button>
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions">
            <div className="flex flex gap-2">
              <div>
                <Counter start={0} />
              </div>
            </div>
            <button onClick={handleBuyButton} className="btn btn-primary">
              Buy Now
            </button>
            <div className="badge text-2xl">{price}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
          <div className="badge badge-outline">{initialStock}</div>
        </div>
      </div>
    </>
  );
}
