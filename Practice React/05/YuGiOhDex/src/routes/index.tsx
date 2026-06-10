import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../layouts/templates/PublicLayout/public.layout.tpl";
import { PublicHero } from "../features/hero/components/organisms/PublicHero/public.hero.org";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <PublicLayout>
      <main>
        <PublicHero />
      </main>
    </PublicLayout>
  );
}
