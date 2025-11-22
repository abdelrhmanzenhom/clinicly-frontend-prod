import { Loader } from "lucide-react";
import { useReceptionistDashboard } from "../../../Hooks/useReceptionistDashboard";

export default function Dashboard() {
  const { data, isLoading } = useReceptionistDashboard();

  if (isLoading) return <LoadingState />;
  if (data) console.log(data.todayAppointments);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Today's Appointments"
        value={data.todayAppointments}
        color="bg-[--color-accent-primary-main]"
      />

      <StatCard
        title="Active Queue"
        value={data.activeQueue}
        color="bg-[--color-accent-warning-main]"
      />

      <StatCard
        title="Total Patients"
        value={data.totalPatients}
        color="bg-[--color-accent-success-main]"
      />
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`${color} rounded-xl shadow-lg p-6 flex flex-col justify-between`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}
