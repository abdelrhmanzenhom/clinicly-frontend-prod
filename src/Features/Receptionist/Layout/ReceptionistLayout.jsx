import Sidebar from "../Components/Layout/Sidebar";
import DashboardHeader from "../../../Components/Header/DashboardHeader";
import { Outlet, useLocation } from "react-router";

export default function ReceptionistLayout() {
  const location = useLocation();

  // Auto-map page title based on route
  const pageTitles = {
    "/receptionist": {
      title: "Receptionist Dashboard",
      subtitle: "Overview of today's clinic activity",
    },
    "/receptionist/appointments": {
      title: "Appointments",
      subtitle: "Manage and book appointments",
    },
    "/receptionist/queue": {
      title: "Queue Management",
      subtitle: "Manage patient check-ins and flow",
    },
    "/receptionist/billing": {
      title: "Billing",
      subtitle: "Process and review payments",
    },
  };

  const header = pageTitles[location.pathname] ?? {
    title: "Dashboard",
    subtitle: "",
  };

  return (
    <div className="flex  min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <DashboardHeader title={header.title} subtitle={header.subtitle} />

        {/* Page content */}
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
