import type { ProductCardProps } from "../../types/product-card.types";

export function ProductCard({
  title,
  description,
  tag,
  imageUrl,
  imageAlt,
}: ProductCardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageUrl} alt={imageAlt} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{tag}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn more</button>
        </div>
      </div>
    </div>
  );
}
