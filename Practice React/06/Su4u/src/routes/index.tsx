import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../shared/templates/publicLayout/public.layout.tpl";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <main></main>
    </PublicLayout>
  );
}
