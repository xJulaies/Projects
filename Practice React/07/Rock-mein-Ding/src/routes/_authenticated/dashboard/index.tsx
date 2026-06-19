import { createFileRoute } from "@tanstack/react-router";
import { DashboardStats } from "../../../features/dashboard/components/molecules/dashboardStats.mol";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardStats />;
}
