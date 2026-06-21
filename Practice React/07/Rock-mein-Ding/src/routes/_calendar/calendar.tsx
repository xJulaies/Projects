import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../../shared/atoms/headers/header.atm";
import { PublicLayout } from "../../shared/organisms/templates/public.layout";

export const Route = createFileRoute("/_calendar/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <Header title="Calendar" />
    </PublicLayout>
  );
}
