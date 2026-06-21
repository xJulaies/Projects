import { createFileRoute } from "@tanstack/react-router";
import { useBands } from "../../features/bands/context/hooks/useBands";
import { PublicLayout } from "../../shared/organisms/templates/public.layout";
import { BandDetails } from "../../features/lineup/components/molecules/lineupDetails.mol";

export const Route = createFileRoute("/lineup/$bandId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { bandId } = Route.useParams();
  const { bands } = useBands();
  const band = bands.find(
    (currentBand) =>
      currentBand.id === bandId && currentBand.status === "confirmed",
  );
  if (!band) {
    return (
      <PublicLayout>
        <p className="p-8 text-center">Band not found.</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <BandDetails band={band} />
    </PublicLayout>
  );
}
