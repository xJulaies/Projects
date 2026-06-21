import type { TFormErrorProps } from "../../types/form.types";

export function FormError({ id, message }: TFormErrorProps) {
  if (!message) {
    return null;
  }
  return (
    <span id={id} className="text-sm text-danger" role="alert">
      {message}
    </span>
  );
}
