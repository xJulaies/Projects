import type { TAdminBandProps } from "../../types/admin.band.types";
import { EditLink } from "./../atoms/bandEdit.atm";
import { BandStatusBadge } from "../atoms/bandStatusBadge.atm";

export function DisplayAdminBand({ band }: TAdminBandProps) {
  return (
    <article className="flex flex-col gap-4 rounded-md border border-border bg-surface p-4 text-surface-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{band.name}</h2>
          <p className="text-sm text-muted">{band.genre}</p>
        </div>

        <BandStatusBadge status={band.status} />
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-md bg-surface-tertiary p-4 text-sm">
        <dt className="text-muted">Stage</dt>
        <dd className="font-medium">{band.stage}</dd>

        <dt className="text-muted">Day</dt>
        <dd className="font-medium">{band.day}</dd>

        <dt className="text-muted">Time</dt>
        <dd className="font-medium">
          {band.startTime} - {band.endTime}
        </dd>

        <dt className="text-muted">Members</dt>
        <dd className="font-medium">{band.members.length}</dd>
      </dl>

      <EditLink bandId={band.id} />
    </article>
  );
}
