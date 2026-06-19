import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { bandData } from "../../../../bands/data/band.data";
import { DisplayAdminBand } from "../molecules/bands.mol";

export function BandLayout() {
  if (bandData.length === 0) {
    return <p>No bands found.</p>;
  }

  return (
    <section>
      <Header title="Bands" />

      {bandData.map((band) => (
        <DisplayAdminBand key={band.id} band={band} />
      ))}
    </section>
  );
}
