import { DisplayTicketsBtn } from "../atoms/hero.btn.atm";
import { DisplayIcon } from "../../../../shared/atoms/icon/icon.atm";

import { DisplayTextContent } from "../../../../shared/atoms/textContent/textContent.atm";
import type { THeroProps } from "../../types/hero.types";
import { textContentSettings } from "../../../../settings/content.text.settings";
import iconImage from "/public/images/icon.text.png";

export function DisplayHero({ backgroundImageUrl }: THeroProps) {
  return (
    <section
      className="flex flex-1 items-center pb-28 bg-cover bg-center md:bg-[center_33%]"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <div className="grid w-full grid-cols-1 justify-items-center items-center gap-12 md:gap-2 md:grid-cols-3">
        <div className="text-3xl font-bold">
          <DisplayTicketsBtn url="/tickets" label="TICKETS" />
        </div>
        <div>
          <DisplayIcon
            img={iconImage}
            iconClassName="w-44 md:w-60 lg:w-72 h-auto object-contain"
            alt="the text of Rock mein Ding"
          />
        </div>
        <div className="text-2xl font-bold">
          <DisplayTextContent content={textContentSettings.hero.text} />
        </div>
      </div>
    </section>
  );
}
