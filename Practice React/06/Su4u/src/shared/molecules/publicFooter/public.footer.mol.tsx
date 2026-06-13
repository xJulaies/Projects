import { FooterLink } from "../../atoms/footer/public.footerLink.atm";
import { DisplayIcon } from "../../atoms/icon/icon.atm";

export function PublicFooter() {
  return (
    <footer className="surface-wave border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8 text-xl text-text-muted">
        <div className="flex items-center">
          <DisplayIcon IconClassName="h-24" />
          <span>© 2026 Su4u. A React learning project built by xJulaies.</span>
        </div>
        <nav className="flex gap-4">
          <FooterLink url="/impressum" label="Impressum" />
          <FooterLink url="/about" label="about" />
        </nav>
      </div>
    </footer>
  );
}
