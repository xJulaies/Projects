import { Link } from "@tanstack/react-router";
import type { TLinkProps } from "../../lib/types/link.types";

export function NavbarLink({ url, label }: TLinkProps) {
  return (
    <Link
      className="rounded-md px-3 py-2 text-overlay-foreground transition-colors hover:bg-default-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-overlay"
      to={url}
    >
      {label}
    </Link>
  );
}
