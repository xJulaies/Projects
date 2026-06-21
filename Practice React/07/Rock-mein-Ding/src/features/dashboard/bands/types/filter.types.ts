import type { IBand } from "../../../bands/types/band.types";

export type TSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

type TBandFiltersProps = {
  statusFilter: TStatusFilter;
  stageFilter: TStageFilter;
  onStatusChange: (status: TStatusFilter) => void;
  onStageChange: (stage: TStageFilter) => void;
};

export type TFilterButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export type TStatusFilter = IBand["status"] | null;
export type TStageFilter = IBand["stage"] | null;

export type TSearchContainerProps = TSearchProps & TBandFiltersProps;
