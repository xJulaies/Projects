import { PublicFooter } from "../../organisms/PublicFooter/public.footer.org";
import { PublicNavbar } from "../../organisms/PublicNavbar/public.navbar.org";
import type { TPublicLayoutProps } from "./public.layout.types";

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
