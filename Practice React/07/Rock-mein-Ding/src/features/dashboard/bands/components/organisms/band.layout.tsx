import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { bandData } from "../../../../bands/data/band.data";
import type { TStatusFilter, TStageFilter } from "../../types/filter.types";
import { DisplayAdminBand } from "../molecules/bands.mol";
import { SearchContainer } from "../molecules/searchContainer.mol";
import { useState } from "react";

export function BandLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TStatusFilter>(null);
  const [stageFilter, setStageFilter] = useState<TStageFilter>(null);

  const search = searchTerm.trim().toLowerCase();

  const filteredBands = bandData.filter((band) => {
    const matchesSearch =
      band.name.toLowerCase().includes(search) ||
      band.genre.toLowerCase().includes(search);
    const matchesStatus = statusFilter === null || band.status === statusFilter;
    const matchesStage = stageFilter === null || band.stage === stageFilter;
    return matchesSearch && matchesStatus && matchesStage;
  });

  if (bandData.length === 0) {
    return <p>No bands found.</p>;
  }

  return (
    <section>
      <Header title="Bands" />
      <SearchContainer
        value={searchTerm}
        onChange={setSearchTerm}
        statusFilter={statusFilter}
        stageFilter={stageFilter}
        onStatusChange={setStatusFilter}
        onStageChange={setStageFilter}
      />
      {filteredBands.length === 0 ? (
        <p>No matching bands found.</p>
      ) : (
        filteredBands.map((band) => (
          <DisplayAdminBand key={band.id} band={band} />
        ))
      )}
    </section>
  );
}
