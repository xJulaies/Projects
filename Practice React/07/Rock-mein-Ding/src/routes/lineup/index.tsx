import { createFileRoute } from "@tanstack/react-router";
import { LineupLayout } from "../../features/lineup/components/organisms/lineupTemplate/lineup.layout.org";
export const Route = createFileRoute("/lineup/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LineupLayout />;
}
