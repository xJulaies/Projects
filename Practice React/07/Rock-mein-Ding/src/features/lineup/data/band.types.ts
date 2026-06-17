type TBandStatus = "pending" | "confirmed" | "rejected" | "cancelled";
type TStage = "Apollo North" | "Grand X" | "Side West";
type TDay = "Friday" | "Saturday" | "Sunday";

export interface IBand {
  id: string;
  name: string;
  genre: string;
  members: string[];
  stage: TStage;
  day: TDay;
  startTime: string;
  endTime: string;
  description: string;
  status: TBandStatus;
}
