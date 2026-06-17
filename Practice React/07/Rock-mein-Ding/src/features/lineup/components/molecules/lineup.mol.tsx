import { lineUpData } from "../../data/band.data";
import { DisplayBand } from "./../atoms/lineup.atm";

export function Lineup() {
  const fridayBands = lineUpData.filter((band) => band.day === "Friday");
  const saturdayBands = lineUpData.filter((band) => band.day === "Saturday");
  const sundayBands = lineUpData.filter((band) => band.day === "Sunday");

  return (
    <section className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl">Friday</h2>
        {fridayBands.map((band) => (
          <DisplayBand key={band.id} band={band} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl">Saturday</h2>
        {saturdayBands.map((band) => (
          <DisplayBand key={band.id} band={band} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl">Sunday</h2>
        {sundayBands.map((band) => (
          <DisplayBand key={band.id} band={band} />
        ))}
      </div>
    </section>
  );
}
