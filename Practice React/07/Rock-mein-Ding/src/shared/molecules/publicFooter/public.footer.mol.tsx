import { FooterLink } from "../../atoms/footer/public.footerLink.atm";
import { DisplayIcon } from "../../atoms/icon/icon.atm";

export function PublicFooter() {
  return (
    <footer className="p-8 md:p-16">
      <div className="grid grid-cols-2 justify-items-center">
        <div className="flex gap-4 items-center">
          <DisplayIcon iconClassName="h-14 w-auto object-contain md:h-20" />
          <span>
            (c) 2026 Rock mein Ding. A React learning project built by xJulaies.
          </span>
        </div>
        <nav className="flex flex-col">
          <nav className="flex flex-col gap-4">
            <FooterLink url="/impressum" label="Impressum" />
            <FooterLink url="/about" label="About" />
          </nav>
        </nav>
      </div>
    </footer>
  );
}
