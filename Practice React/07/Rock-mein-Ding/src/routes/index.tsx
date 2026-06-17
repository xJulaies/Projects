import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../shared/organisms/templates/public.layout";
import { HeroLayout } from "../features/hero/components/organisms/templates/hero.layout.org";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <HeroLayout />
    </PublicLayout>
  );
}
