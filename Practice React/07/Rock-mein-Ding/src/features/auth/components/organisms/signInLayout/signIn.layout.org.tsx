import { PublicLayout } from "../../../../../shared/organisms/templates/public.layout";
import { SignIn } from "@clerk/react";

export function ClerkSignIn() {
  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center p-8">
        <SignIn />
      </div>
    </PublicLayout>
  );
}
