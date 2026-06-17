import { DisplayHero } from "../../molecules/DisplayHero.mol";
import { PublicLayout } from "../../../../../shared/organisms/templates/public.layout";
import heroImage from "/public/images/hero2.png";

export function HeroLayout() {
  return (
    <PublicLayout>
      <DisplayHero backgroundImageUrl={heroImage} />
    </PublicLayout>
  );
}
