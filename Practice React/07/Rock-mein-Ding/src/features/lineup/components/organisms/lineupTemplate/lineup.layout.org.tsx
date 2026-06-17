import { PublicLayout } from "../../../../../shared/organisms/templates/public.layout";
import { Lineup } from "../../molecules/lineup.mol";
import { Header } from "../../../../../shared/atoms/headers/header.atm";
export function LineupLayout() {
  return (
    <PublicLayout>
      <Header title="Line Up" />
      <Lineup />
    </PublicLayout>
  );
}
