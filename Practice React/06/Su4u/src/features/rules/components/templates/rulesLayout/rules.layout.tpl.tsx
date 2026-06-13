import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { RulesSection } from "../../molecules/rulesSection.mol";
import { textContentSettings } from "../../../../../settings/textContent.settings";
import rulesImage from "../../../../../assets/images/rules/rules.png";

export function RulesLayout() {
  return (
    <PublicLayout>
      <Header title="The rules of the game" />
      <RulesSection
        content={textContentSettings.rules.text}
        imageUrl={rulesImage}
        sectionClassName="px-12 py-3"
        contentClassName=" mx-auto max-w-6xl  grid grid-cols-2 items-center"
        textClassName="text-primary"
      />
    </PublicLayout>
  );
}
