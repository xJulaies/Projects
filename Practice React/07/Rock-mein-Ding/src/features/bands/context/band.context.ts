import { createContext } from "react";
import type { TBandContextValue } from "../types/band.context.types";

export const BandContext = createContext<TBandContextValue | undefined>(
  undefined,
);
