import { Link } from "@tanstack/react-router";
import type { TGetStartedBtnProps } from "./public.hero.btn.types";

export function GetStartedBtn({ text }: TGetStartedBtnProps) {
  return (
    <Link to="/search" className="btn btn-primary btn-xl">
      {text}
    </Link>
  );
}
