import { Link } from "@tanstack/react-router";
import type { THeroBtnProps } from "../../types/hero.btn.types";

export function DisplayTicketsBtn({ url, label }: THeroBtnProps) {
  return (
    <Link
      className=" inline-flex items-center justify-center px-5 py-3 bg-white "
      to={url}
    >
      {label}
    </Link>
  );
}
