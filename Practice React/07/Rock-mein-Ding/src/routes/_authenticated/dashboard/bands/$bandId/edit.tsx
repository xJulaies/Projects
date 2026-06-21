import { createFileRoute } from "@tanstack/react-router";
import { useBands } from "../../../../../features/bands/context/hooks/useBands";
import { BandEditForm } from "../../../../../features/dashboard/bands/components/organisms/bandEdit.form.layout";

export const Route = createFileRoute(
  "/_authenticated/dashboard/bands/$bandId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { bandId } = Route.useParams();
  const { bands } = useBands();

  const band = bands.find((currentBand) => currentBand.id === bandId);

  if (!band) {
    return <p className="p-4 text-danger">Band not found.</p>;
  }

  return <BandEditForm band={band} />;
}
