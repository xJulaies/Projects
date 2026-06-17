import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lineup/$bandId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/lineup/$bandId"!</div>;
}
