import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../shared/atoms/headers/header.atm";
export const Route = createFileRoute("/_about/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <Header title="About" />
    </PublicLayout>
  );
}
