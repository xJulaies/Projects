import { SignInLink } from "../../atoms/navbar/signIn";
import { NavbarLink } from "../../atoms/navbar/public.navbarLink.atm";
import { ChangeThemeBtn } from "../../atoms/navbar/theme.btn.atm";
import { ReturnHomeLink } from "./returnHome.mol";
import { Show, UserButton } from "@clerk/react";
import { useTheme } from "../../lib/hooks/useTheme";

export function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();

  function handleThemeBtn() {
    toggleTheme();
  }
  return (
    <header className="relative z-50 border-b border-separator bg-surface-secondary px-4 py-3 text-surface-secondary-foreground shadow-sm">
      <nav className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="justify-self-start">
          <details className="relative">
            <summary className="button button--outline button--sm new-rocker-regular list-none">
              Menu
            </summary>

            <div className="new-rocker-regular absolute left-0 top-full mt-2 flex min-w-44 flex-col gap-1 rounded-md border border-border bg-overlay p-2 text-sm text-overlay-foreground shadow-overlay">
              <NavbarLink url="/dashboard" label="Dashboard" />
              <NavbarLink url="/lineup" label="Lineup" />
              <NavbarLink url="/calendar" label="Calendar" />
              <NavbarLink url="/tickets" label="Tickets" />
            </div>
          </details>
        </div>
        <div className="justify-self-center">
          <ReturnHomeLink />
        </div>
        <div className="justify-self-end">
          <div className="flex items-center gap-2">
            <ChangeThemeBtn theme={theme} onClick={handleThemeBtn} />
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
