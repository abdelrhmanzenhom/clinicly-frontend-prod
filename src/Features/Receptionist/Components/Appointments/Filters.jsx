import { Calendar, Search, User } from "lucide-react";

const statuses = [
  "Scheduled",
  "Confirmed",
  "Checked-In",
  "In-Session",
  "Done",
  "Canceled",
  "Rescheduled",
];
export default function Filters({ filters, onChange }) {
  return (
    <div className="bg-[--color-bg-light-secondary] dark:bg-[--color-bg-dark-secondary] rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Patient */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient..."
            className="input input-bordered w-full pl-4"
            value={filters.patient}
            onChange={(e) => onChange("patient", e.target.value)}
          />
        </div>

        {/* Doctor */}
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Doctor name"
            className="input input-bordered w-full pl-4"
            value={filters.doctor}
            onChange={(e) => onChange("doctor", e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="date"
            className="input input-bordered w-full pl-4"
            value={filters.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </div>

        {/* Status */}
        <select
          className="select select-bordered w-full"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
