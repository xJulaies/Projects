import { Link } from "@tanstack/react-router";

import type { TButtonTextProps } from "../../lib/types/button.types";

export function SignInLink({ text }: TButtonTextProps) {
  return (
    <Link to="/sign-in/$" className="button button--secondary button--sm">
      {text}
    </Link>
  );
}
