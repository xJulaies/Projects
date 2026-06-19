import { PublicLayout } from "../../../../../shared/organisms/templates/public.layout";
import { SignIn } from "@clerk/react";

export function ClerkSignIn() {
  return (
    <PublicLayout>
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <SignIn />
      </div>
    </PublicLayout>
  );
}
