import { Button } from "@heroui/react";
import type { TFilterButtonProps } from "../../types/filter.types";

export function FilterButton({ label, isActive, onPress }: TFilterButtonProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant={isActive ? "primary" : "secondary"}
      aria-pressed={isActive}
      onPress={onPress}
      className="capitalize"
    >
      {label}
    </Button>
  );
}
