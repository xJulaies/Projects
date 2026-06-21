import { useBands } from "../../../bands/context/hooks/useBands";
import type { IBand } from "../../../bands/types/band.types";
import { Header } from "../../../../shared/atoms/headers/header.atm";
import { PublicLayout } from "../../../../shared/organisms/templates/public.layout";
import { CalendarDay } from "../molecules/calendarDay.mol";
import { Tabs } from "@heroui/react";

const festivalDays: IBand["day"][] = ["Friday", "Saturday", "Sunday"];

export function CalendarLayout() {
  const { bands } = useBands();

  const confirmedBands = bands.filter(
    (band) => band.status === "confirmed",
  );

  return (
    <PublicLayout>
      <Header title="Calendar" />

      <Tabs className="mx-auto w-full max-w-4xl px-4 pb-10">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Festival days">
            {festivalDays.map((day) => (
              <Tabs.Tab key={day} id={day}>
                {day}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>

        {festivalDays.map((day) => {
          const bandsForDay = confirmedBands
            .filter((band) => band.day === day)
            .toSorted((firstBand, secondBand) =>
              firstBand.startTime.localeCompare(secondBand.startTime),
            );

          return (
            <Tabs.Panel key={day} id={day}>
              <CalendarDay bands={bandsForDay} />
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </PublicLayout>
  );
}
