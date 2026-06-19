import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/bands/$bandId")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <Outlet />;
}
