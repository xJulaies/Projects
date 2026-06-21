import { FooterLink } from "../../atoms/footer/public.footerLink.atm";
import { DisplayIcon } from "../../atoms/icon/icon.atm";
import iconImage from "/public/images/icon.png";

export function PublicFooter() {
  return (
    <footer className="border-t border-separator bg-surface-secondary px-6 py-8 text-surface-secondary-foreground md:px-12 md:py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <DisplayIcon
            alt="the logo of Rock mein Ding"
            img={iconImage}
            iconClassName="h-14 w-auto object-contain md:h-20"
          />
          <span className="max-w-xl text-sm text-muted">
            (c) 2026 Rock mein Ding. A React learning project built by xJulaies.
          </span>
        </div>
        <nav
          className="flex flex-col items-center gap-2 md:items-start"
          aria-label="Footer navigation"
        >
          <FooterLink url="/impressum" label="Impressum" />
          <FooterLink url="/about" label="About" />
        </nav>
      </div>
    </footer>
  );
}
