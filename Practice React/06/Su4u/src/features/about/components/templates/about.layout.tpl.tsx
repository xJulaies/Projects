import { PublicLayout } from "../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../shared/atoms/headers/header.atm";
import { AboutSection } from "../molecules/aboutSection.mol";
import { textContentSettings } from "../../../../settings/textContent.settings";

export function AboutLayout() {
  return (
    <PublicLayout>
      <Header title="About Su4u" />
      <main className="flex justify-center">
        <AboutSection
          content={textContentSettings.about.text}
          sectionClassName="p-8"
          contentClassName="m-4"
          textClassName="text-primary"
        />
      </main>
    </PublicLayout>
  );
}
