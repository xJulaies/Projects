import { SearchBar } from "../atoms/searchbar.atm";
import { FilterButton } from "../atoms/filter.btn.atm";
import type { IBand } from "../../../../bands/types/band.types";
import type { TSearchContainerProps } from "../../types/filter.types";

const statusOptions: IBand["status"][] = [
  "confirmed",
  "pending",
  "rejected",
  "cancelled",
];

const stageOptions: IBand["stage"][] = ["Apollo North", "Grand X", "Side West"];

export function SearchContainer({
  value,
  onChange,
  statusFilter,
  stageFilter,
  onStatusChange,
  onStageChange,
}: TSearchContainerProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <SearchBar value={value} onChange={onChange} />
      <fieldset className="grid gap-2 border-0 p-2">
        <legend className="text-sm font-semibold">Status</legend>

        <div className="flex flex-wrap gap-3">
          {statusOptions.map((status) => (
            <FilterButton
              key={status}
              label={status}
              isActive={statusFilter === status}
              onPress={() =>
                onStatusChange(statusFilter === status ? null : status)
              }
            />
          ))}
        </div>
      </fieldset>
      <fieldset className="grid gap-2 border-0 p-2">
        <legend className="text-sm font-semibold">Stage</legend>

        <div className="flex flex-wrap gap-3">
          {stageOptions.map((stage) => (
            <FilterButton
              key={stage}
              label={stage}
              isActive={stageFilter === stage}
              onPress={() =>
                onStageChange(stageFilter === stage ? null : stage)
              }
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
