import { createFileRoute } from "@tanstack/react-router";
import { NewBandFormLayout } from "../../../../features/dashboard/bands/components/organisms/newBand.form.layout";

export const Route = createFileRoute("/_authenticated/dashboard/bands/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewBandFormLayout />;
}
