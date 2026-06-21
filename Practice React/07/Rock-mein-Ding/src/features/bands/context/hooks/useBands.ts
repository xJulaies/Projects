import { useContext } from "react";
import { BandContext } from "../band.context";

export function useBands() {
  const context = useContext(BandContext);

  if (context === undefined) {
    throw new Error("useBands must be used inside a BandProvider");
  }
  return context;
}
