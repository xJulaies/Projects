import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_game/game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_game/game"!</div>;
}
