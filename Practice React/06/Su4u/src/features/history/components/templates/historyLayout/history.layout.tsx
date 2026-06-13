import { PublicLayout } from "../../../../../shared/templates/publicLayout/public.layout.tpl";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
import { HistorySection } from "../../molecules/historySection.mol";
import { textContentSettings } from "../../../../../settings/textContent.settings";
import text1Image from "../../../../../assets/images/history/text1.png";
import text2Image from "../../../../../assets/images/history/text2.png";
import text3Image from "../../../../../assets/images/history/text3.png";

export function HistoryLayout() {
  return (
    <PublicLayout>
      <Header title="The history of the game" />
      <main className="flex flex-col gap-16">
        <HistorySection
          content={textContentSettings.history.text1}
          imageUrl={text1Image}
          sectionClassName="px-12 py-3"
          contentClassName="grid grid-cols-2 items-center"
          textClassName="text-primary"
        />
        <HistorySection
          content={textContentSettings.history.text2}
          imageUrl={text2Image}
          sectionClassName="px-12 py-3"
          contentClassName="grid grid-cols-2 items-center"
          textClassName="order-2 justify-self-end text-primary"
          imageWrapperClassName="order-1 justify-self-start"
        />
        <HistorySection
          content={textContentSettings.history.text3}
          imageUrl={text3Image}
          sectionClassName="px-12 py-3"
          contentClassName="grid grid-cols-2 items-center"
          textClassName="text-primary"
        />
      </main>
    </PublicLayout>
  );
}
