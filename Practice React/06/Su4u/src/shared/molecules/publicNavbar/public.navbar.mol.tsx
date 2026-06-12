import { ReturnHomeButton } from "../../atoms/home-button/home.btn.atm";
import { ChangeThemeBtn } from "./../../atoms/navbar/theme.btn.atm";

export function PublicNavbar() {
  return (
    <header className="border-b border-border bg-surface">
      <nav className=" grid  grid-cols-3 items-center px-4 py-3">
        <div className="justify-self-start">
          <select className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-muted outline-none focus:border-primary">
            <option>Menu</option>
            <option>Dummy Eintrag 1</option>
            <option>Dummy Eintrag 2</option>
          </select>
        </div>
        <div className="justify-self-center">
          <ReturnHomeButton text="Su4u" />
        </div>
        <div className="justify-self-end">
          <ChangeThemeBtn />
        </div>
      </nav>
    </header>
  );
}
