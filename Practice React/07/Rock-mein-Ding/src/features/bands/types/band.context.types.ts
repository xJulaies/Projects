import type { ReactNode } from "react";
import type { IBand } from "./band.types";

export type TBandChanges = Partial<Omit<IBand, "id">>;

export type TBandContextValue = {
  bands: IBand[];
  addBand: (band: IBand) => void;
  updateBand: (bandId: string, changes: TBandChanges) => void;
  deleteBand: (bandId: string) => void;
};

export type TBandProviderProps = {
  children: ReactNode;
};
