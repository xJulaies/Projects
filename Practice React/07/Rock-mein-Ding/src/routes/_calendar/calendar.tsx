import { createFileRoute } from "@tanstack/react-router";
import { CalendarLayout } from "../../features/calendar/components/organisms/calendar.layout.org";

export const Route = createFileRoute("/_calendar/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CalendarLayout />;
}
