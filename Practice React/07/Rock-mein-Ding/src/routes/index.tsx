import { createFileRoute } from "@tanstack/react-router";
import { HeroLayout } from "../features/hero/components/organisms/templates/hero.layout.org";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HeroLayout />;
}
