import { PublicFooter } from "../footer/public.footer";
import { PublicNavbar } from "../navbars/public.navbar";
import type { TBublicLayoutProps } from "../../types/public.layouts.types";

export function PublicLayout({ children }: TBublicLayoutProps) {
  return (
    <>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  );
}
