import type { IBand } from "../../../bands/types/band.types";

export type TBandPreview = Pick<IBand, "id" | "name" | "genre">;
