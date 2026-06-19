import { useState } from "react";
import type { IBand } from "../../../../bands/types/band.types";

type TBandEditFormProps = {
  band: IBand;
};

const statusOptions: IBand["status"][] = [
  "confirmed",
  "pending",
  "rejected",
  "cancelled",
];

const stageOptions: IBand["stage"][] = ["Apollo North", "Grand X", "Side West"];

const statusClasses: Record<IBand["status"], string> = {
  confirmed: "chip--success",
  pending: "chip--warning",
  rejected: "chip--danger",
  cancelled: "chip--danger",
};

export function BandEditForm({ band }: TBandEditFormProps) {
  const [status, setStatus] = useState<IBand["status"]>(band.status);
  const [stage, setStage] = useState<IBand["stage"]>(band.stage);

  return (
    <article className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-md border border-border bg-surface p-6 text-surface-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{band.name}</h1>
          <p className="text-sm text-muted">{band.genre}</p>
        </div>

        <span
          className={`chip ${statusClasses[status]} chip--soft chip--sm uppercase`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as IBand["status"])
            }
            className="capitalize rounded-md border border-border bg-field-background px-3 py-2 text-field-foreground outline-none focus:border-focus focus:ring-2 focus:ring-focus/30"
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Stage
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value as IBand["stage"])}
            className="rounded-md border border-border bg-field-background px-3 py-2 text-field-foreground outline-none focus:border-focus focus:ring-2 focus:ring-focus/30"
          >
            {stageOptions.map((stageOption) => (
              <option key={stageOption} value={stageOption}>
                {stageOption}
              </option>
            ))}
          </select>
        </label>
      </div>
    </article>
  );
}
