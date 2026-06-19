import { Link } from "@tanstack/react-router";
import type { TBandPreview } from "./lineup.types";

export function DisplayBand({ band }: { band: TBandPreview }) {
  return (
    <Link
      className="card card--default group w-full min-w-0 gap-1 transition-colors hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      to="/lineup/$bandId"
      params={{ bandId: band.id }}
    >
      <h3 className="card__title new-rocker-regular text-lg transition-colors group-hover:text-accent">
        {band.name}
      </h3>
      <p className="card__description italic">{band.genre}</p>
    </Link>
  );
}
