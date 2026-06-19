import { PublicLayout } from "../../../../../shared/organisms/templates/public.layout";
import { SignUp } from "@clerk/react";

export function ClerkSignUp() {
  return (
    <PublicLayout>
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <SignUp />
      </div>
    </PublicLayout>
  );
}
