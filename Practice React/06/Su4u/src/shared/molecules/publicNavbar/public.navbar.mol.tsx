import { ReturnHomeButton } from "../../atoms/home-button/home.btn.atm";
import { DisplayIcon } from "../../atoms/icon/icon.atm";
import { ChangeThemeBtn } from "./../../atoms/navbar/theme.btn.atm";
import { NavbarLink } from "../../atoms/navbar/public.navbarLink.atm";
import { useTheme } from "../../lib/hooks/useTheme";

export function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();

  function handleThemeBtn() {
    toggleTheme();
  }

  return (
    <header className="surface-wave border-b border-border bg-surface">
      <nav className="grid grid-cols-3 items-center px-3 py-2 md:px-4 md:py-3">
        <div className="justify-self-start">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-border bg-surface-muted px-3 py-2 text-sm font-medium text-text-muted transition hover:text-primary">
              Menu
            </summary>

            <div className="absolute left-0 top-11 z-10 flex min-w-40 flex-col rounded-md border border-border bg-surface p-2 text-sm text-text-muted shadow-lg md:top-12">
              <NavbarLink url="/history" label="History" />
              <NavbarLink url="/rules" label="Rules" />
              <NavbarLink url="/game" label="Play the Game" />
            </div>
          </details>
        </div>
        <div className="justify-self-center">
          <div className="flex items-center gap-1 md:gap-2">
            <DisplayIcon IconClassName="h-9 w-auto object-contain md:h-14" />
            <ReturnHomeButton text="Su4u" />
          </div>
        </div>
        <div className="justify-self-end">
          <ChangeThemeBtn theme={theme} onClick={handleThemeBtn} />
        </div>
      </nav>
    </header>
  );
}
