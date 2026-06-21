import { useState, useEffect } from "react";
import { bandData } from "../data/band.data";
import type {
  TBandChanges,
  TBandProviderProps,
} from "../types/band.context.types";
import type { IBand } from "../types/band.types";
import { BandContext } from "./band.context";

const STORAGE_KEY = "rock-mein-ding:bands";

function getInitialBands(): IBand[] {
  const storedBands = localStorage.getItem(STORAGE_KEY);

  if (!storedBands) {
    return bandData;
  }
  try {
    const parsedBands: unknown = JSON.parse(storedBands);

    if (!Array.isArray(parsedBands)) {
      return bandData;
    }
    return parsedBands as IBand[];
  } catch {
    return bandData;
  }
}

export function BandProvider({ children }: TBandProviderProps) {
  const [bands, setBands] = useState<IBand[]>(getInitialBands);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bands));
    } catch (error) {
      console.log("Could not save band:", error);
    }
  }, [bands]);

  function addBand(newBand: IBand): void {
    setBands((prev) => [...prev, newBand]);
  }

  function updateBand(bandId: string, changes: TBandChanges): void {
    setBands((previousBands) =>
      previousBands.map((band) =>
        band.id === bandId ? { ...band, ...changes } : band,
      ),
    );
  }

  function deleteBand(bandId: string): void {
    setBands((prev) => prev.filter((band) => band.id !== bandId));
  }

  return (
    <BandContext.Provider value={{ bands, addBand, updateBand, deleteBand }}>
      {children}
    </BandContext.Provider>
  );
}
