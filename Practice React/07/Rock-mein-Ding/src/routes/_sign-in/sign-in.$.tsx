import { createFileRoute } from "@tanstack/react-router";
import { ClerkSignIn } from "../../features/auth/components/organisms/signInLayout/signIn.layout.org";

export const Route = createFileRoute("/_sign-in/sign-in/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ClerkSignIn />;
}
