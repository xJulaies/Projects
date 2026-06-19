import { Link } from "@tanstack/react-router";
import type { TLinkProps } from "../../lib/types/link.types";

export function FooterLink({ url, label }: TLinkProps) {
  return (
    <Link
      className="rounded-md px-2 py-1 text-muted transition-colors hover:bg-default-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      to={url}
    >
      {label}
    </Link>
  );
}
