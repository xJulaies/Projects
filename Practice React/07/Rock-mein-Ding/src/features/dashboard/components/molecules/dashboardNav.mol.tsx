import { Link } from "@tanstack/react-router";
import { SignOutButton } from "@clerk/react";
export function DashboardNav() {
  return (
    <aside className="flex flex-col p-4 border">
      <nav
        className="flex flex-col gap-4 p-4 "
        aria-label="Dashboard navigation"
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/bands">Bands</Link>
        <Link to="/dashboard/bands/new">New Band</Link>
      </nav>
      <div className="mt-auto p-4">
        <SignOutButton />
      </div>
    </aside>
  );
}
