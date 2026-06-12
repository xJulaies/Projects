import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../../layouts/templates/PublicLayout/public.layout.tpl";
import { CardLayout } from "../../layouts/templates/CardLayout/cardLayout.tpl";

export const Route = createFileRoute("/_search/search")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <main className="flex-1">
        <CardLayout />
      </main>
    </PublicLayout>
  );
}
