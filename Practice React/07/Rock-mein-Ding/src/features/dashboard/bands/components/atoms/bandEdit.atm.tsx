import { Link } from "@tanstack/react-router";

export function EditLink({ bandId }: { bandId: string }) {
  return (
    <Link
      to="/dashboard/bands/$bandId/edit"
      params={{ bandId }}
      className="w-fit cursor-pointer rounded-md bg-accent px-4 py-2 font-medium text-accent-foreground transition-opacity hover:opacity-90"
    >
      Edit
    </Link>
  );
}
