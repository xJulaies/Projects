import { createFileRoute, notFound } from "@tanstack/react-router";
import { bandData } from "../../features/bands/data/band.data";
import { PublicLayout } from "../../shared/organisms/templates/public.layout";
import { BandDetails } from "../../features/lineup/components/molecules/lineupDetails.mol";

export const Route = createFileRoute("/lineup/$bandId")({
  loader: ({ params }) => {
    const band = bandData.find(
      (band) => band.id === params.bandId && band.status === "confirmed",
    );
    if (!band) {
      throw notFound();
    }
    return band;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const band = Route.useLoaderData();
  return (
    <PublicLayout>
      <BandDetails band={band} />
    </PublicLayout>
  );
}
