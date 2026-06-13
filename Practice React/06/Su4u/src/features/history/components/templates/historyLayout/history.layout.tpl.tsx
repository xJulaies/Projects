import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { HistorySection } from "../../molecules/historySection.mol";
import { textContentSettings } from "../../../../../settings/textContent.settings";

export function HistoryLayout() {
  return (
    <PublicLayout>
      <Header title="The history of the game" />
      <main className="flex flex-col gap-16">
        {textContentSettings.history.sections.map((section) => (
          <HistorySection
            key={section.content}
            content={section.content}
            imageUrl={section.imageUrl}
            sectionClassName="flex justify-center px-12 py-12"
            contentClassName="grid grid-cols-2 gap-12 items-center"
            textClassName="text-text"
            reverse={section.reverse}
          />
        ))}
      </main>
    </PublicLayout>
  );
}
