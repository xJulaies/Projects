import { GetStartedBtn } from "../atoms/hero.getStarted.btn.atm";
import { HeroHeader } from "../atoms/hero.header.atm";
import { DisplayTextContent } from "../../../../../shared/atoms/textContent/textContent.atm";
import type { TPublicHeroProps } from "../types/public.hero.types";
import { textContentSettings } from "../../../../../settings/textContent.settings";

export function PublicHero({ title, backgroundImageUrl }: TPublicHeroProps) {
  return (
    <section
      className="flex flex-1 items-center bg-cover bg-center px-4 py-16"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="ml-[15%] flex flex-col items-center">
        <HeroHeader title={title} />
        <DisplayTextContent
          className="text-hero-text"
          content={textContentSettings.hero.text}
        />
        <GetStartedBtn url="/game" label="Play now!" />
      </div>
    </section>
  );
}
