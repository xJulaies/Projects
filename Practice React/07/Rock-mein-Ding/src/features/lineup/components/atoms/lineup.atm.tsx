import { Link } from "@tanstack/react-router";
import type { TBandPreview } from "./lineup.types";

export function DisplayBand({ band }: { band: TBandPreview }) {
  return (
    <Link to="/lineup/$bandId" params={{ bandId: band.id }}>
      <h3>{band.name}</h3>
      <p className="italic">{band.genre}</p>
    </Link>
  );
}
