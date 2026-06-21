import { CalendarBand } from "../atoms/calendarBand.atm";
import type { TCalendarDayProps } from "../../types/calender.types";
import type { IBand } from "../../../bands/types/band.types";

const festivalStages: IBand["stage"][] = [
  "Apollo North",
  "Grand X",
  "Side West",
];

export function CalendarDay({ bands }: TCalendarDayProps) {
  const startTimes = [...new Set(bands.map((band) => band.startTime))].toSorted(
    (firstTime, secondTime) => firstTime.localeCompare(secondTime),
  );

  if (bands.length === 0) {
    return <p className="text-muted">No bands scheduled.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-3xl border-collapse bg-surface text-left">
        <thead className="bg-surface-tertiary">
          <tr>
            <th scope="col" className="w-24 p-4 text-sm font-semibold">
              Time
            </th>
            {festivalStages.map((stage) => (
              <th
                key={stage}
                scope="col"
                className="min-w-52 border-l border-border p-4 text-sm font-semibold"
              >
                {stage}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {startTimes.map((startTime) => (
            <tr key={startTime} className="border-t border-border">
              <th
                scope="row"
                className="p-4 align-top font-mono text-sm font-semibold tabular-nums text-foreground"
              >
                {startTime}
              </th>

              {festivalStages.map((stage) => {
                const bandsInSlot = bands.filter(
                  (band) =>
                    band.startTime === startTime && band.stage === stage,
                );

                return (
                  <td
                    key={stage}
                    className="border-l border-border p-3 align-top"
                  >
                    {bandsInSlot.length === 0 ? (
                      <span className="text-muted">—</span>
                    ) : (
                      <div className="grid gap-2">
                        {bandsInSlot.map((band) => (
                          <CalendarBand key={band.id} band={band} />
                        ))}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
