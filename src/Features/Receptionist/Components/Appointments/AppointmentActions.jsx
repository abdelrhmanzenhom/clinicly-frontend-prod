import { XCircle } from "lucide-react";

export default function AppointmentActions({ appointment, onCancel }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button className="btn btn-sm btn-outline">View</button>
      <button className="btn btn-sm btn-primary">Edit</button>

      <button onClick={onCancel} className="btn btn-sm btn-error text-white">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );
}
