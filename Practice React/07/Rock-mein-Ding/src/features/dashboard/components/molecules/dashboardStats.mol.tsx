import { useBands } from "../../../bands/context/hooks/useBands";
import { DisplayStatCard } from "../atoms/statCard.atm";

export function DashboardStats() {
  const { bands } = useBands();
  const totalBands = bands.length;
  const fridayBands = bands.filter((band) => band.day === "Friday").length;
  const saturdayBands = bands.filter((band) => band.day === "Saturday").length;
  const sundayBands = bands.filter((band) => band.day === "Sunday").length;

  return (
    <section className="flex flex-col gap-4">
      <div className="text-4xl">
        <DisplayStatCard title="Total bands" content={totalBands} />
      </div>
      <div className="flex gap-4">
        <div>
          <DisplayStatCard title="Friday bands" content={fridayBands} />
        </div>
        <div>
          <DisplayStatCard title="Saturday bands" content={saturdayBands} />
        </div>
        <div>
          <DisplayStatCard title="Sunday bands" content={sundayBands} />
        </div>
      </div>
    </section>
  );
}
