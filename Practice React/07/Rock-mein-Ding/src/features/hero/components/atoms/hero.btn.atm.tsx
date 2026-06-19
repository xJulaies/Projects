import { Link } from "@tanstack/react-router";
import type { THeroBtnProps } from "../../types/hero.btn.types";

export function DisplayTicketsBtn({ url, label }: THeroBtnProps) {
  return (
    <Link
      className="button button--primary button--lg new-rocker-regular"
      to={url}
    >
      {label}
    </Link>
  );
}
