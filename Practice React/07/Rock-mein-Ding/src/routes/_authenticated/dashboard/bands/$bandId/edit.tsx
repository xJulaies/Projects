import { createFileRoute } from "@tanstack/react-router";
import { bandData } from "../../../../../features/bands/data/band.data";
import { BandEditForm } from "../../../../../features/dashboard/bands/components/organisms/bandEdit.form.layout";

export const Route = createFileRoute(
  "/_authenticated/dashboard/bands/$bandId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { bandId } = Route.useParams();
  const band = bandData.find((currentBand) => currentBand.id === bandId);

  if (!band) {
    return <p className="p-4 text-danger">Band not found.</p>;
  }

  return <BandEditForm band={band} />;
}
