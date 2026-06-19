import { createFileRoute } from "@tanstack/react-router";
import { BandLayout } from "../../../../features/dashboard/bands/components/organisms/band.layout";

export const Route = createFileRoute("/_authenticated/dashboard/bands/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BandLayout />;
}
