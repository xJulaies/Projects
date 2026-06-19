import { Link } from "@tanstack/react-router";

export function EditLink({ bandId }: { bandId: string }) {
  return (
    <Link
      to="/dashboard/bands/$bandId/edit"
      params={{ bandId }}
      className="w-fit rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      Edit
    </Link>
  );
}
