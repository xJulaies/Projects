import type { IBand } from "../../../../bands/types/band.types";
import type { TBandStatusBadgeProps } from "../../types/admin.band.types";

const statusClasses: Record<IBand["status"], string> = {
  confirmed: "chip--success",
  pending: "chip--warning",
  rejected: "chip--danger",
  cancelled: "chip--danger",
};

export function BandStatusBadge({ status }: TBandStatusBadgeProps) {
  return (
    <span
      className={`chip ${statusClasses[status]} chip--soft chip--sm uppercase`}
    >
      {status}
    </span>
  );
}
