import { bandData } from "../../../bands/data/band.data";
import { DisplayBand } from "./../atoms/lineup.atm";

export function Lineup() {
  const festivalDays = ["Friday", "Saturday", "Sunday"] as const;

  const confirmedBands = bandData.filter((band) => band.status === "confirmed");

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 pb-10 md:grid-cols-3 md:px-6">
      {festivalDays.map((day) => {
        const bandsForDay = confirmedBands.filter((band) => band.day === day);

        return (
          <div key={day} className="flex min-w-0 flex-col gap-3">
            <h2 className="new-rocker-regular text-center text-3xl text-accent md:text-left">
              {day}
            </h2>

            {bandsForDay.map((band) => (
              <DisplayBand key={band.id} band={band} />
            ))}
          </div>
        );
      })}
    </section>
  );
}
