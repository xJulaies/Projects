import { PublicFooter } from "../footer/public.footer";
import { PublicNavbar } from "../navbars/public.navbar";
import type { TPublicLayoutProps } from "../../types/public.layouts.types";

export function PublicLayout({ children }: TPublicLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar />
        {children}
        <PublicFooter />
      </div>
    </>
  );
}
