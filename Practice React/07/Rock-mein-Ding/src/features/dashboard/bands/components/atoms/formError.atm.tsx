import type { TFormErrorProps } from "../../types/admin.band.types";

export function FormError({ message }: TFormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <span className="text-sm text-danger" role="alert">
      {message}
    </span>
  );
}
