import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "../../../features/dashboard/components/organisms/dashboard.layout";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardLayout />;
}
