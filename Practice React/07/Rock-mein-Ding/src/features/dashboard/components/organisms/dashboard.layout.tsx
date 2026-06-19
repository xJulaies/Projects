import { PublicLayout } from "../../../../shared/organisms/templates/public.layout";
import { DashboardNav } from "../molecules/dashboardNav.mol";
import { Header } from "../../../../shared/atoms/headers/header.atm";
import { Outlet } from "@tanstack/react-router";

export function DashboardLayout() {
  return (
    <PublicLayout>
      <Header title="Dashboard" />

      <section className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6">
        <div className="grid h-[70vh] w-full grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[13rem_minmax(0,1fr)] md:grid-rows-1">
          <DashboardNav />
          <section className="min-h-0 min-w-0 border overflow-y-auto p-4 md:p-6">
            <Outlet />
          </section>
        </div>
      </section>
    </PublicLayout>
  );
}
