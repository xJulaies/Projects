import { SignInLink } from "../../atoms/navbar/signIn";
import { NavbarLink } from "../../atoms/navbar/public.navbarLink.atm";
import { ReturnHomeLink } from "./returnHome.mol";
import { Show, UserButton } from "@clerk/react";

export function PublicNavbar() {
  return (
    <header className="relative z-50 p-4">
      <nav className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border px-3 py-2 text-sm font-medium transition hover:text-primary">
              Menu
            </summary>

            <div className="absolute left-0 top-full bg-white flex min-w-40 flex-col gap-4 rounded-md border text-sm shadow-lg p-4">
              <NavbarLink url="/dashboard" label="Dashboard" />
              <NavbarLink url="/events" label="Events" />
              <NavbarLink url="/tickets" label="Tickets" />
            </div>
          </details>
        </div>
        <div className="justify-self-center">
          <ReturnHomeLink />
        </div>
        <div className="justify-self-end">
          <div className="flex gap-4">
            <div>togglemode</div>
            <Show when="signed-out">
              <SignInLink text="Sign In" />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
}
