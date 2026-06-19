import type { IBand } from "../../../bands/types/band.types";
import { Card } from "@heroui/react";

type BandDetailsProps = {
  band: IBand;
};

export function BandDetails({ band }: BandDetailsProps) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 justify-center px-4 py-8 text-foreground md:px-6 md:py-12">
      <Card variant="secondary" className="w-full max-w-xl">
        <div className="p-2 md:p-4">
          <div className="mb-5 flex items-center justify-between">
            <span className="rounded-full bg-accent px-3 py-2 text-xl text-accent-foreground">
              ♫
            </span>

            <span className="chip chip--success chip--soft chip--md uppercase">
              {band.status}
            </span>
          </div>

          <div className="mb-6">
            <h1 className="new-rocker-regular text-3xl text-foreground">
              {band.name}
            </h1>
            <p className="mt-1 text-sm text-muted">{band.genre}</p>
          </div>

          <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-md bg-surface-tertiary p-4 text-sm">
            <dt className="text-muted">Stage</dt>
            <dd className="font-medium text-foreground">{band.stage}</dd>

            <dt className="text-muted">Day</dt>
            <dd className="font-medium text-foreground">{band.day}</dd>

            <dt className="text-muted">Time</dt>
            <dd className="font-medium text-foreground">
              {band.startTime} - {band.endTime}
            </dd>
          </dl>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase text-accent">
              Members
            </h2>

            <ul className="space-y-2">
              {band.members.map((member) => (
                <li
                  key={member}
                  className="rounded-md bg-surface-tertiary px-3 py-2 text-sm text-surface-tertiary-foreground"
                >
                  {member}
                </li>
              ))}
            </ul>
          </div>

          {band.description && (
            <p className="mt-6 rounded-md bg-surface-tertiary p-4 text-sm leading-relaxed text-muted">
              {band.description}
            </p>
          )}
        </div>
      </Card>
    </section>
  );
}
