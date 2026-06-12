import { FooterLink } from "../../atoms/footer/public.footerLink.atm";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm text-text-muted">
        <span>Su4u</span>

        <nav className="flex gap-4">
          <FooterLink url="/impressum" label="Impressum" />
          <FooterLink url="/about" label="about" />
        </nav>
      </div>
    </footer>
  );
}
