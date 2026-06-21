import { DisplayTicketsBtn } from "../atoms/hero.btn.atm";
import { DisplayIcon } from "../../../../shared/atoms/icon/icon.atm";

import { DisplayTextContent } from "../../../../shared/atoms/textContent/textContent.atm";
import type { THeroProps } from "../../types/hero.types";
import { textContentSettings } from "../../../../settings/content.text.settings";
import iconImage from "/public/images/icon.text.png";

export function DisplayHero({ backgroundImageUrl }: THeroProps) {
  return (
    <section
      className="flex min-h-[32rem] flex-1 items-center bg-cover bg-center px-4 py-12 md:bg-[center_33%] md:px-8 md:py-16"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <h1 className="sr-only">Rock mein Ding Festival</h1>
      <div className="mx-auto grid w-full max-w-7xl -translate-y-6 grid-cols-1 items-center justify-items-center gap-8 md:translate-y-0 md:grid-cols-3 md:gap-6">
        <div>
          <DisplayTicketsBtn url="/tickets" label="TICKETS" />
        </div>
        <div>
          <DisplayIcon
            img={iconImage}
            iconClassName="w-44 md:w-60 lg:w-72 h-auto object-contain"
            alt="the text of Rock mein Ding"
          />
        </div>
        <div className="text-lg font-medium md:text-xl">
          <DisplayTextContent content={textContentSettings.hero.text} />
        </div>
      </div>
    </section>
  );
}
