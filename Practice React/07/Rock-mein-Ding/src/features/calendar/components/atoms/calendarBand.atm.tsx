import type { TBandProps } from "../../../bands/types/band.types";

export function CalendarBand({ band }: TBandProps) {
  return (
    <article className="rounded-md bg-surface-tertiary p-3">
      <h3 className="font-semibold text-foreground">{band.name}</h3>
      <p className="mt-1 text-sm text-muted">until {band.endTime}</p>
    </article>
  );
}
