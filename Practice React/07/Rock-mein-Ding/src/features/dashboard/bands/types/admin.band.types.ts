import type { IBand } from "../../../bands/types/band.types";

export type TAdminBandProps = {
  band: IBand;
};

export type TBandStatusBadgeProps = {
  status: IBand["status"];
};

export type TDeleteBandProps = {
  bandName: string;
  onConfirm: () => void;
};

export type TSelectFieldParams = {
  field: "stage" | "day" | "startTime" | "endTime" | "status";
  key: string | number | null;
};

export type TAdminNewBandForm = {
  name: string;
  genre: string;
  members: string;
  stage: IBand["stage"];
  day: IBand["day"];
  startTime: string;
  endTime: string;
  description: string;
  status: IBand["status"];
};
